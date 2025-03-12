import { useState } from "react";
import VideoUploader from "./components/VideoUploader";
import VideoList from './components/VideoList';
import { ToastContainer } from "react-toastify";

function App() {
  // Counter to trigger refreshes of the video list
  const [refreshCounter, setRefreshCounter] = useState(0);

  const handleVideoUploaded = () => {
    // Increment counter to trigger a refresh
    setRefreshCounter((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-center text-gray-800">
            VidVault
          </h1>
        </header>

        <main>
          <ToastContainer position="top-right" autoClose={3000} />
          <VideoUploader onVideoUploaded={handleVideoUploaded} />
          <VideoList refreshTrigger={refreshCounter} />
        </main>
        <footer className="mt-12 py-6 text-center text-gray-500 text-sm border-t border-gray-200">
  <p className="text-gray-600 font-medium">© {new Date().getFullYear()} VidVault</p> 
  <p className="mt-1">Crafted with ❤️ by <span className="font-semibold text-gray-700">Ritik Kumar</span></p>
  <p className="mt-1">
    <a href="https://github.com/ritikkumar352" target="_blank" rel="noopener noreferrer" 
       className="text-blue-500 hover:text-blue-700 transition">
      @ritikkumar352
    </a>
  </p>
</footer>

      </div>
    </div>
  );
}

export default App;
