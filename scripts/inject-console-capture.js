const fs = require('fs');
const path = require('path');
const { glob } = require('glob');

// Console capture script content
const CONSOLE_CAPTURE_SCRIPT = `
(function () {
  if (window.self === window.top) return;

  const logs = [];
  const MAX_LOGS = 500;

  const originalConsole = {
    log: console.log,
    warn: console.warn,
    error: console.error,
    info: console.info,
    debug: console.debug
  };

  function captureLog(level, args) {
    const timestamp = new Date().toISOString();
    const message = args.map(arg => {
      if (typeof arg === 'object' && arg !== null) {
        try {
          return JSON.stringify(arg, (key, value) => {
            if (typeof value === 'function') return '[Function]';
            if (value instanceof Error) return value.toString();
            return value;
          }, 2);
        } catch (e) {
          return '[Object]';
        }
      }
      return String(arg);
    }).join(' ');

    const logEntry = {
      timestamp,
      level,
      message,
      url: window.location.href
    };

    logs.push(logEntry);
    if (logs.length > MAX_LOGS) {
      logs.shift();
    }

    try {
      window.parent.postMessage({
        type: 'console-log',
        log: logEntry
      }, '*');
    } catch (e) { }
  }

  // Override console methods
  console.log = function(...args) {
    originalConsole.log.apply(console, args);
    captureLog('log', args);
  };

  console.warn = function(...args) {
    originalConsole.warn.apply(console, args);
    captureLog('warn', args);
  };

  console.error = function(...args) {
    originalConsole.error.apply(console, args);
    captureLog('error', args);
  };

  console.info = function(...args) {
    originalConsole.info.apply(console, args);
    captureLog('info', args);
  };

  console.debug = function(...args) {
    originalConsole.debug.apply(console, args);
    captureLog('debug', args);
  };

  // Capture unhandled errors
  window.addEventListener('error', function(event) {
    captureLog('error', ['Uncaught Error:', event.error?.message || event.message]);
  });

  window.addEventListener('unhandledrejection', function(event) {
    captureLog('error', ['Unhandled Promise Rejection:', event.reason]);
  });

  function sendReady() {
    try {
      window.parent.postMessage({
        type: 'console-capture-ready',
        url: window.location.href,
        timestamp: new Date().toISOString()
      }, '*');
    } catch (e) { }
  }

  function sendRouteChange() {
    try {
      window.parent.postMessage({
        type: 'route-change',
        route: {
          pathname: window.location.pathname,
          search: window.location.search,
          hash: window.location.hash,
          href: window.location.href
        },
        timestamp: new Date().toISOString()
      }, '*');
    } catch (e) { }
  }

  // Send ready message
  if (document.readyState === 'complete') {
    sendReady();
    sendRouteChange();
  } else {
    window.addEventListener('load', function() {
      sendReady();
      sendRouteChange();
    });
  }

  // Monitor route changes
  const originalPushState = history.pushState;
  const originalReplaceState = history.replaceState;

  history.pushState = function(...args) {
    originalPushState.apply(history, args);
    setTimeout(sendRouteChange, 0);
  };

  history.replaceState = function(...args) {
    originalReplaceState.apply(history, args);
    setTimeout(sendRouteChange, 0);
  };

  window.addEventListener('popstate', sendRouteChange);
  window.addEventListener('hashchange', sendRouteChange);
})();
`;

function injectConsoleCapture(targetDir) {
  console.log('📁 Found Next.js build directory');
  
  // Use glob with callback pattern (compatible with both old and new versions)
  glob(`${targetDir}/**/*.html`, (err, files) => {
    if (err) {
      console.error('❌ Error finding HTML files:', err);
      return;
    }

    if (files.length === 0) {
      console.log('ℹ️ No HTML files found in build directory');
      return;
    }

    console.log(`🔍 Found ${files.length} HTML file(s)`);

    files.forEach(file => {
      try {
        let content = fs.readFileSync(file, 'utf8');
        
        // Check if script is already injected
        if (content.includes('console-capture-ready')) {
          console.log(`⏭️ Skipping ${path.basename(file)} (already injected)`);
          return;
        }

        // Inject the script before closing head tag
        const scriptTag = `<script>${CONSOLE_CAPTURE_SCRIPT}</script>`;
        
        if (content.includes('</head>')) {
          content = content.replace('</head>', `${scriptTag}</head>`);
        } else if (content.includes('<head>')) {
          content = content.replace('<head>', `<head>${scriptTag}`);
        } else {
          // Fallback: add at the beginning of the body
          content = content.replace('<body>', `<body>${scriptTag}`);
        }

        fs.writeFileSync(file, content, 'utf8');
        console.log(`✅ Injected console capture into ${path.basename(file)}`);
      } catch (error) {
        console.error(`❌ Error processing ${file}:`, error.message);
      }
    });

    console.log('🎉 Console capture injection complete!');
  });
}

// Main execution
const buildDir = path.join(process.cwd(), '.next');

if (fs.existsSync(buildDir)) {
  injectConsoleCapture(buildDir);
} else {
  console.log('ℹ️ .next directory not found. Skipping console capture injection.');
}