// List of commands that do not require API calls

import * as bin from './index';
import config from '../../../config.json';

// Help
export const help = async (args: string[]): Promise<string> => {
  // const commands = Object.keys(bin).sort().join(', '); // unused: was never referenced below
  const sortedKeys = Object.keys(bin).sort();
  let c = '';
  for (let i = 1; i <= sortedKeys.length; i++) {
    if (i % 7 === 0) {
      c += sortedKeys[i - 1] + '\n';
    } else {
      c += sortedKeys[i - 1] + ' ';
    }
  }
  return `Welcome! Here are all the available commands:
\n${c}\n
[tab]: trigger completion.
[ctrl+l]/clear: clear terminal.\n
`;
};

// Redirection
export const repo = async (args: string[]): Promise<string> => {
  window.open(`${config.repo}`);
  return 'Opening Github repository...';
};

// About
export const about = async (args: string[]): Promise<string> => {
  return `<div id="about" style="display: flex; flex-direction: column; gap: 1em;">
  
Hi, I'm Marko — a QA Engineer based in Sarajevo whose job is essentially to break things for a living, and somehow get paid for it. I talk to software until it confesses its bugs, and trust me, they always do. With 4+ years of experience, I've poked holes in Microsoft's platform, identified 100+ unsupported features, which is a polite way of saying I found a lot of problems.


I work with Playwright, SQL, TypeScript, and an unhealthy obsession with edge cases that nobody else thought to test. I write test cases the way other people write grocery lists: obsessively and with way too much detail.
If your software has a dark corner, I will find it, document it, and hand the developer a very politely worded, extremely detailed report about why their code is — respectfully, not perfect.

Beyond my professional roles, I am a perpetual student of technology, maintaining a presence in the open-source community. Also i love gaming and comedy, so if you have any recommendations for either, I'm all ears!
</div>

Lets connect!

$ email - shoot me an email
$ github - check my github
$ linkedin - see my professional profile

`;
};

export const resume = async (args: string[]): Promise<string> => {
  window.open(`${config.resume_url}`);
  return 'Opening resume...';
};

export const email = async (args: string[]): Promise<string> => {
  window.open(`mailto:${config.email}`);
  return `Opening mailto:${config.email}...`;
};

export const github = async (args: string[]): Promise<string> => {
  window.open(`https://github.com/${config.social.github}/`);

  return 'Opening github...';
};

export const linkedin = async (args: string[]): Promise<string> => {
  window.open(`https://www.linkedin.com/in/${config.social.linkedin}/`);

  return 'Opening linkedin...';
};

export const google = async (args: string[]): Promise<string> => {
   window.open(`https://google.com/search?q=${args.join(' ')}`);
   return `Searching google for ${args.join(' ')}...`;
};

// Redirect to QA portfolio project
export const qa = async (args: string[]): Promise<string> => {
   window.open(`https://github.com/avramare/quality-alchemist`);
   return `Opening quality alchemist repository...`;
};

export const whoami = async (args: string[]): Promise<string> => {
  return `${config.ps1_username}`;
};

export const cd = async (args: string[]): Promise<string> => {
  return `
  Unfortunately, I cannot afford more directories, if you hire me, I'll think about it!
  
  ⢀⣤⠤⠤⠤⠤⠤⠤⠤⠤⠤⠤⢤⣤⣀⣀⡀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⢀⡼⠋⠀⣀⠄⡂⠍⣀⣒⣒⠂⠀⠬⠤⠤⠬⠍⠉⠝⠲⣄⡀⠀⠀
⠀⠀⠀⢀⡾⠁⠀⠊⢔⠕⠈⣀⣀⡀⠈⠆⠀⠀⠀⡍⠁⠀⠁⢂⠀⠈⣷⠀⠀
⠀⠀⣠⣾⠥⠀⠀⣠⢠⣞⣿⣿⣿⣉⠳⣄⠀⠀⣀⣤⣶⣶⣶⡄⠀⠀⣘⢦⡀
⢀⡞⡍⣠⠞⢋⡛⠶⠤⣤⠴⠚⠀⠈⠙⠁⠀⠀⢹⡏⠁⠀⣀⣠⠤⢤⡕⠱⣷
⠘⡇⠇⣯⠤⢾⡙⠲⢤⣀⡀⠤⠀⢲⡖⣂⣀⠀⠀⢙⣶⣄⠈⠉⣸⡄⠠⣠⡿
⠀⠹⣜⡪⠀⠈⢷⣦⣬⣏⠉⠛⠲⣮⣧⣁⣀⣀⠶⠞⢁⣀⣨⢶⢿⣧⠉⡼⠁
⠀⠀⠈⢷⡀⠀⠀⠳⣌⡟⠻⠷⣶⣧⣀⣀⣹⣉⣉⣿⣉⣉⣇⣼⣾⣿⠀⡇⠀
⠀⠀⠀⠈⢳⡄⠀⠀⠘⠳⣄⡀⡼⠈⠉⠛⡿⠿⠿⡿⠿⣿⢿⣿⣿⡇⠀⡇⠀
⠀⠀⠀⠀⠀⠙⢦⣕⠠⣒⠌⡙⠓⠶⠤⣤⣧⣀⣸⣇⣴⣧⠾⠾⠋⠀⠀⡇⠀
⠀⠀⠀⠀⠀⠀⠀⠈⠙⠶⣭⣒⠩⠖⢠⣤⠄⠀⠀⠀⠀⠀⠠⠔⠁⡰⠀⣧⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠛⠲⢤⣀⣀⠉⠉⠀⠀⠀⠀⠀⠁⠀⣠⠏⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠉⠉⠛⠒⠲⠶⠤⠴⠒⠚⠁
  `;
};

