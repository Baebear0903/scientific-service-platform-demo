import fs from 'fs';

const filePath = '/app/applet/src/App.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// Find the unique line below corruption
const anchorBelow = '                            <div className="flex bg-slate-100 p-0.5 rounded border border-slate-200">';
const anchorAbove = "                                  { label: '上呼吸道感染', count: 16245 },";

const startIndex = content.indexOf(anchorAbove) + anchorAbove.length;
const endIndex = content.indexOf(anchorBelow);

if (startIndex !== -1 && endIndex !== -1 && startIndex < endIndex) {
    const corruptedBlock = content.substring(startIndex, endIndex);
    console.log('Found corrupted block:', JSON.stringify(corruptedBlock));
    
    const replacement = `
                                  { label: '支气管炎', count: 12450 },
                                  { label: '冠心病', count: 10234 },
                                  { label: '高血压', count: 9845 },
                                  { label: '糖尿病', count: 8752 },
                                ].map((item) => (
                                  <div key={item.label} className="flex items-center justify-between group cursor-pointer">
                                     <div className="flex items-center gap-2">
                                        <input type="checkbox" className="w-3 h-3 border-slate-200 rounded text-blue-600 focus:ring-0" />
                                        <span className="text-[10px] text-slate-600 group-hover:text-blue-600 truncate max-w-[80px]">{item.label}</span>
                                     </div>
                                     <span className="text-[9px] text-slate-300">{item.count}</span>
                                  </div>
                                ))}
                             </div>
                          </div>
                        )}
                     </div>
                   ))}
                </div>

                {/* Right Side: Tab Content */}
                <div className="flex-1 flex flex-col overflow-hidden">
                  {researchSubTab === 'results' && (
                    <>
                      {/* Action Bar */}
                      <div className="h-12 bg-white border-b px-6 flex items-center justify-between shrink-0">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 text-[11px] text-slate-500">
                               <input type="checkbox" className="w-[14px] h-[14px] border-slate-300 rounded-[2px] text-blue-600 focus:ring-0" />
                               <span>全选</span>
                            </div>
                            <div className="h-4 w-[1px] bg-slate-100" />
                            <div className="text-[11px] text-slate-400 font-medium italic">
                               当前已选择 <span className="text-blue-600 px-0.5">0</span> 份病历
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
`;
    
    const newContent = content.substring(0, startIndex) + replacement + content.substring(endIndex);
    fs.writeFileSync(filePath, newContent);
    console.log('Successfully fixed App.tsx');
} else {
    console.error('Could not find anchors in App.tsx');
    console.log('startIndex:', startIndex, 'endIndex:', endIndex);
}
