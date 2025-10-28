import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t border-gray-300  py-12  px-6">
      <div className="max-w-7xl mx-auto  ">
        {/* flex container: flex-wrap علشان يبقى responsive */}
        <div className="flex flex-wrap   items-start gap-8">
          {/* COL 1 - bigger on large screens (40%) */}
          <div className="w-full sm:w-1/3 md:w-1/4   lg:w-1/6   ">
            <div className="flex items-center space-x-3 mb-4">
              <div className=" p-2 bg-black text-white font-bold text-xl w-10 h-10 flex items-center justify-center rounded ">
                T
              </div>
              <span className="text-lg font-semibold text-black">ShopMart</span>
            </div>

            <p className="text-gray-600 text-sm mb-4">
              Your one-stop destination for the latest technology, fashion, and
              lifestyle products. Quality guaranteed with fast shipping and
              excellent customer service.
            </p>

            <div className="text-gray-500 text-sm space-y-1">
              <div>📍 بني سويف </div>
              <div>📞 (+20) 01200682830</div>
              <div>✉️ ms8663650@gmail.com</div>
            </div>
          </div>

          {/* COL 2 */}
          <div className="w-full sm:w-1/3 md:w-1/4   lg:w-1/6  ">
            <h3 className="text-black font-semibold mb-4">SHOP</h3>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li>Electronics</li>
              <li>Fashion</li>
              <li>Home & Garden</li>
              <li>Sports</li>
              <li>Deals</li>
            </ul>
          </div>

          {/* COL 3 */}
          <div className="w-full sm:w-1/3 md:w-1/4   lg:w-1/6   ">
            <h3 className="text-black font-semibold mb-4">CUSTOMER SERVICE</h3>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li>Contact Us</li>
              <li>Help Center</li>
              <li>Track Your Order</li>
              <li>Returns & Exchanges</li>
              <li>Size Guide</li>
            </ul>
          </div>

          {/* COL 4 */}
          <div className="w-full sm:w-1/3 md:w-1/4   lg:w-1/6   ">
            <h3 className="text-black font-semibold mb-4">ABOUT</h3>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li>About ShopMart</li>
              <li>Careers</li>
              <li>Press</li>
              <li>Investor Relations</li>
              <li>Sustainability</li>
            </ul>
          </div>

          {/* COL 6 */}
          <div className="w-full sm:w-1/3 md:w-1/4   lg:w-1/6  ">
            <h3 className="text-black font-semibold mb-4">POLICIES</h3>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
              <li>Cookie Policy</li>
              <li>Shipping Policy</li>
              <li>Refund Policy</li>
            </ul>
          </div>
        </div>

        {/* bottom row - copyright */}
      </div>
    </footer>
  );
}
