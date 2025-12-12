import { useEffect } from 'react';

type WompiJSProps = {
  onInitialized?: (sessionId: string, deviceId: string) => void;
};

// Extremely simple test version of WompiJS
// Provides consistent test IDs without loading any external scripts
function WompiJS({ onInitialized }: WompiJSProps) {
  useEffect(() => {
    // Always use the same test IDs for consistent testing
    const testSessionId = 'test_session_12345678';
    const testDeviceId = 'test_device_87654321';
    
    // Small delay to simulate script loading
    const timer = setTimeout(() => {
      if (onInitialized) {
        onInitialized(testSessionId, testDeviceId);
      }
    }, 200);
    
    return () => clearTimeout(timer);
  }, [onInitialized]);

  return null;
}

export default WompiJS;
