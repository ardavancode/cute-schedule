export default function About() {
  return (
    <div className="flex flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">About Page</h1>
      <p className="text-lg mb-4">
        This is a simple about page to demonstrate routing in Next.js.
      </p>
      <a href="/" className="text-blue-500 hover:underline">
        Back to Home
      </a>
    </div>
  );
}