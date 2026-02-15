import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-surface text-inverse">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Electronics Shop</h3>
            <p className="text-muted">
              Your trusted source for quality electronics boards and components.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-muted hover:text-inverse">
                  Home
                </a>
              </li>
              <li>
                <a href="/products" className="text-muted hover:text-inverse">
                  Products
                </a>
              </li>
              <li>
                <a href="/cart" className="text-muted hover:text-inverse">
                  Cart
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <p className="text-muted">
              Email: info@electronicsshop.com
              <br />
              Phone: +1 (555) 123-4567
            </p>
          </div>
        </div>

        <div className="border-t border-medium mt-8 pt-8 text-center">
          <p className="text-muted">
            2024 Electronics Shop. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
