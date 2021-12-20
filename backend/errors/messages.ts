
function getBlockDefault(block: string) {
   const re = /(?<=\{)(.*?)(?=\})/
   let str = block.split(re)
   str = str.filter(val => val.includes('%|')).map(val => val.replace('%|', ''))
   return str;
}

function format(str: string, ...format: any[]) {
   const expression = /({)(.*?)(})/
   const blocks = getBlockDefault(str);
   let formatIndex = 0;
   let defaultIndex = 0;
   
   for (let char = 0; char < str.length; char++) {
       if (!str.includes('{')) break;
       str = str.replace(expression, format[formatIndex++] ?? blocks[++defaultIndex])
   }
   
   return str;
}


const messages = {
   DATABASE: {
       not_found: '{%|User} {%|ID} was not found again {%|ERROR}'
   },
}

const str = format(messages.DATABASE.not_found, 'USER', '12', 'unknown');
str