// Banner
export const banner = (args?: string[]): string => {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  // AVRAMARE wordmark — the ASCII brand mark for the landing screen.
  const wordmark = ` █████╗ ██╗   ██╗██████╗  █████╗ ███╗   ███╗ █████╗ ██████╗ ███████╗
██╔══██╗██║   ██║██╔══██╗██╔══██╗████╗ ████║██╔══██╗██╔══██╗██╔════╝
███████║██║   ██║██████╔╝███████║██╔████╔██║███████║██████╔╝█████╗
██╔══██║╚██╗ ██╔╝██╔══██╗██╔══██║██║╚██╔╝██║██╔══██║██╔══██╗██╔══╝
██║  ██║ ╚████╔╝ ██║  ██║██║  ██║██║ ╚═╝ ██║██║  ██║██║  ██║███████╗
╚═╝  ╚═╝  ╚═══╝  ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝     ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝`;

  const rule = '─'.repeat(68);
  const tagline =
    '   QA ENGINEER  ·  I BREAK SOFTWARE FOR A LIVING  ·  SARAJEVO, BA';

  const desktopBrand = `<span class="term-dim">avramare :: portfolio.sys ....................... [ ok ]</span>

<span class="term-host">${wordmark}</span>

<span class="term-dim">${rule}</span>
<span class="term-user">${tagline}</span>
<span class="term-dim">${rule}</span>`;

  const mobileBrand = `<span class="term-dim">avramare :: portfolio.sys [ ok ]</span>

<span class="term-host" style="font-size:1.6em;font-weight:bold;letter-spacing:.3em;">AVRAMARE</span>
<span class="term-dim">${'─'.repeat(22)}</span>
<span class="term-user">QA ENGINEER · SARAJEVO</span>`;

  return `${isMobile ? mobileBrand : desktopBrand}

I live at the crossroads of user experience and system failure. I stress the
backend, poke the UI, and automate the chaos so your users never have to.

Type a command to get started:

<span class="term-host">$ about</span>   learn more about me
<span class="term-host">$ sum</span>     a short summary
<span class="term-host">$ resume</span>  download my resume
<span class="term-host">$ help</span>    list every command

<span class="term-dim">tip: double-click a desktop icon, or switch themes from the View menu.</span>
`;
};

// Morse Code Conversion Utility
const morseCodeMap: { [key: string]: string } = {
  'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.',
  'F': '..-.', 'G': '--.', 'H': '....', 'I': '..', 'J': '.---',
  'K': '-.-', 'L': '.-..', 'M': '--', 'N': '-.', 'O': '---',
  'P': '.--.', 'Q': '--.-', 'R': '.-.', 'S': '...', 'T': '-',
  'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-', 'Y': '-.--',
  'Z': '--..', '0': '-----', '1': '.----', '2': '..---',
  '3': '...--', '4': '....-', '5': '.....', '6': '-....',
  '7': '--...', '8': '---..', '9': '----.',
  ' ': '/'
};

export const morse = async (args: string[]): Promise<string> => {
  // If no arguments, show help
  if (args.length === 0) {
    return `Morse Code Converter
Usage:
- 'morse encode <text>' - Convert text to Morse code
- 'morse decode <morse>' - Convert Morse code to text
- 'morse help' - Encoding and Decoding example for HELLO WORLD 
`;
  }

  // Handle different subcommands
  const command = args[0].toLowerCase();
  const input = args.slice(1).join(' ');

  switch (command) {
    case 'help':
      return `Morse Code Converter
- Encode text to Morse: 'morse encode HELLO WORLD'
- Decode Morse to text: 'morse decode .... . .-.. .-.. --- / .-- --- .-. .-.. -.'
- Supports letters A-Z, numbers 0-9, and spaces`;

    case 'encode':
      if (!input) return 'Please provide text to encode';
      return encodeMorse(input.toUpperCase());

    case 'decode':
      if (!input) return 'Please provide Morse code to decode';
      return decodeMorse(input);

    default:
      return `Unknown morse command. Try 'morse help'`;
  }
};

// Encode text to Morse code
function encodeMorse(text: string): string {
  return text
    .split('')
    .map(char => morseCodeMap[char] || '')
    .filter(code => code !== '')
    .join(' ');
}

// Decode Morse code to text
function decodeMorse(morse: string): string {
  // Reverse the morseCodeMap for decoding
  const reverseMorseMap = Object.fromEntries(
    Object.entries(morseCodeMap).map(([key, value]) => [value, key])
  );

  return morse
    .split(' ')
    .map(code => reverseMorseMap[code] || '')
    .filter(char => char !== '')
    .join('');
}