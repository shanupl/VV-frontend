const isLocal = false;

const ServerUrl = isLocal
  ? "http://127.0.0.1:5001"
  : "https://versoview-backend.vercel.app";

export default ServerUrl;
