const fs = require('fs');
let c = fs.readFileSync('src/pages/Home.tsx', 'utf8');

// Fix 1: Close the span tag in the heading
c = c.replace(
  '<span className="relative text-transparent bg-clip-text bg-gradient-to-r from-[#FF8A00] via-[#FF4FCB] to-[#8B5CF6]">2027</span>\n          </h1>',
  '<span className="relative text-transparent bg-clip-text bg-gradient-to-r from-[#FF8A00] via-[#FF4FCB] to-[#8B5CF6]">2027</span>\n            </span>\n          </h1>'
);

// Fix 2: Close CategoriesSection div
c = c.replace(
  '</motion.div>\n          ))}\n        </div>\n    </section>',
  '</motion.div>\n          ))}\n        </div>\n      </div>\n    </section>'
);

// Fix 3: Close HighlightsSection div  
c = c.replace(
  '</motion.div>\n          ))}\n        </div>\n    </section>',
  '</motion.div>\n          ))}\n        </div>\n      </div>\n    </section>'
);

fs.writeFileSync('src/pages/Home.tsx', c);
console.log('Fixed successfully');
