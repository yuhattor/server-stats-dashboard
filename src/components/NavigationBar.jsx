import React from "react";
import { Button } from "@tremor/react";
import { SunIcon, MoonIcon } from "@heroicons/react/solid";

const NavigationBar = () => {
  // initialize dark mode based on localStorage
  const body = document.body;
  const isDark = localStorage.theme === 'dark';
  body.classList.toggle('dark', isDark);

  // toggle dark mode
  function toggleDarkMode() {
    const isDark = body.classList.contains('dark');
    body.classList.toggle('dark', !isDark);
    localStorage.theme = isDark ? 'light' : 'dark';
  }

  return (
    <>
      <nav className="border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
        <div className="flex flex-wrap items-center justify-between p-4">
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"><b>Server Statistics Dashboard</b></span>
            <Button icon={SunIcon} onClick={toggleDarkMode} size="sm" className="dark:hidden" variant="light"></Button>
            <Button icon={MoonIcon} onClick={toggleDarkMode} size="sm"  className="hidden dark:block" variant="light"></Button>
        </div>
      </nav>
    </>
  )
}

export default NavigationBar
