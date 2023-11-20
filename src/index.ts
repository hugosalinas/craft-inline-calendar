
import { BlockLocation, CraftBlock, CraftBlockUpdate, CraftTextBlock, IndexLocation } from "@craftdocs/craft-extension-api";
import "./style.css";

import { initInlineCalendar } from './inline-calendar'
import { showConsole, hideConsole, clearConsole, logInPageConsoleMessage, initConsole } from './console'



/* ---- ENSURE DEV MODE WORKS ----- 
You can run this extension locally with `npm run dev` in order to have faster iteration cycles.
When running this way, the craft object won't be available and JS exception will occur
With this helper function you can ensure that no exceptions occur for craft api related calls.
/* ---------------------------------*/

function isCraftLibAvailable() {
  return typeof craft !== 'undefined'
}
/* ---------------------------------*/
/* ---- DARK/LIGHT MODE ----------- */
/* ---------------------------------*/

/*
According to tailwind documentation, see : https://tailwindcss.com/docs/dark-mode#toggling-dark-mode-manually
*/
if (isCraftLibAvailable() == true) {
  craft.env.setListener((env) => {
    if (env.colorScheme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  });
}

initConsole();
initInlineCalendar();
