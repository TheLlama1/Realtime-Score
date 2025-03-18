"use client";

import * as React from "react";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-screen-xl mx-auto p-4">
        <div className="flex flex-wrap justify-between items-center">
          <ul className="flex flex-col p-4 space-y-2 md:space-y-0 md:flex-row md:space-x-8">
            <li>
              <a
                href="/privacyPolicy"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:p-0 md:hover:text-blue-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Политика за поверителност и условия за ползване
              </a>
            </li>
          </ul>
        </div>
        <div className="text-center text-gray-500 dark:text-gray-400 mt-4">
          © 2024 Realtime Score. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
