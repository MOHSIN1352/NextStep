export default function Footer() {
  return (
    <footer className="bg-[#f1ead8] py-10 px-6 text-black border-t-1 border-gray-300">
      <div className="text-center text-gray-600 mt-8 border-t pt-4">
        &copy; {new Date().getFullYear()} NextStep. All rights reserved.
      </div>
    </footer>
  );
}
