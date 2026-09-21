/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Home, 
  Search, 
  Folder,
  FolderOpen, 
  Cloud, 
  BarChart3, 
  Dna, 
  Star,
  ChevronRight, 
  User, 
  UserCheck,
  UserPlus,
  Plus, 
  Download, 
  Filter,
  FileText,
  Database,
  Activity,
  Calendar,
  Brain,
  Stethoscope,
  ChevronDown,
  Search as SearchIcon,
  ArrowLeft,
  Share2,
  AlertCircle,
  Upload,
  ArrowUpDown,
  Network,
  Anchor,
  Layers,
  ListTree,
  Image as ImageIcon,
  ChevronLeft,
  MoreHorizontal,
  Check,
  Phone,
  CreditCard,
  Trash2,
  QrCode,
  Settings,
  Shield,
  ExternalLink,
  Copy,
  Lock,
  Eye,
  X,
  ClipboardList,
  FolderInput,
  Type,
  List,
  Hash,
  CheckSquare,
  ChevronUp,
  Layout,
  Columns,
  Grid,
  Info,
  Type as TextIcon,
  Minus,
  Pencil,
  Box,
  Users,
  FileBarChart,
  Heart,
  ArrowRight,
  Save,
  Play,
  File,
  ChevronDown as ChevronDownIcon,
  MoreVertical,
  Microscope,
  RotateCw,
  Sparkles,
  BookOpen,
  Lightbulb,
  CheckCircle2,
  Bell,
  AlertTriangle,
  History,
  Clock,
  Flag,
  ClipboardCheck,
  Power,
  ChevronsRight,
  ChevronsLeft,
  Sliders,
  Zap,
  HelpCircle,
  Bookmark,
  RefreshCw,
  Send,
  Edit2,
  FolderHeart,
  PieChart as LucidePieChart,
  ShieldAlert,
  GripVertical
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { QRCodeCanvas } from 'qrcode.react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  LineChart,
  Line
} from 'recharts';

// --- Types ---
type Page = 'home' | 'data-center' | 'search' | 'favorites' | 'form-center' | 'form-builder' | 'project' | 'cloud' | 'research-search' | 'research-search-result' | 'approval-center';
type Tab = 'overview' | 'patients' | 'datasets' | 'search-results' | 'search-overview' | 'search-analysis';

interface Patient {
  id: string;
  patientNo?: string;
  visitNo?: string;
  visitType?: string;
  dept?: string;
  visitDate?: string;
  name: string;
  gender: string;
  age: number;
  comp: number;
  source?: string;
  creator?: string;
  phone?: string;
  idCard?: string;
  tags?: string[];
  group?: string;
}

interface Metric {
  name: string;
  definition: string;
  type: string;
  processing: string;
  reference: string;
  rate: number;
  hasValuePatientCount: number;
}

interface DataEntryRecord {
  id: string;
  patientId: string;
  reportNo: string;
  reportDate: string;
  itemName: string;
  resultValue: string;
  unit?: string;
  refRange?: string;
  abnormalFlag?: string;
  hospital: string;
  originalReport?: string;
  enteredBy: string;
  updateTime: string;
  details?: string;
}

interface FavoriteProject {
  id: string;
  title: string;
  patientCount: number;
  patientNew: number;
  recordCount: number;
  recordNew: number;
  updateFrequency: string;
  updateTime: string;
}


interface MetricLibraryField {
  id: string;
  name: string;
  code: string;
  scores: string[];
  status: 'excel' | 'warn' | 'danger';
  type?: string;
}

interface MetricLibraryCategory {
  category: string;
  fields: MetricLibraryField[];
}

const METRIC_LIBRARY_DATA: MetricLibraryCategory[] = [
  {
    category: "费用记录",
    fields: [
      { id: "fy_1", name: "单价(元)", code: "price", scores: ['98.2%', '95.1%', '91.0%'], status: 'excel' },
      { id: "fy_2", name: "数量", code: "quantity", scores: ['98.5%', '94.8%', '90.5%'], status: 'excel' },
      { id: "fy_3", name: "总金额(元)", code: "total_amount", scores: ['97.8%', '93.2%', '88.0%'], status: 'excel' },
      { id: "fy_4", name: "收费类型代码", code: "charge_type_code", scores: ['99.0%', '98.0%', '96.5%'], status: 'excel' },
      { id: "fy_5", name: "收费项目代码", code: "item_code", scores: ['98.0%', '96.2%', '92.1%'], status: 'excel' },
      { id: "fy_6", name: "收费项目名称", code: "item_name", scores: ['98.4%', '96.0%', '91.8%'], status: 'excel' },
      { id: "fy_7", name: "患者id", code: "patient_id", scores: ['100%', '100%', '100%'], status: 'excel' },
      { id: "fy_8", name: "就诊id", code: "visit_id", scores: ['100%', '100%', '100%'], status: 'excel' },
      { id: "fy_9", name: "医院名称", code: "hospital_name", scores: ['99.2%', '97.5%', '95.0%'], status: 'excel' }
    ]
  },
  {
    category: "病理诊断",
    fields: [
      { id: "bl_1", name: "TNM 临床分期 (T/N/M)", code: "tnm_stage", scores: ['96.2%', '84.5%', '68.1%'], status: 'warn' },
      { id: "bl_2", name: "病理组织学分级 (Grade)", code: "pathological_grade", scores: ['92.0%', '81.0%', '70.5%'], status: 'excel' },
      { id: "bl_3", name: "肿瘤长径(cm)", code: "tumor_size", scores: ['94.5%', '83.0%', '72.0%'], status: 'excel' },
      { id: "bl_4", name: "脉管侵犯与神经侵犯", code: "vascular_invasion", scores: ['88.0%', '75.2%', '58.0%'], status: 'warn' },
      { id: "bl_5", name: "手术切缘状态 (R0/R1/R2)", code: "margin_status", scores: ['95.1%', '88.0%', '76.0%'], status: 'excel' }
    ]
  },
  {
    category: "基本信息",
    fields: [
      { id: "jb_1", name: "就诊年龄", code: "age", scores: ['100%', '100%', '99.8%'], status: 'excel' },
      { id: "jb_2", name: "性别", code: "gender", scores: ['100%', '100%', '100%'], status: 'excel' },
      { id: "jb_3", name: "BMI 体质指数", code: "bmi", scores: ['95.0%', '89.2%', '81.0%'], status: 'excel' },
      { id: "jb_4", name: "吸烟史与饮酒史", code: "smoking_drinking", scores: ['82.0%', '70.5%', '55.0%'], status: 'warn' },
      { id: "jb_5", name: "家族肿瘤遗传史", code: "family_history", scores: ['80.5%', '68.0%', '49.0%'], status: 'warn' }
    ]
  },
  {
    category: "检验报告",
    fields: [
      { id: "jy_1", name: "术前 ALT / AST (肝功能)", code: "liver_function", scores: ['98.5%', '92.1%', '81.4%'], status: 'excel' },
      { id: "jy_2", name: "血清 CEA / CA199 肿瘤标志物", code: "cea_ca199", scores: ['95.8%', '88.3%', '74.2%'], status: 'excel' },
      { id: "jy_3", name: "血常规 WBC / Hb / PLT", code: "blood_routine", scores: ['99.1%', '96.0%', '91.2%'], status: 'excel' },
      { id: "jy_4", name: "凝血功能 PT / APTT", code: "coagulation", scores: ['97.2%', '91.5%', '83.0%'], status: 'excel' },
      { id: "jy_5", name: "肾功能 肌酐 / 尿素氮", code: "kidney_function", scores: ['98.0%', '93.5%', '85.2%'], status: 'excel' }
    ]
  },
  {
    category: "基因及组学检测",
    fields: [
      { id: "jy_wes", name: "全外显子测序 (WES)", code: "wes_seq", scores: ['91.5%', '72.0%', '35.0%'], status: 'danger' },
      { id: "jy_pdl1", name: "PD-L1 表达阳性率 (TPS/CPS)", code: "pdl1_expr", scores: ['89.2%', '76.0%', '51.0%'], status: 'warn' },
      { id: "jy_egfr", name: "EGFR 基因突变丰度", code: "egfr_mutation", scores: ['93.0%', '82.0%', '61.0%'], status: 'excel' }
    ]
  },
  {
    category: "结局随访",
    fields: [
      { id: "sf_1", name: "1年/3年/5年生存状态 (OS)", code: "os_endpoint", scores: ['94.0%', '82.0%', '62.5%'], status: 'excel' },
      { id: "sf_2", name: "无进展生存期 (PFS)", code: "pfs_endpoint", scores: ['91.0%', '79.5%', '58.0%'], status: 'warn' },
      { id: "sf_3", name: "器官复发转移部位与时间", code: "recurrence_site", scores: ['86.5%', '71.0%', '48.2%'], status: 'danger' }
    ]
  },
  {
    category: "出院记录",
    fields: [
      { id: "cy_1", name: "出院主要诊断", code: "discharge_diag", scores: ['99.5%', '98.0%', '95.2%'], status: 'excel' },
      { id: "cy_2", name: "出院医嘱", code: "discharge_order", scores: ['96.0%', '91.2%', '82.0%'], status: 'excel' },
      { id: "cy_3", name: "离院方式", code: "discharge_status", scores: ['99.8%', '99.0%', '97.5%'], status: 'excel' }
    ]
  },
  {
    category: "基线检查",
    fields: [
      { id: "jx_1", name: "心电图(ECG)诊断", code: "ecg_diag", scores: ['97.5%', '92.0%', '84.0%'], status: 'excel' },
      { id: "jx_2", name: "胸部CT结构化报告", code: "chest_ct", scores: ['93.4%', '86.1%', '61.8%'], status: 'excel' },
      { id: "jx_3", name: "腹部B超/MRI报告", code: "abdominal_mri", scores: ['91.0%', '82.5%', '59.0%'], status: 'warn' }
    ]
  }
];


const MetricVisualization = ({ metricName, metricType, onClose }: { metricName: string, metricType: string, onClose: () => void }) => {
  const isContinuous = metricType === '连续';
  const [vizType, setVizType] = useState<string>(isContinuous ? 'box' : 'bar');

  const continuousOptions = [
    { id: 'box', label: '箱型图' },
    { id: 'hist', label: '直方图' }
  ];

  const discreteOptions = [
    { id: 'bar', label: '柱状图' },
    { id: 'pie', label: '饼图' },
    { id: 'ring', label: '环形图' },
    { id: 'strip', label: '条形图' }
  ];

  const currentOptions = isContinuous ? continuousOptions : discreteOptions;

  return (
    <motion.div 
      initial={{ x: 380, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 380, opacity: 0 }}
      className="w-[380px] bg-white border-l h-full flex flex-col p-6 overflow-hidden relative shadow-[-4px_0_15px_rgba(0,0,0,0.03)]"
    >
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-sm font-black text-slate-800">指标趋势</h3>
        <button onClick={onClose} className="p-1 hover:bg-slate-100 rounded-lg text-slate-400 transition-colors">
          <X size={18} />
        </button>
      </div>

      <div className="flex justify-end gap-1 mb-10 bg-slate-50 p-1 rounded-lg w-fit self-end">
        {currentOptions.map(opt => (
          <button 
            key={opt.id}
            onClick={() => setVizType(opt.id)}
            className={`px-3 py-1.5 rounded-md text-[11px] font-black transition-all ${vizType === opt.id ? 'bg-blue-500 text-white shadow-md' : 'text-slate-500 hover:bg-white'}`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      <div className="flex-1 flex flex-col relative min-h-[400px] overflow-y-auto no-scrollbar pb-10">
        {/* Watermark */}
        <div className="absolute inset-0 pointer-events-none flex flex-wrap gap-24 items-center justify-center opacity-[0.05] rotate-[-25deg] overflow-hidden">
          {[...Array(12)].map((_, i) => (
            <span key={i} className="text-2xl font-black whitespace-nowrap text-slate-300">test_A 8901</span>
          ))}
        </div>

        {isContinuous ? (
          <>
            <div className="text-[11px] text-slate-400 font-black mb-6">数值</div>
            <div className="flex-shrink-0 flex h-64 mb-8">
              <div className="w-10 flex flex-col justify-between items-end pr-3 pb-8 text-[11px] text-slate-400 font-black translate-y-[-6px]">
                {[80, 70, 60, 50, 40, 30, 20, 10].map(val => <span key={val}>{val}</span>)}
              </div>
              <div className="flex-1 flex flex-col">
                <div className="flex-1 relative border-l border-b border-slate-200">
                  {[70, 60, 50, 40, 30, 20, 10].map(val => (
                    <div key={val} className="absolute left-0 right-0 border-t border-slate-100" style={{ bottom: `${(val - 10) * (100 / 70)}%` }} />
                  ))}
                  {vizType === 'box' ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center pt-2">
                       <div className="relative w-24" style={{ height: '80%' }}>
                          <div className="absolute w-20 h-[1.5px] bg-blue-300 left-2" style={{ top: '0%' }} />
                          <div className="absolute w-[1.5px] bg-blue-300 left-1/2 -translate-x-[0.5px]" style={{ top: '0%', height: '22%' }} />
                          <div className="absolute left-0 right-0 bg-blue-100 border border-blue-200 rounded-sm" style={{ top: '22%', bottom: '26%' }} />
                          <div className="absolute left-0 right-0 h-[2px] bg-blue-400" style={{ top: '45%' }} />
                          <div className="absolute w-[1.5px] bg-blue-300 left-1/2 -translate-x-[0.5px]" style={{ bottom: '0%', height: '26%' }} />
                          <div className="absolute w-20 h-[1.5px] bg-blue-300 left-2" style={{ bottom: '0%' }} />
                       </div>
                    </div>
                  ) : (
                    <div className="absolute inset-0 flex items-end justify-center gap-1.5 px-6 pb-2">
                      {[25, 40, 55, 85, 100, 75, 50, 35, 20].map((h, idx) => (
                        <motion.div key={idx} initial={{ height: 0 }} animate={{ height: `${h}%` }} className="flex-1 bg-blue-100 border border-blue-200 rounded-t-sm" />
                      ))}
                    </div>
                  )}
                </div>
                <div className="h-10 flex items-center justify-center">
                  <span className="text-[11px] text-slate-400 font-black">{metricName}</span>
                </div>
              </div>
            </div>

            {/* Statistics Section */}
            <div className="mt-4 space-y-4 relative z-10">
              <h4 className="text-[13px] font-black text-slate-800 border-b border-slate-100 pb-2">数据统计</h4>
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <div className="text-[10px] text-slate-400 font-black mb-1 uppercase">填充率</div>
                  <div className="text-sm font-black text-slate-800 tabular-nums">100%</div>
                </div>
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <div className="text-[10px] text-slate-400 font-black mb-1 uppercase">有效值数量</div>
                  <div className="text-sm font-black text-slate-800 tabular-nums">12,920</div>
                </div>
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <div className="text-[10px] text-slate-400 font-black mb-1 uppercase">缺失值数量</div>
                  <div className="text-sm font-black text-slate-800 tabular-nums">0</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <div className="text-[10px] text-slate-400 font-black mb-1 uppercase">最小值</div>
                  <div className="text-sm font-black text-slate-800 tabular-nums">18</div>
                </div>
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <div className="text-[10px] text-slate-400 font-black mb-1 uppercase">最大值</div>
                  <div className="text-sm font-black text-slate-800 tabular-nums">82</div>
                </div>
              </div>
              
              <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100/50">
                <div className="text-[10px] text-blue-400 font-black mb-3 uppercase tracking-wider">百分位统计</div>
                <div className="flex justify-between items-center">
                  <div className="text-center flex-1">
                    <div className="text-[10px] text-slate-500 mb-1">P25</div>
                    <div className="text-sm font-black text-blue-600">32</div>
                  </div>
                  <div className="w-[1px] h-8 bg-blue-100" />
                  <div className="text-center flex-1">
                    <div className="text-[10px] text-slate-500 mb-1">P50 (中位数)</div>
                    <div className="text-sm font-black text-blue-600">45</div>
                  </div>
                  <div className="w-[1px] h-8 bg-blue-100" />
                  <div className="text-center flex-1">
                    <div className="text-[10px] text-slate-500 mb-1">P75</div>
                    <div className="text-sm font-black text-blue-600">64</div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col">
            <div className="flex-shrink-0 flex h-72 mb-8">
              {/* Y Axis Labels for discrete */}
              <div className="w-14 flex flex-col justify-between items-end pr-3 pb-8 text-[11px] text-slate-400 font-black translate-y-[-6px]">
                {['210,000', '180,000', '150,000', '120,000', '90,000', '60,000', '30,000', '0'].map(val => <span key={val}>{val}</span>)}
              </div>
              
              <div className="flex-1 flex flex-col">
                <div className="flex-1 relative border-l border-b border-slate-200 pt-10">
                  {/* Grid lines */}
                  {[180, 150, 120, 90, 60, 30].map(val => (
                    <div key={val} className="absolute left-0 right-0 border-t border-slate-100" style={{ bottom: `${(val / 210) * 100}%` }} />
                  ))}

                  {vizType === 'bar' && (
                    <div className="absolute inset-0 flex items-end justify-around px-8 pb-0">
                      <div className="relative group w-12 h-[90%] flex flex-col items-center">
                         {/* Tooltip */}
                         <div className="mb-2 bg-white shadow-xl border border-slate-100 px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity absolute -top-12 z-20 whitespace-nowrap">
                            <div className="flex items-center gap-2">
                               <div className="w-2 h-2 rounded-full bg-blue-500" />
                               <span className="text-[11px] font-black text-slate-700">男: 197058人次</span>
                            </div>
                         </div>
                         <motion.div initial={{ height: 0 }} animate={{ height: '100%' }} className="w-full bg-blue-600 rounded-t-sm" />
                      </div>
                      <div className="relative group w-12 h-[88%] flex flex-col items-center">
                         <motion.div initial={{ height: 0 }} animate={{ height: '100%' }} className="w-full bg-blue-600 rounded-t-sm" />
                      </div>
                    </div>
                  )}

                  {vizType === 'pie' && (
                    <div className="absolute inset-0 flex items-center justify-center p-8">
                       <div className="w-48 h-48 rounded-full border-[20px] border-blue-500 relative flex items-center justify-center overflow-hidden">
                          <div className="absolute inset-0 bg-blue-100 rotate-[45deg] origin-center -translate-x-[50%]" />
                       </div>
                    </div>
                  )}

                  {(vizType === 'ring' || vizType === 'strip') && (
                    <div className="absolute inset-0 flex items-center justify-center text-slate-300 text-[11px] font-black">
                       示意图开发中...
                    </div>
                  )}
                </div>

                {/* X Axis Labels for discrete */}
                <div className="h-14 flex items-start justify-around px-8 pt-2">
                   <span className="text-[11px] text-slate-400 font-black rotate-[45deg] translate-y-1">男</span>
                   <span className="text-[11px] text-slate-400 font-black rotate-[45deg] translate-y-1">女</span>
                </div>
              </div>
            </div>

            {/* Statistics Section for Discrete */}
            <div className="mt-4 space-y-4 relative z-10">
              <h4 className="text-[13px] font-black text-slate-800 border-b border-slate-100 pb-2">数据统计</h4>
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <div className="text-[10px] text-slate-400 font-black mb-1 uppercase">填充率</div>
                  <div className="text-sm font-black text-slate-800 tabular-nums">100%</div>
                </div>
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <div className="text-[10px] text-slate-400 font-black mb-1 uppercase">有效值数量</div>
                  <div className="text-sm font-black text-slate-800 tabular-nums">12,920</div>
                </div>
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <div className="text-[10px] text-slate-400 font-black mb-1 uppercase">缺失值数量</div>
                  <div className="text-sm font-black text-slate-800 tabular-nums">0</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};


interface SearchFavorite {
  id: string;
  name: string;
  conditions: string[];
  recordCount: number;
  patientCount: number;
  updateTime: string;
}

// --- Mock Data ---
const SEARCH_FAVORITES: SearchFavorite[] = [
  { 
    id: 'sf1', 
    name: '肝炎或肝衰竭患者乳酸变化水平', 
    conditions: [
      '纳入条件1: 院区: 全院; 就诊类型: 全部;',
      '纳入条件2: 同一次就诊; 诊断信息/原始诊断名称 包含 肝炎 或 肝衰竭;'
    ],
    recordCount: 2,
    patientCount: 2,
    updateTime: '2026-04-10 15:13:38'
  },
  { 
    id: 'sf2', 
    name: '慢性肝病患者凝血功能监测', 
    conditions: [
      '纳入条件1: 院区: 全院;',
      '纳入条件2: 检验项目 包含 凝血酶原时间;'
    ],
    recordCount: 45,
    patientCount: 12,
    updateTime: '2026-04-09 10:22:15'
  }
];

const FAVORITE_PROJECTS: (FavoriteProject & { qualityScore: number; completeness: string; missingRate: string; recommendationReason: string })[] = [
  { 
    id: '1', 
    title: '食管癌术后复发风险队列', 
    patientCount: 875, 
    patientNew: 12, 
    recordCount: 904, 
    recordNew: 15, 
    updateFrequency: '每周', 
    updateTime: '2026-08-01',
    qualityScore: 96,
    completeness: '96.2%',
    missingRate: '3.8%',
    recommendationReason: '完整度最高 (96.2%)，关键临床变量 TNM 分期与生存随访 OS 无缺失，质控达标率 99%，首选推荐科研挖掘。'
  },
  { 
    id: '2', 
    title: '肝癌患者丙肝抗体相关指标分析', 
    patientCount: 1842, 
    patientNew: 5, 
    recordCount: 2150, 
    recordNew: 8, 
    updateFrequency: '每天', 
    updateTime: '2026-08-03',
    qualityScore: 82,
    completeness: '84.5%',
    missingRate: '15.5%',
    recommendationReason: '样本规模庞大，但部分实验室检验指标存在 15% 缺失，适合作补充验证队列。'
  },
  { 
    id: '3', 
    title: '药物性肝炎早期诊断的生化检验指标研究', 
    patientCount: 95, 
    patientNew: 0, 
    recordCount: 103, 
    recordNew: 0, 
    updateFrequency: '每天', 
    updateTime: '2025-11-11',
    qualityScore: 68,
    completeness: '68.1%',
    missingRate: '31.9%',
    recommendationReason: '全外显子基因变异测序缺失率达到 31.9%，建议完成数据补录后再开展高阶分析。'
  },
  { 
    id: '4', 
    title: '肺癌免疫治疗随访队列', 
    patientCount: 640, 
    patientNew: 3, 
    recordCount: 780, 
    recordNew: 4, 
    updateFrequency: '每周', 
    updateTime: '2026-07-28',
    qualityScore: 89,
    completeness: '89.0%',
    missingRate: '11.0%',
    recommendationReason: '免疫治疗随访完整率 89%，数据质量优良，推荐作为备选深度队列。'
  },
  { 
    id: '5', 
    title: '肝癌标志物CA19-9联合其他生化指标研究', 
    patientCount: 210, 
    patientNew: 2, 
    recordCount: 240, 
    recordNew: 2, 
    updateFrequency: '每天', 
    updateTime: '2025-04-09',
    qualityScore: 75,
    completeness: '75.0%',
    missingRate: '25.0%',
    recommendationReason: '主要指标覆盖较全，但缺乏中长期生存随访数据。'
  },
  { 
    id: '6', 
    title: '慢性肝炎患者肝纤维化指标的临床意义研究', 
    patientCount: 320, 
    patientNew: 4, 
    recordCount: 410, 
    recordNew: 5, 
    updateFrequency: '每天', 
    updateTime: '2025-04-09',
    qualityScore: 78,
    completeness: '78.2%',
    missingRate: '21.8%',
    recommendationReason: '无侵入性肝纤维化扫描覆盖度 78%，整体质量中等。'
  },
  { 
    id: '7', 
    title: '胆囊病变与胆汁淤积相关代谢指标分析', 
    patientCount: 150, 
    patientNew: 1, 
    recordCount: 180, 
    recordNew: 1, 
    updateFrequency: '每天', 
    updateTime: '2025-03-20',
    qualityScore: 72,
    completeness: '72.4%',
    missingRate: '27.6%',
    recommendationReason: '代谢物指纹图谱数据存在多时间点缺失。'
  },
];

const PATIENTS: Patient[] = [
  { id: 'PAT20260128003-1', patientNo: 'PAT20260128003', visitNo: 'IMP202603200011', visitType: '外院门诊', name: '王**', gender: '-', age: 60, comp: 44.1, source: '手动入库', creator: '201859437033684', phone: '138****0000', idCard: '110**********1234' },
  { id: 'PAT20260128003-2', patientNo: 'PAT20260128003', visitNo: 'IMP202603200012', visitType: '外院门诊', name: '王**', gender: '-', age: 60, comp: 44.1, source: '手动入库', creator: '201859437033684', phone: '138****0000', idCard: '110**********1234' },
  { id: 'PAT20260128003-3', patientNo: 'PAT20260128003', visitNo: 'IMP202603200013', visitType: '外院住院', name: '王**', gender: '-', age: 60, comp: 44.62, source: '手动入库', creator: '201859437033684', phone: '138****0000', idCard: '110**********1234' },
  { id: 'PAT20260128001-1', patientNo: 'PAT20260128001', visitNo: 'IMP202603230001', visitType: '外院门诊', name: '张*', gender: '-', age: 30, comp: 38.56, source: '手动入库', creator: '199856294249816', phone: '139****1111', idCard: '220**********5678' },
  { id: 'PAT20260128001-2', patientNo: 'PAT20260128001', visitNo: 'IMP202603230002', visitType: '外院住院', name: '张*', gender: '-', age: 30, comp: 39.22, source: '手动入库', creator: '201859437033684', phone: '139****1111', idCard: '220**********5678' },
  { id: 'PAT20260128001-3', patientNo: 'PAT20260128001', visitNo: 'IMP202603230003', visitType: '外院住院', name: '张*', gender: '-', age: 30, comp: 39.22, source: '手动入库', creator: '201859437033684', phone: '139****1111', idCard: '220**********5678' },
  { id: 'PAT20260128001-4', patientNo: 'PAT20260128001', visitNo: 'IMP202603230004', visitType: '外院门诊', name: '张*', gender: '-', age: 30, comp: 38.56, source: '手动入库', creator: '199856294249816', phone: '139****1111', idCard: '220**********5678' },
  { id: 'PAT20260128001-5', patientNo: 'PAT20260128001', visitNo: 'IMP202603230005', visitType: '外院住院', name: '张*', gender: '-', age: 30, comp: 39.22, source: '手动入库', creator: '199856294249816', phone: '139****1111', idCard: '220**********5678' },
  { id: 'PAT20260128001-6', patientNo: 'PAT20260128001', visitNo: 'IMP202603240001', visitType: '外院急诊', name: '张*', gender: '-', age: 30, comp: 38.56, source: '手动入库', creator: '199856294249816', phone: '139****1111', idCard: '220**********5678' },
  { id: 'P001494', patientNo: 'P001494', visitNo: 'IMP202603250001', visitType: '外院门诊', name: '张*', gender: '-', age: 69, comp: 82.07, source: '手动入库', creator: '192618375262422', phone: '137****2222', idCard: '330**********9012' },
  { id: 'P000452-1', patientNo: 'P000452', visitNo: 'IMP202603250002', visitType: '外院门诊', name: '张*', gender: '-', age: 70, comp: 82.07, source: '手动入库', creator: '192618375262422', phone: '136****3333', idCard: '440**********3456' },
  { id: 'P000949', patientNo: 'P000949', visitNo: 'IMP202603260001', visitType: '外院门诊', name: '张*', gender: '-', age: 51, comp: 87.59, source: '手动入库', creator: '199856294249816', phone: '135****4444', idCard: '550**********7890' },
  { id: 'P000452-2', patientNo: 'P000452', visitNo: 'IMP202603260002', visitType: '外院急诊', name: '张*', gender: '-', age: 66, comp: 82.07, source: '手动入库', creator: '192618375262422', phone: '136****3333', idCard: '440**********3456' },
  { id: 'P000452-3', patientNo: 'P000452', visitNo: 'IMP202603260003', visitType: '外院住院', name: '张*', gender: '-', age: 70, comp: 82.76, source: '手动入库', creator: '192618375262422', phone: '136****3333', idCard: '440**********3456' },
];

const METRICS: Metric[] = [
  { name: '出院复诊日期', definition: '-', type: '日期', processing: '数据湖', reference: '-', rate: 15.04, hasValuePatientCount: 10656 },
  { name: '出院时间', definition: '-', type: '日期', processing: '数据湖', reference: '-', rate: 15.04, hasValuePatientCount: 10656 },
  { name: '出院科室', definition: '-', type: '无', processing: '数据湖', reference: '-', rate: 15.05, hasValuePatientCount: 10666 },
  { name: '性别', definition: '-', type: '二分', processing: '数据湖', reference: '-', rate: 100, hasValuePatientCount: 12920 },
  { name: '出生日期', definition: '-', type: '日期', processing: '数据湖', reference: '-', rate: 100, hasValuePatientCount: 12919 },
  { name: '年龄(岁)', definition: '-', type: '连续', processing: '数据湖', reference: '-', rate: 100, hasValuePatientCount: 12920 },
  { name: '年龄(天)', definition: '-', type: '连续', processing: '数据湖', reference: '-', rate: 99.98, hasValuePatientCount: 12912 },
  { name: '证件类别', definition: '-', type: '无', processing: '数据湖', reference: '-', rate: 100, hasValuePatientCount: 12920 },
  { name: '证件号', definition: '-', type: '无', processing: '数据湖', reference: '-', rate: 100, hasValuePatientCount: 12920 },
  { name: '手机号码', definition: '-', type: '无', processing: '数据湖', reference: '-', rate: 100, hasValuePatientCount: 12920 },
  { name: '婚姻状态', definition: '-', type: '有序', processing: '数据湖', reference: '-', rate: 100, hasValuePatientCount: 12920 },
  { name: '职业', definition: '-', type: '有序', processing: '数据湖', reference: '-', rate: 100, hasValuePatientCount: 12920 },
  { name: '宗教信仰', definition: '-', type: '无', processing: '数据湖', reference: '-', rate: 0.01, hasValuePatientCount: 12 },
  { name: '现居住地址', definition: '-', type: '无', processing: '数据湖', reference: '-', rate: 99.99, hasValuePatientCount: 12920 },
  { name: '现住址(省市)', definition: '-', type: '无', processing: '数据湖', reference: '-', rate: 99.99, hasValuePatientCount: 12920 },
  { name: '居住地址(详细)', definition: '-', type: '无', processing: '数据湖', reference: '-', rate: 99.99, hasValuePatientCount: 12920 },
];

const DATA_ENTRY_RECORDS: DataEntryRecord[] = [
  { id: '1', patientId: '62010', reportNo: '', reportDate: '', itemName: '白细胞', resultValue: 'xxx', unit: 'xxx', refRange: 'xxx', abnormalFlag: 'xxx', hospital: '中山三院', originalReport: '图片缩略图', enteredBy: '张三', updateTime: '2026-02-11 15:16:09' },
  { id: '2', patientId: '62010', reportNo: '', reportDate: '', itemName: '红细胞', resultValue: 'xxx', unit: 'xxx', refRange: 'xxx', abnormalFlag: 'xxx', hospital: '中山一院', originalReport: '图片缩略图', enteredBy: '张三', updateTime: '2026-02-11 15:16:09' },
  { id: '3', patientId: '62011', reportNo: '', reportDate: '', itemName: '血红蛋白', resultValue: 'xxx', unit: 'xxx', refRange: 'xxx', abnormalFlag: 'xxx', hospital: '中山一院', originalReport: '图片缩略图', enteredBy: '张三', updateTime: '2026-02-11 15:16:09' },
  { id: '4', patientId: '62011', reportNo: '', reportDate: '', itemName: '血小板', resultValue: 'xxx', unit: 'xxx', refRange: 'xxx', abnormalFlag: 'xxx', hospital: '中山六院', originalReport: '图片缩略图', enteredBy: '张三', updateTime: '2026-02-11 15:16:09' },
  { id: '5', patientId: '', reportNo: '', reportDate: '', itemName: '', resultValue: '', unit: '', refRange: '', abnormalFlag: '', hospital: '', originalReport: '', enteredBy: '', updateTime: '' },
  { id: '6', patientId: '', reportNo: '', reportDate: '', itemName: '', resultValue: '', unit: '', refRange: '', abnormalFlag: '', hospital: '', originalReport: '', enteredBy: '', updateTime: '' },
  { id: '7', patientId: '', reportNo: '', reportDate: '', itemName: '', resultValue: '', unit: '', refRange: '', abnormalFlag: '', hospital: '', originalReport: '', enteredBy: '', updateTime: '' },
  { id: '8', patientId: '', reportNo: '', reportDate: '', itemName: '', resultValue: '', unit: '', refRange: '', abnormalFlag: '', hospital: '', originalReport: '', enteredBy: '', updateTime: '' },
];

// --- Components ---

const SidebarItem = ({ 
  icon: Icon, 
  label, 
  active, 
  isCollapsed,
  onClick 
}: { 
  icon: any, 
  label: string, 
  active: boolean, 
  isCollapsed?: boolean,
  onClick: () => void 
}) => (
  <div 
    onClick={onClick}
    title={isCollapsed ? label : undefined}
    className={`flex items-center cursor-pointer transition-all duration-200 ${
      isCollapsed 
        ? 'mx-auto my-2 w-10 h-10 justify-center rounded-xl' 
        : 'gap-3 px-6 py-4'
    } ${
      active 
        ? isCollapsed ? 'bg-[#3b82f6] text-white shadow-md shadow-blue-500/20' : 'bg-[#3b82f6] text-white' 
        : 'text-slate-400 hover:text-white hover:bg-white/5'
    }`}
  >
    <Icon size={20} className={active ? '' : 'opacity-80'} />
    {!isCollapsed && <span className="text-sm font-medium whitespace-nowrap">{label}</span>}
  </div>
);

const ProgressBar = ({ progress }: { progress: number }) => (
  <div className="flex items-center gap-3 w-full">
    <div className="h-1.5 bg-slate-100 rounded-full flex-1 overflow-hidden">
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        className="h-full bg-blue-600 rounded-full"
      />
    </div>
    <span className="text-xs font-bold text-blue-600 min-w-[30px]">{progress}%</span>
  </div>
);

// --- Patient Self-Fill Form (Mobile Optimized) ---
const PatientSelfFillForm = ({ 
  onBack, 
  onComplete,
  targetForm 
}: { 
  onBack: () => void, 
  onComplete: (records: any[]) => void,
  targetForm?: { id: string, name: string, scenario: string, enabled: boolean }
}) => {
  const [step, setStep] = useState(1);
  const [patientInfo, setPatientInfo] = useState({ name: '', idCard: '' });
  const [reports, setReports] = useState([{ 
    id: '1', 
    type: 'imaging' as 'imaging' | 'pathology', 
    date: '', 
    item: targetForm?.name || '', 
    result: '' 
  }]);

  // Questionnaire specific state
  const [qData, setQData] = useState({
    name: '',
    age: '',
    healthCard: '',
    height: '',
    weight: '',
    waist: '',
    birthplace: '',
    gender: '',
    education: ''
  });

  // Gene report specific state
  const [gData, setGData] = useState({
    reportId: '',
    reportDate: '',
    sampleType: '外周血',
    method: '全外显子组测序',
    geneName: '',
    mutation: '',
    significance: '致病'
  });

  if (targetForm && !targetForm.enabled) {
    return (
      <div className="fixed inset-0 bg-slate-50 z-[100] flex flex-col items-center justify-center p-8 text-center">
        <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-6">
          <Lock size={40} />
        </div>
        <h2 className="text-2xl font-black text-slate-800 mb-2">表单已停用</h2>
        <p className="text-slate-500 mb-8">该表单的患者自助录入功能已被管理员关闭，请联系相关工作人员。</p>
        <button 
          onClick={onBack}
          className="px-8 py-4 bg-slate-800 text-white font-black rounded-2xl shadow-xl shadow-slate-100"
        >
          返回首页
        </button>
      </div>
    );
  }

  const handleSubmit = () => {
    if (targetForm?.id === 'f1') {
      // Handle questionnaire submission
      const newRecords = [{
        id: Math.random().toString(36).substr(2, 9),
        patientId: 'P' + Math.random().toString(36).substr(2, 5).toUpperCase(),
        reportNo: 'Q' + Math.random().toString(36).substr(2, 5).toUpperCase(),
        reportDate: new Date().toISOString().split('T')[0],
        itemName: '简易问卷',
        resultValue: '已提交',
        details: JSON.stringify(qData),
        hospital: '患者自助录入',
        enteredBy: qData.name || '患者本人',
        updateTime: new Date().toLocaleString()
      }];
      onComplete(newRecords);
      return;
    }

    if (targetForm?.id === 'f3') {
      // Handle gene report submission
      const newRecords = [{
        id: Math.random().toString(36).substr(2, 9),
        patientId: 'P' + Math.random().toString(36).substr(2, 5).toUpperCase(),
        reportNo: gData.reportId || 'G' + Math.random().toString(36).substr(2, 5).toUpperCase(),
        reportDate: gData.reportDate || new Date().toISOString().split('T')[0],
        itemName: '外显子基因报告',
        resultValue: `${gData.geneName} ${gData.mutation}`,
        details: JSON.stringify(gData),
        hospital: '患者自助录入',
        enteredBy: '患者本人',
        updateTime: new Date().toLocaleString()
      }];
      onComplete(newRecords);
      return;
    }

      const newRecords = reports.map(r => ({
      id: Math.random().toString(36).substr(2, 9),
      patientId: 'P' + Math.random().toString(36).substr(2, 5).toUpperCase(),
      reportNo: 'R' + Math.random().toString(36).substr(2, 5).toUpperCase(),
      reportDate: r.date || new Date().toISOString().split('T')[0],
      itemName: r.item || (r.type === 'imaging' ? '检查报告' : '病理报告'),
      resultValue: r.result || '已完成',
      unit: r.type === 'imaging' ? '10^9/L' : '-',
      refRange: r.type === 'imaging' ? '4.0-10.0' : '-',
      abnormalFlag: '正常',
      hospital: '患者自助录入',
      originalReport: '患者上传图片',
      enteredBy: patientInfo.name || '患者本人',
      updateTime: new Date().toLocaleString()
    }));
    onComplete(newRecords);
  };

  const isF1 = targetForm?.id === 'f1';
  const isF3 = targetForm?.id === 'f3';

  return (
    <div className="fixed inset-0 bg-slate-50 z-[100] flex flex-col font-sans overflow-auto">
      <div className="bg-white p-4 border-b border-slate-100 flex items-center gap-3 sticky top-0 z-10">
        <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full">
          <ArrowLeft size={20} />
        </button>
        <h1 className="font-black text-lg">
          {isF1 ? '简易问卷填写' : isF3 ? '外显子基因报告录入' : '患者自助数据补录'}
        </h1>
      </div>

      <div className="p-4 max-w-md mx-auto w-full flex-1">
        {step === 1 ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 pt-4">
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-slate-600 ml-1">姓名</label>
                <input 
                  type="text" 
                  value={patientInfo.name}
                  onChange={e => setPatientInfo({ ...patientInfo, name: e.target.value })}
                  placeholder="请输入您的真实姓名" 
                  className="w-full px-5 py-4 bg-white border border-slate-200 rounded-2xl text-base outline-none focus:ring-4 focus:ring-blue-100 transition-all" 
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-slate-600 ml-1">身份证号</label>
                <input 
                  type="text" 
                  value={patientInfo.idCard}
                  onChange={e => setPatientInfo({ ...patientInfo, idCard: e.target.value })}
                  placeholder="请输入您的身份证号码" 
                  className="w-full px-5 py-4 bg-white border border-slate-200 rounded-2xl text-base outline-none focus:ring-4 focus:ring-blue-100 transition-all" 
                />
              </div>
            </div>

            <button 
              onClick={() => {
                if (isF1) {
                  setQData({ ...qData, name: patientInfo.name });
                }
                setStep(2);
              }}
              disabled={!patientInfo.name || !patientInfo.idCard}
              className="w-full py-4 bg-blue-600 text-white font-black rounded-2xl shadow-xl shadow-blue-100 disabled:opacity-50 mt-8"
            >
              下一步：{isF1 ? '填写问卷' : isF3 ? '填写报告' : '填写信息'}
            </button>
          </motion.div>
        ) : isF1 ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 pb-32">
            {/* Part 1: Demographic Information */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-blue-600 font-black">
                <span className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs">1</span>
                <h3 className="text-sm">第一部分人口学信息</h3>
              </div>
              
              <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm space-y-4">
                {[
                  { label: '您的姓名', key: 'name', placeholder: '请输入姓名' },
                  { label: '您的年龄', key: 'age', placeholder: '请输入年龄', type: 'number' },
                  { label: '您的健康卡号', key: 'healthCard', placeholder: '请输入健康卡号' },
                  { label: '您的身高 (cm)', key: 'height', placeholder: '请输入身高', type: 'number' },
                  { label: '您的体重 (kg)', key: 'weight', placeholder: '请输入体重', type: 'number' },
                  { label: '您的腰围 (cm)', key: 'waist', placeholder: '请输入腰围', type: 'number' },
                  { label: '您的籍贯/出生地', key: 'birthplace', placeholder: '请输入籍贯/出生地' },
                ].map((field) => (
                  <div key={field.key} className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 ml-1">{field.label}</label>
                    <input 
                      type={field.type || 'text'}
                      value={(qData as any)[field.key]}
                      onChange={e => setQData({ ...qData, [field.key]: e.target.value })}
                      placeholder={field.placeholder}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm outline-none focus:bg-white focus:border-blue-200 transition-all"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Part 2: Gender */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-blue-600 font-black">
                <span className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs">2</span>
                <h3 className="text-sm">您的性别</h3>
              </div>
              <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex gap-12">
                {['男', '女'].map((g) => (
                  <label key={g} className="flex items-center gap-3 cursor-pointer group">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${qData.gender === g ? 'border-blue-600 bg-blue-600' : 'border-slate-200 group-hover:border-blue-200'}`}>
                      {qData.gender === g && <div className="w-2 h-2 bg-white rounded-full" />}
                    </div>
                    <input 
                      type="radio" 
                      className="hidden" 
                      name="gender" 
                      checked={qData.gender === g}
                      onChange={() => setQData({ ...qData, gender: g })}
                    />
                    <span className={`text-sm font-bold ${qData.gender === g ? 'text-blue-600' : 'text-slate-500'}`}>{g}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Part 3: Education */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-blue-600 font-black">
                <span className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs">3</span>
                <h3 className="text-sm">您的文化程度</h3>
              </div>
              <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm grid grid-cols-1 gap-4">
                {['小学及以下', '初、高中或中专', '大专/本科', '硕士及以上'].map((edu) => (
                  <label key={edu} className="flex items-center gap-3 cursor-pointer group p-3 rounded-2xl border border-slate-50 hover:bg-slate-50 transition-all">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${qData.education === edu ? 'border-blue-600 bg-blue-600' : 'border-slate-200 group-hover:border-blue-200'}`}>
                      {qData.education === edu && <div className="w-2 h-2 bg-white rounded-full" />}
                    </div>
                    <input 
                      type="radio" 
                      className="hidden" 
                      name="education" 
                      checked={qData.education === edu}
                      onChange={() => setQData({ ...qData, education: edu })}
                    />
                    <span className={`text-sm font-bold ${qData.education === edu ? 'text-blue-600' : 'text-slate-500'}`}>{edu}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/90 backdrop-blur-md border-t border-slate-100 z-20">
              <button 
                onClick={handleSubmit}
                disabled={!qData.name || !qData.gender || !qData.education}
                className="w-full py-4 bg-blue-600 text-white font-black rounded-2xl shadow-xl shadow-blue-100 disabled:opacity-50"
              >
                提交问卷
              </button>
            </div>
          </motion.div>
        ) : isF3 ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 pb-24 pt-4">
            <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 ml-1">报告单号</label>
                <input 
                  type="text" 
                  value={gData.reportId}
                  onChange={e => setGData({ ...gData, reportId: e.target.value })}
                  placeholder="请输入报告单号"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm outline-none focus:bg-white focus:border-blue-200 transition-all"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 ml-1">报告日期</label>
                <input 
                  type="date" 
                  value={gData.reportDate}
                  onChange={e => setGData({ ...gData, reportDate: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm outline-none focus:bg-white focus:border-blue-200 transition-all"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 ml-1">样本类型</label>
                <input 
                  type="text" 
                  value={gData.sampleType}
                  onChange={e => setGData({ ...gData, sampleType: e.target.value })}
                  placeholder="如：外周血"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm outline-none focus:bg-white focus:border-blue-200 transition-all"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 ml-1">检测方法</label>
                <input 
                  type="text" 
                  value={gData.method}
                  onChange={e => setGData({ ...gData, method: e.target.value })}
                  placeholder="如：全外显子组测序"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm outline-none focus:bg-white focus:border-blue-200 transition-all"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 ml-1">基因名称</label>
                <input 
                  type="text" 
                  value={gData.geneName}
                  onChange={e => setGData({ ...gData, geneName: e.target.value })}
                  placeholder="如：EGFR"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm outline-none focus:bg-white focus:border-blue-200 transition-all"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 ml-1">变异描述</label>
                <input 
                  type="text" 
                  value={gData.mutation}
                  onChange={e => setGData({ ...gData, mutation: e.target.value })}
                  placeholder="如：L858R"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm outline-none focus:bg-white focus:border-blue-200 transition-all"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 ml-1">临床意义</label>
                <select 
                  value={gData.significance}
                  onChange={e => setGData({ ...gData, significance: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm outline-none focus:bg-white focus:border-blue-200 transition-all"
                >
                  <option>致病</option>
                  <option>可能致病</option>
                  <option>意义未明</option>
                  <option>可能良性</option>
                  <option>良性</option>
                </select>
              </div>
            </div>

            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-md border-t border-slate-100 z-20">
              <button 
                onClick={handleSubmit}
                disabled={!gData.reportId || !gData.geneName}
                className="w-full py-4 bg-blue-600 text-white font-black rounded-2xl shadow-xl shadow-blue-100 disabled:opacity-50"
              >
                提交报告
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 pb-20">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-black">报告信息</h2>
              {!targetForm && (
                <button 
                  onClick={() => setReports([...reports, { id: Date.now().toString(), type: 'lab', date: '', item: '', result: '' }])}
                  className="text-blue-600 font-bold text-sm flex items-center gap-1"
                >
                  <Plus size={16} /> 添加报告
                </button>
              )}
            </div>

            {reports.map((report, idx) => (
              <div key={report.id} className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm space-y-4 relative">
                {reports.length > 1 && (
                  <button 
                    onClick={() => setReports(reports.filter(r => r.id !== report.id))}
                    className="absolute top-4 right-4 text-slate-300 hover:text-red-500"
                  >
                    <Trash2 size={18} />
                  </button>
                )}
                
                {!targetForm && (
                  <div className="flex gap-2 p-1 bg-slate-100 rounded-xl w-fit">
                    <button 
                      onClick={() => setReports(reports.map(r => r.id === report.id ? { ...r, type: 'imaging' } : r))}
                      className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${report.type === 'imaging' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400'}`}
                    >
                      检查报告
                    </button>
                    <button 
                      onClick={() => setReports(reports.map(r => r.id === report.id ? { ...r, type: 'pathology' } : r))}
                      className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${report.type === 'pathology' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400'}`}
                    >
                      病理报告
                    </button>
                  </div>
                )}

                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500">项目名称</label>
                    <input 
                      type="text" 
                      placeholder={report.type === 'imaging' ? "如：胸部CT检查报告" : "如：肺部病理诊断报告"}
                      value={report.item}
                      onChange={e => setReports(reports.map(r => r.id === report.id ? { ...r, item: e.target.value } : r))}
                      readOnly={!!targetForm}
                      className={`w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm outline-none focus:bg-white focus:border-blue-200 ${targetForm ? 'text-slate-400 cursor-not-allowed' : ''}`} 
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500">日期</label>
                    <input 
                      type="date" 
                      value={report.date}
                      onChange={e => setReports(reports.map(r => r.id === report.id ? { ...r, date: e.target.value } : r))}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm outline-none focus:bg-white focus:border-blue-200" 
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500">结果</label>
                    <input 
                      type="text" 
                      placeholder="请输入结果"
                      value={report.result}
                      onChange={e => setReports(reports.map(r => r.id === report.id ? { ...r, result: e.target.value } : r))}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm outline-none focus:bg-white focus:border-blue-200" 
                    />
                  </div>
                </div>
              </div>
            ))}

            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-md border-t border-slate-100">
              <button 
                onClick={handleSubmit}
                className="w-full py-4 bg-blue-600 text-white font-black rounded-2xl shadow-xl shadow-blue-100"
              >
                提交补录数据
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

const clinicalMedicationData = [
  { name: '恩替卡韦', count: 60 },
  { name: '护肝片', count: 45 },
  { name: '替诺福韦', count: 30 },
  { name: '干扰素', count: 20 },
  { name: '异甘草酸镁', count: 15 },
];

const dataLevelQualityData = [
  { name: '缺失记录', value: 12 },
  { name: '完整记录', value: 88 },
];

const dataLevelEntityData = [
  { name: '患者', count: 120 },
  { name: '就诊', count: 450 },
  { name: '诊断', count: 800 },
  { name: '医嘱', count: 1200 },
  { name: '检验', count: 3400 },
  { name: '检查', count: 900 },
];

const clinicalDeptData = [
  { name: '感染科', count: 45 },
  { name: '肝病科', count: 32 },
  { name: '消化内科', count: 15 },
  { name: '外科', count: 10 },
  { name: '其他', count: 8 },
];

const pieColors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];

const bizDeptData = [
  { name: '消化内科', count: 28200 },
  { name: '妇科', count: 28200 },
  { name: '内分泌科', count: 28150 },
  { name: '心血管内科', count: 28100 },
  { name: '骨科', count: 28000 },
  { name: '儿科', count: 28000 },
  { name: '急诊科', count: 27900 },
  { name: '眼科', count: 27800 },
  { name: '泌尿外科', count: 27750 },
  { name: '普外科', count: 27700 },
];

const bizMedsTop10 = [
  { name: '左氧氟沙星', count: 6300 },
  { name: '环丙沙星', count: 5250 },
  { name: '左炔诺孕酮', count: 5020 },
  { name: '咪康唑', count: 4850 },
  { name: '甲硝唑', count: 4780 },
  { name: '利巴韦林', count: 4300 },
  { name: '奥硝唑', count: 4210 },
  { name: '干扰素α-2b', count: 4160 },
  { name: '克林霉素', count: 4150 },
  { name: '两性霉素B', count: 4020 },
];

const bizExamTop10 = [
  { name: '胸部 X 线', count: 13228 },
  { name: '腹部超声', count: 10500 },
  { name: '肺部 CT', count: 7800 },
  { name: '颅脑 CT', count: 7600 },
  { name: '肺功能检查', count: 7400 },
  { name: '腹部 CT', count: 7100 },
  { name: '颅脑 MRI', count: 6700 },
  { name: '心电图', count: 6300 },
  { name: '泌尿系 CT', count: 5200 },
  { name: '经阴道超声', count: 4700 },
];

const bizLabTop10 = [
  { name: 'PKG2', count: 28200 },
  { name: 'PKG4', count: 28100 },
  { name: 'PKG3', count: 28050 },
  { name: 'PKG1', count: 28000 },
  { name: '血清', count: 13000 },
  { name: '葡萄糖', count: 13200 },
  { name: '尿素', count: 13100 },
];

const bizDiagTop10 = [
  { name: '肺炎', count: 6350 },
  { name: '上呼吸道感染', count: 5200 },
  { name: '支气管炎', count: 4850 },
  { name: '2 型糖尿病', count: 4200 },
  { name: '头痛', count: 4000 },
  { name: '骨折', count: 3700 },
  { name: '发热', count: 3400 },
  { name: '子宫肌瘤', count: 3200 },
  { name: '白内障', count: 3180 },
  { name: '胃炎', count: 3150 },
];

const bizSurgTop10 = [
  { name: '腹腔镜胆囊切除术', count: 5400 },
  { name: '阑尾切除术', count: 4200 },
  { name: '食管癌根治术', count: 3800 },
  { name: '冠脉支架植入术', count: 3600 },
  { name: '胃大部切除术', count: 3100 },
  { name: '疝修补术', count: 2900 },
  { name: '剖宫产术', count: 2750 },
  { name: '关节置换术', count: 2500 },
  { name: '扁桃体切除术', count: 2300 },
  { name: '肺叶切除术', count: 2100 },
];

const bizAgeTop10 = [
  { name: '60-69 岁', count: 18500 },
  { name: '50-59 岁', count: 16200 },
  { name: '70-79 岁', count: 14800 },
  { name: '40-49 岁', count: 11300 },
  { name: '80 岁以上', count: 8500 },
  { name: '30-39 岁', count: 6200 },
  { name: '18-29 岁', count: 4100 },
  { name: '0-17 岁', count: 2800 },
];

const bizPayTop10 = [
  { name: '城镇职工医保', count: 21500 },
  { name: '城乡居民医保', count: 18400 },
  { name: '全自费', count: 8200 },
  { name: '异地医保结算', count: 5600 },
  { name: '商业补充险', count: 3200 },
  { name: '公费医疗', count: 1800 },
];

const bizGeneTop10 = [
  { name: 'EGFR 突变', count: 4800 },
  { name: 'TP53 突变', count: 4100 },
  { name: 'KRAS 突变', count: 3500 },
  { name: 'BRAF V600E', count: 2800 },
  { name: 'ALK 融合', count: 2400 },
  { name: 'PIK3CA 突变', count: 2100 },
  { name: 'HER2 扩增', count: 1900 },
  { name: 'MET 扩增', count: 1600 },
  { name: 'ROS1 融合', count: 1200 },
  { name: 'RET 融合', count: 950 },
];

const bizStayDays = [
  { name: '1-3 天', count: 12400 },
  { name: '4-7 天', count: 22800 },
  { name: '8-14 天', count: 15600 },
  { name: '15-21 天', count: 6200 },
  { name: '22-30 天', count: 2800 },
  { name: '30 天以上', count: 1100 },
];

interface BizStatCard {
  id: string;
  contentType: string;
  title: string;
  metricId: string;
}

const BIZ_METRIC_PRESETS: Record<string, { id: string; name: string; defaultTitle: string; defaultType: string; data: { name: string; count: number }[]; ticks?: number[]; unit?: string }> = {
  dept: { id: 'dept', name: '就诊科室分布', defaultTitle: '就诊科室分布', defaultType: '自定义', data: bizDeptData, ticks: [0, 5000, 10000, 15000, 20000, 25000, 28200], unit: '人次' },
  meds: { id: 'meds', name: '用药top10', defaultTitle: '用药top10', defaultType: '自定义', data: bizMedsTop10, ticks: [0, 1000, 2000, 3000, 4000, 5000, 6000], unit: '人次' },
  exam: { id: 'exam', name: '检查top10', defaultTitle: '检查top10', defaultType: '自定义', data: bizExamTop10, ticks: [0, 3000, 6000, 9000, 12000, 13228], unit: '人次' },
  lab: { id: 'lab', name: '检验top10', defaultTitle: '检验top10', defaultType: '自定义', data: bizLabTop10, ticks: [0, 5000, 10000, 15000, 20000, 25000, 28200], unit: '人次' },
  diag: { id: 'diag', name: '诊断top10', defaultTitle: '诊断top10', defaultType: '自定义', data: bizDiagTop10, ticks: [0, 1000, 2000, 3000, 4000, 5000, 6000], unit: '例' },
  surg: { id: 'surg', name: '手术top10', defaultTitle: '手术top10', defaultType: '诊疗业务', data: bizSurgTop10, ticks: [0, 1000, 2000, 3000, 4000, 5000, 6000], unit: '台' },
  age: { id: 'age', name: '患者年龄分布', defaultTitle: '患者年龄段分布', defaultType: '常用指标', data: bizAgeTop10, ticks: [0, 5000, 10000, 15000, 20000], unit: '人' },
  pay: { id: 'pay', name: '医保支付类型', defaultTitle: '付费类型分布', defaultType: '常用指标', data: bizPayTop10, ticks: [0, 5000, 10000, 15000, 22000], unit: '人次' },
  gene: { id: 'gene', name: '基因检测Top10', defaultTitle: '基因突变Top10', defaultType: '质控洞察', data: bizGeneTop10, ticks: [0, 1000, 2000, 3000, 4000, 5000], unit: '例' },
  stay: { id: 'stay', name: '住院天数分布', defaultTitle: '住院时长分布', defaultType: '诊疗业务', data: bizStayDays, ticks: [0, 5000, 10000, 15000, 25000], unit: '例' },
};

function BizBarChartCard({
  title,
  metricId,
  contentType,
  cardIndex,
  isDragging,
  isDragOver,
  onDragStart,
  onDragOver,
  onDragLeave,
  onDrop,
  onDragEnd,
  onDelete,
}: {
  key?: React.Key;
  title: string;
  metricId: string;
  contentType?: string;
  cardIndex?: number;
  isDragging?: boolean;
  isDragOver?: boolean;
  onDragStart?: (e: React.DragEvent) => void;
  onDragOver?: (e: React.DragEvent) => void;
  onDragLeave?: (e: React.DragEvent) => void;
  onDrop?: (e: React.DragEvent) => void;
  onDragEnd?: (e: React.DragEvent) => void;
  onDelete?: () => void;
}) {
  const preset = BIZ_METRIC_PRESETS[metricId] || BIZ_METRIC_PRESETS.dept;
  const data = preset.data;
  const ticks = preset.ticks;
  const unit = preset.unit || '人次';
  const maxVal = ticks ? ticks[ticks.length - 1] : Math.max(...data.map((d) => d.count));

  return (
    <div
      draggable
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      onDragEnd={onDragEnd}
      className={`bg-white rounded-xl border transition-all flex flex-col group relative ${
        isDragging
          ? 'opacity-30 border-2 border-dashed border-blue-500 bg-blue-50/40 scale-95 shadow-none'
          : isDragOver
          ? 'border-2 border-blue-500 ring-4 ring-blue-100 shadow-md scale-[1.01]'
          : 'border-slate-100 hover:border-slate-200 hover:shadow-md'
      } p-5`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1.5 cursor-grab active:cursor-grabbing group/title" title="按住拖拽可调整卡片排序">
          <GripVertical size={14} className="text-slate-300 group-hover:text-blue-500 group-hover/title:text-blue-600 transition-colors" />
          <span className="w-1.5 h-3.5 bg-blue-600 rounded-full inline-block" />
          <h5 className="text-[13px] font-black text-slate-800 tracking-tight">{title || preset.defaultTitle}</h5>
          {cardIndex !== undefined && (
            <span className="text-[10px] text-slate-400 font-mono font-bold bg-slate-100 px-1.5 py-0.2 rounded">
              #{cardIndex + 1}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          {onDelete && (
            <button
              onClick={(e) => { e.stopPropagation(); onDelete(); }}
              className="p-1 hover:bg-slate-100 rounded text-slate-400 hover:text-red-500 transition-colors cursor-pointer"
              title="删除此模块"
            >
              <Trash2 size={13} />
            </button>
          )}
        </div>
      </div>
      <div className="h-[280px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ top: 5, right: 25, left: 15, bottom: 5 }}>
            <CartesianGrid horizontal={false} stroke="#e2e8f0" strokeDasharray="3 3" />
            <XAxis
              type="number"
              fontSize={10}
              tickLine={false}
              axisLine={{ stroke: '#cbd5e1' }}
              tick={{ fill: '#64748b' }}
              ticks={ticks}
              domain={[0, maxVal]}
            />
            <YAxis
              dataKey="name"
              type="category"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              tick={{ fill: '#334155', fontWeight: 500 }}
              width={80}
            />
            <RechartsTooltip
              cursor={{ fill: '#f1f5f9' }}
              contentStyle={{
                borderRadius: '8px',
                border: '1px solid #e2e8f0',
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                fontSize: '11px',
                padding: '6px 10px',
              }}
              formatter={(value: any) => [`${value} ${unit}`, title || preset.defaultTitle]}
            />
            <Bar dataKey="count" fill="#2563eb" radius={[0, 2, 2, 0]} barSize={10} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default function App() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
  const [activePage, setActivePage] = useState<Page>('home');
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [researchSubTab, setResearchSubTab] = useState<'results' | 'overview' | 'analysis' | 'insight'>('results');
  const [isInsightSubscriptionModalOpen, setIsInsightSubscriptionModalOpen] = useState(false);
  const [isSelectSchemeModalOpen, setIsSelectSchemeModalOpen] = useState(false);
  const [schemeToReplaceSlot, setSchemeToReplaceSlot] = useState<string | null>(null);
  const [schemeSourceTab, setSchemeSourceTab] = useState<'favorites' | 'history' | 'custom'>('favorites');
  const [selectedInsightScheme, setSelectedInsightScheme] = useState<string>('main');
  const [insightSubFreq, setInsightSubFreq] = useState<'weekly' | 'monthly' | 'realtime'>('weekly');
  const [insightAutoEnroll, setInsightAutoEnroll] = useState(true);

  // 业务数据统计卡片配置 state（支持无限添加卡片）
  const [bizStatCards, setBizStatCards] = useState<BizStatCard[]>([
    { id: 'card-1', contentType: '自定义', title: '就诊科室分布', metricId: 'dept' },
    { id: 'card-2', contentType: '自定义', title: '用药top10', metricId: 'meds' },
    { id: 'card-3', contentType: '自定义', title: '检查top10', metricId: 'exam' },
    { id: 'card-4', contentType: '自定义', title: '检验top10', metricId: 'lab' },
    { id: 'card-5', contentType: '自定义', title: '诊断top10', metricId: 'diag' },
    { id: 'card-6', contentType: '自定义', title: '就诊科室分布', metricId: 'dept' },
  ]);
  const [isAddModuleModalOpen, setIsAddModuleModalOpen] = useState(false);
  const [newModuleContentType, setNewModuleContentType] = useState<'常用指标' | '自定义指标'>('常用指标');
  const [newModuleMetricId, setNewModuleMetricId] = useState('surg');
  const [newModuleTitle, setNewModuleTitle] = useState('手术top10');
  const [newCustomMetricField, setNewCustomMetricField] = useState('检验报告/就诊类型');
  const [newCustomStatType, setNewCustomStatType] = useState('按频次统计 (人次)');
  const [newCustomStatRange, setNewCustomStatRange] = useState('全部数据');

  const [draggedCardIndex, setDraggedCardIndex] = useState<number | null>(null);
  const [dragOverCardIndex, setDragOverCardIndex] = useState<number | null>(null);

  const handleReorderCards = (fromIndex: number, toIndex: number) => {
    if (fromIndex === toIndex || fromIndex < 0 || toIndex < 0 || fromIndex >= bizStatCards.length || toIndex >= bizStatCards.length) return;
    const updated = [...bizStatCards];
    const [moved] = updated.splice(fromIndex, 1);
    updated.splice(toIndex, 0, moved);
    setBizStatCards(updated);
    setToastMessage(`已将「${moved.title}」排位调整至第 ${toIndex + 1} 位`);
  };

  const [insightSchemes, setInsightSchemes] = useState([
    {
      id: 'main',
      name: '课题主纳排 (基准方案)',
      source: '当前构建方案',
      patients: 875,
      records: 904,
      conditions: [
        '诊断：食管癌 C15.9 (精准匹配)',
        '包含：手术切除记录 + 术后随访>6个月',
        '排除：合并第二原发恶性肿瘤'
      ],
      tagColor: 'blue'
    },
    {
      id: 'compare1',
      name: '对比纳排 1 (放宽时间窗)',
      source: '来自于【检索收藏】: 2026-07-15 严选库',
      patients: 1717,
      records: 1855,
      conditions: [
        '诊断：食管癌全类型包含',
        '包含：含新辅助化疗/放疗病例',
        '排除：仅排除未进行任何治疗者'
      ],
      tagColor: 'emerald'
    },
    {
      id: 'compare2',
      name: '对比纳排 2 (全宽泛队列)',
      source: '来自于【检索历史】: 2026-08-01 探针次',
      patients: 2794,
      records: 3228,
      conditions: [
        '诊断：包含疑似及门诊临床诊断',
        '包含：任意治疗阶段病例',
        '无严格排除条件'
      ],
      tagColor: 'amber'
    }
  ]);
  const [resultsGroupTab, setResultsGroupTab] = useState<'case' | 'control'>('case');
  const [searchGroupMode, setSearchGroupMode] = useState<'case' | 'control'>('case');
  const [expandedFilters, setExpandedFilters] = useState<string[]>(['诊断名称']);
  const [selectedFavoriteItem, setSelectedFavoriteItem] = useState<any>(null);
  const [favoriteTab, setFavoriteTab] = useState<'list' | 'venn' | 'insight'>('list');
  const [selectedFavoriteProjectsForInsight, setSelectedFavoriteProjectsForInsight] = useState<string[]>(['1', '2', '3']);
  const [isObservedMetricsModalOpen, setIsObservedMetricsModalOpen] = useState(false);
  const [activeLibraryCategory, setActiveLibraryCategory] = useState('费用记录');
  const [selectedMetricCategory, setSelectedMetricCategory] = useState('费用记录');
  const [selectedMetricIds, setSelectedMetricIds] = useState<string[]>([
    'fy_1', 'fy_2', 'bl_1', 'jy_wes', 'sf_1', 'jy_1', 'jy_2'
  ]);
  const [tempSelectedMetricIds, setTempSelectedMetricIds] = useState<string[]>([]);
  const [librarySearchQuery, setLibrarySearchQuery] = useState('');
  const [fieldSearchQuery, setFieldSearchQuery] = useState('');
  const [selectedQualityDimensions, setSelectedQualityDimensions] = useState<string[]>([
    'completeness', 'continuity', 'bias', 'endpoint', 'standardization'
  ]);
  const [customMetricsList, setCustomMetricsList] = useState<{ id: string; name: string; category: string }[]>([]);
  const [customMetricInput, setCustomMetricInput] = useState('');
  const [isAddingCustomMetric, setIsAddingCustomMetric] = useState(false);
  const [selectedApprovalApplication, setSelectedApprovalApplication] = useState<{ id: number, name: string } | null>(null);
  const [approvalView, setApprovalView] = useState<'dashboard' | 'applications' | 'approvals'>('dashboard');
  const [approvalTab, setApprovalTab] = useState<'permission' | 'export'>('permission');
  const [isAddToProjectModalOpen, setIsAddToProjectModalOpen] = useState(false);
  const [isAddToProjectBannerVisible, setIsAddToProjectBannerVisible] = useState(true);
  const [selectedProjectsForAdd, setSelectedProjectsForAdd] = useState<string[]>([]);
  const [addToProjectSearchQuery, setAddToProjectSearchQuery] = useState('');
  const [admissionConfig, setAdmissionConfig] = useState({
    method: 'all', // 'all', 'random'
    randomType: 'block', // 'simple', 'block', 'stratified'
    sampleSize: 100,
    enableGrouping: false,
    groupA: '干预组',
    groupB: '对照组',
    ratio: '1:1',
    blockSize: 4,
    stratifyBy: '年龄段'
  });
  const [favoritePatients, setFavoritePatients] = useState([
    { id: "1", enc: "82208799", slip: "0000841233", name: "智*", age: "20", val1: "0.73", val2: "332", failure: "否", time: "2024/1/14", source: "手动入组", date: "2026", status: "待审核", group: "实验组" },
    { id: "2", enc: "82208800", slip: "0000841234", name: "靖*", age: "21", val1: "0.74", val2: "333", failure: "否", time: "2024/1/15", source: "手动入组", date: "2026", status: "已入组", group: "实验组" },
    { id: "3", enc: "82208813", slip: "0000841247", name: "卓*", age: "34", val1: "0.87", val2: "346", failure: "否", time: "2024/1/28", source: "手动入组", date: "2025", status: "待审核", group: "实验组" },
    { id: "4", enc: "82208814", slip: "0000841248", name: "雷*", age: "35", val1: "0.88", val2: "347", failure: "否", time: "2024/1/29", source: "手动入组", date: "2025", status: "待审核", group: "实验组" },
    { id: "5", enc: "82208815", slip: "0000841249", name: "闻*", age: "36", val1: "0.89", val2: "348", failure: "否", time: "2024/1/30", source: "手动入组", date: "2025", status: "待审核", group: "实验组" },
    { id: "6", enc: "82208816", slip: "0000841250", name: "秋*", age: "37", val1: "0.9", val2: "349", failure: "否", time: "2024/1/31", source: "系统识别", date: "2025", status: "已入组", group: "实验组" },
    { id: "7", enc: "82208817", slip: "0000841251", name: "丝*", age: "38", val1: "0.91", val2: "350", failure: "否", time: "2024/2/1", source: "系统识别", date: "2025", status: "已入组", group: "对位组" },
    { id: "8", enc: "82208818", slip: "0000841252", name: "玲*", age: "39", val1: "0.92", val2: "351", failure: "否", time: "2024/2/2", source: "系统识别", date: "2025", status: "待审核", group: "对位组" },
    { id: "9", enc: "82208819", slip: "0000841253", name: "苏**", age: "40", val1: "0.93", val2: "352", failure: "否", time: "2024/2/3", source: "系统识别", date: "2025", status: "已入组", group: "对位组" },
    { id: "10", enc: "82208820", slip: "0000841254", name: "林**", age: "41", val1: "0.94", val2: "353", failure: "否", time: "2024/2/4", source: "系统识别", date: "2025", status: "已入组", group: "对位组" },
    { id: "11", enc: "82208821", slip: "0000841255", name: "江**", age: "42", val1: "0.95", val2: "354", failure: "否", time: "2024/2/5", source: "系统识别", date: "2025", status: "已入组", group: "观察组" },
    { id: "12", enc: "82208822", slip: "0000841256", name: "沈**", age: "43", val1: "0.96", val2: "355", failure: "否", time: "2024/2/6", source: "系统识别", date: "2025", status: "已入组", group: "观察组" },
    { id: "13", enc: "82208823", slip: "0000841257", name: "温**", age: "44", val1: "0.97", val2: "356", failure: "否", time: "2024/2/7", source: "系统识别", date: "2025", status: "已入组", group: "观察组" },
    { id: "14", enc: "82208824", slip: "0000841258", name: "陈**", age: "45", val1: "0.98", val2: "357", failure: "否", time: "2024/2/8", source: "系统识别", date: "2025", status: "待审核", group: "观察组" },
  ]);
  const [patientStatusFilter, setPatientStatusFilter] = useState('已入组');
  const [selectedPatients, setSelectedPatients] = useState<string[]>([]);
  const [isTagModalOpen, setIsTagModalOpen] = useState(false);
  const [isAuditDenyModalOpen, setIsAuditDenyModalOpen] = useState(false);
  const [auditTargetId, setAuditTargetId] = useState<string | null>(null);
  const [isBatchAudit, setIsBatchAudit] = useState(false);
  const [selectedTagsInModal, setSelectedTagsInModal] = useState<string[]>([]);
  const [availableTags, setAvailableTags] = useState(['高风险', '需复查', '优先处理']);
  const [isManagingTags, setIsManagingTags] = useState(false);
  const [editingTagIndex, setEditingTagIndex] = useState<number | null>(null);
  const [editingTagValue, setEditingTagValue] = useState('');
  const [isAddingNewTag, setIsAddingNewTag] = useState(false);
  const [newTagName, setNewTagName] = useState('');
  const [isAddFavoriteModalOpen, setIsAddFavoriteModalOpen] = useState(false);
  const [selectedSubscriptionTarget, setSelectedSubscriptionTarget] = useState('【对比主视角方案】食管癌术后复发风险队列 (精简主方案)');
  const [subStatus, setSubStatus] = useState(true);
  const [subStartDate, setSubStartDate] = useState('2025-11-11');
  const [subEndDate, setSubEndDate] = useState('2025-11-30');
  const [subExecFreq, setSubExecFreq] = useState('每天');
  const [subGoalType, setSubGoalType] = useState('病历数');
  const [subGoalCount, setSubGoalCount] = useState('0');
  const [subFloatRatio, setSubFloatRatio] = useState('请选择浮动比例');
  const [subConditionTab, setSubConditionTab] = useState<'inclusion' | 'exclusion'>('inclusion');
  const [subConditionCanvasZoom, setSubConditionCanvasZoom] = useState(100);
  const [subAutoPush, setSubAutoPush] = useState(true);
  const [subFrequency, setSubFrequency] = useState('每日推送 (08:00)');
  const [subChannel, setSubChannel] = useState('站内消息 + 邮箱');
  const [subReceivers, setSubReceivers] = useState('课题组全体成员 (5人)');
  const [newFavoriteTitle, setNewFavoriteTitle] = useState('');
  const [newFavoriteIntro, setNewFavoriteIntro] = useState('');
  const [isEntryAuditEnabled, setIsEntryAuditEnabled] = useState(true);
  const [newFavoriteAuditors, setNewFavoriteAuditors] = useState<{id: string, name: string}[]>([]);
  const [isAuditorSelectorOpen, setIsAuditorSelectorOpen] = useState(false);
  const availableUsers = [
    { id: '1', name: 'test_A' },
    { id: '2', name: '张医生' },
    { id: '3', name: '李主任' },
    { id: '4', name: '王护士' },
    { id: '5', name: '系统管理员' },
  ];

  const handleToggleAuditor = (user: {id: string, name: string}) => {
    setNewFavoriteAuditors(prev => {
      const isSelected = prev.find(a => a.id === user.id);
      if (isSelected) {
        return prev.filter(a => a.id !== user.id);
      } else {
        return [...prev, user];
      }
    });
  };

  const handleRemoveAuditor = (id: string) => {
    setNewFavoriteAuditors(prev => prev.filter(a => a.id !== id));
  };
  const [newFavoriteMembers, setNewFavoriteMembers] = useState([{ id: '1', name: 'test_A', permissions: ['details', 'perspective', 'export'] }]);

  const matchesFilter = (p: typeof favoritePatients[0]) => {
    if (patientStatusFilter === '全部') return true;
    if (patientStatusFilter === '待审核') return p.status === '待审核' || p.status === '已拒绝';
    return p.status === patientStatusFilter;
  };

  const handleApplyTagsToSelected = () => {
     if (selectedTagsInModal.length === 0 || selectedPatients.length === 0) return;
     
     setFavoritePatients(prev => prev.map(p => {
        if (selectedPatients.includes(p.id)) {
           const existingTags = p.tags || [];
           const mergedTags = Array.from(new Set([...existingTags, ...selectedTagsInModal]));
           return { ...p, tags: mergedTags };
        }
        return p;
     }));
     
     setSelectedTagsInModal([]);
     setIsTagModalOpen(false);
     setSelectedPatients([]);
  };

  const handleRemoveTag = (patientId: string, tagToRemove: string) => {
     setFavoritePatients(prev => prev.map(p => {
        if (p.id === patientId && p.tags) {
           return { ...p, tags: p.tags.filter(t => t !== tagToRemove) };
        }
        return p;
     }));
  };

  const handlePatientAudit = (id: string, action: '通过' | '拒绝') => {
    if (action === '拒绝') {
      setAuditTargetId(id);
      setIsBatchAudit(false);
      setIsAuditDenyModalOpen(true);
      return;
    }

    setFavoritePatients(prev => prev.map(p => {
      if (p.id === id) {
        return { ...p, status: '已入组' };
      }
      return p;
    }));
  };

  const handleBatchPatientAudit = (action: '通过' | '拒绝') => {
    if (action === '拒绝') {
      setIsBatchAudit(true);
      setAuditTargetId(null);
      setIsAuditDenyModalOpen(true);
      return;
    }

    setFavoritePatients(prev => prev.map(p => {
      if (selectedPatients.includes(p.id)) {
        return { ...p, status: '已入组' };
      }
      return p;
    }));
    setSelectedPatients([]);
  };

  const confirmAuditDeny = () => {
    if (isBatchAudit) {
      setFavoritePatients(prev => prev.filter(p => !selectedPatients.includes(p.id)));
      setSelectedPatients([]);
    } else if (auditTargetId) {
      setFavoritePatients(prev => prev.filter(p => p.id !== auditTargetId));
    }
    setIsAuditDenyModalOpen(false);
    setAuditTargetId(null);
    setIsBatchAudit(false);
  };

  const [patientSubView, setPatientSubView] = useState<'list' | 'data-entry' | 'add-data' | 'detail'>('list');
  const [selectedDetailPatientNo, setSelectedDetailPatientNo] = useState<string>('PAT20260128003');
  const [selectedDetailVisitId, setSelectedDetailVisitId] = useState<string | null>(null);
  const [detailTab, setDetailTab] = useState<'diagnosis' | 'lab' | 'pathology' | 'crf'>('diagnosis');
  const [listDimension, setListDimension] = useState<'visit' | 'patient'>('visit');
  const [patientPageSize, setPatientPageSize] = useState(50);
  const [expandedPatientNos, setExpandedPatientNos] = useState<string[]>([]);
  const [repairFilter, setRepairFilter] = useState<'all' | 'pending' | 'processing' | 'completed'>('all');
  const [addDataStep, setAddDataStep] = useState(3);
  const [patientWorkflow, setPatientWorkflow] = useState<'data-entry' | 'create-patient'>('data-entry');
  const [searchType, setSearchType] = useState<'name' | 'id' | 'idCard'>('name');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchDropdownOpen, setIsSearchDropdownOpen] = useState(false);
  const [outDbPatientForm, setOutDbPatientForm] = useState({
    name: '',
    gender: '男',
    birthDate: '',
    idCard: '',
    phone: '',
    sourceHospital: ''
  });
  const [importPatientMode, setImportPatientMode] = useState<'in-db' | 'out-db'>('in-db');
  const [dataImportStep, setDataImportStep] = useState<'upload' | 'importing' | 'complete'>('upload');
  const [dataImportProgress, setDataImportProgress] = useState(0);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(PATIENTS[0]);
  const saveNewPatient = (continueEntry: boolean) => {
    if (!outDbPatientForm.name.trim()) {
      setToastMessage("请填写患者姓名！");
      return;
    }

    let calculatedAge = 50;
    if (outDbPatientForm.birthDate) {
      const birthYear = parseInt(outDbPatientForm.birthDate.slice(0, 4));
      if (birthYear && !isNaN(birthYear)) {
        calculatedAge = new Date().getFullYear() - birthYear;
      }
    }

    const generatedId = `OUT-${Date.now().toString().slice(-6)}`;
    const newPatient = {
      id: generatedId,
      name: outDbPatientForm.name.trim(),
      gender: outDbPatientForm.gender === '女' ? 'female' : 'male',
      age: calculatedAge,
      phone: outDbPatientForm.phone || '暂未填写',
      idCard: outDbPatientForm.idCard || '暂未填写',
      visitNo: '',
      visitType: '',
      source: outDbPatientForm.sourceHospital || '其他来源',
      patientNo: generatedId,
      isOutDb: true,
    };

    setSelectedPatient(newPatient as any);
    if (continueEntry) {
      setAddDataStep(2);
      setToastMessage(`患者档案【${newPatient.name}】已创建，请继续录入临床数据。`);
    } else {
      setPatientSubView('list');
      setAddDataStep(1);
      setToastMessage(`患者档案【${newPatient.name}】已创建，可稍后补充就诊和报告数据。`);
    }
  };
  const [reports, setReports] = useState<{ 
    id: string; 
    type: 'imaging' | 'pathology' | 'lab' | 'gene';
    data: any;
    ocrStatus?: 'idle' | 'loading' | 'completed';
    fileName?: string;
  }[]>([{ id: '1', type: 'imaging', data: {} }]);
  const [previewingReportId, setPreviewingReportId] = useState<string | null>(null);
  const [showNewEncounterForm, setShowNewEncounterForm] = useState(true);
  const [showSubscriptionSettings, setShowSubscriptionSettings] = useState(false);
  const [selectedProjectForSubscription, setSelectedProjectForSubscription] = useState<FavoriteProject | null>(null);
  const [showSearchFavoritePicker, setShowSearchFavoritePicker] = useState(false);
  const [appliedSearchFavorite, setAppliedSearchFavorite] = useState<SearchFavorite | null>(null);
  const [searchMode, setSearchMode] = useState<'quick' | 'advanced' | 'scientific' | 'ai'>('scientific');
  const [scientificSearchSubTab, setScientificSearchSubTab] = useState<'inclusion' | 'exclusion' | 'event' | 'tips'>('event');
  const [overlapEvents, setOverlapEvents] = useState([{ id: '1', sequence: 'T0 后发生', countType: '总次数', operator: '≥', count: 3, category: '检验信息/生化全套', condition: '异常偏高' }]);
  const [anchorCategory, setAnchorCategory] = useState('诊断信息/确诊时间');
  const [anchorCondition, setAnchorCondition] = useState('首次确诊');
  const [timeWindowStart, setTimeWindowStart] = useState(30);
  const [timeWindowEnd, setTimeWindowEnd] = useState(180);
  const [enableControlMatch, setEnableControlMatch] = useState(false);
  const [searchSidebarTab, setSearchSidebarTab] = useState<'history' | 'favorites' | 'help'>('favorites');
  const [isSearchSidebarOpen, setIsSearchSidebarOpen] = useState(true);

  // Result Analysis Tab (人群画像 vs 指标探索) State
  const [analysisSubTab, setAnalysisSubTab] = useState<'portrait' | 'metrics'>('portrait');
  const [analysisTimeGranularity, setAnalysisTimeGranularity] = useState<'year' | 'month'>('month');
  const [isAddMetricModalOpen, setIsAddMetricModalOpen] = useState(false);
  const [selectedMetricToAdd, setSelectedMetricToAdd] = useState('住院天数');
  const [analysisMetricItems, setAnalysisMetricItems] = useState([
    {
      id: 'm1',
      name: '数量',
      type: '连续型',
      fillRate: '100%',
      validCount: '71',
      missingCount: '0',
      meanStd: '1.34 ± 1.51',
      median: '1',
      min: '1',
      max: '10',
      chartType: 'bar',
      viewMode: 'chart',
      chartData: [
        { name: '[0, 1)', value: 3 },
        { name: '[1, 2)', value: 65 },
        { name: '[2, 3)', value: 1 },
        { name: '[3, 4)', value: 0 },
        { name: '[4, 5)', value: 0 },
        { name: '[5, 6)', value: 2 },
        { name: '[6, 7)', value: 0 },
        { name: '[7, 8)', value: 3 },
        { name: '[8, 9)', value: 0 },
        { name: '[9, 10]', value: 2 }
      ]
    },
    {
      id: 'm2',
      name: '用药天数',
      type: '连续型',
      fillRate: '100%',
      validCount: '1060084',
      missingCount: '0',
      meanStd: '28.5 ± 14.2',
      median: '30',
      min: '1',
      max: '365',
      chartType: 'bar',
      viewMode: 'chart',
      chartData: [
        { name: '[0, 7]', value: 180000 },
        { name: '[8, 14]', value: 210000 },
        { name: '[15, 30]', value: 220000 },
        { name: '[31, 60]', value: 215000 },
        { name: '[61, 90]', value: 200000 },
        { name: '[91, 180]', value: 35000 }
      ]
    }
  ]);

  // Search History & Favorites state
  const [historySearchKeyword, setHistorySearchKeyword] = useState('');
  const [favoriteSearchKeyword, setFavoriteSearchKeyword] = useState('');
  const [selectedHistoryCompareIds, setSelectedHistoryCompareIds] = useState<string[]>([]);
  const [selectedFavoriteCompareIds, setSelectedFavoriteCompareIds] = useState<string[]>([]);
  const [editingFavoriteId, setEditingFavoriteId] = useState<string | null>(null);
  const [editingFavoriteTitle, setEditingFavoriteTitle] = useState<string>('');

  const [searchHistoryList, setSearchHistoryList] = useState([
    {
      id: 'hist_1',
      conditions: [
        '纳入条件1: 院区:全院; 就诊类型:;',
        '纳入条件2: 同一次就诊; 就诊记录/患者ID 包含 V0002393...'
      ],
      recordCount: 43,
      patientCount: 1,
      timestamp: '2026-08-04 16:04:55',
      isStarred: false,
      title: '患者ID单病例精确检索'
    },
    {
      id: 'hist_2',
      conditions: [
        '纳入条件1: 院区:东院区; 就诊类型:门诊;',
        '纳入条件2: 诊断信息/原始诊断名称 包含 肝炎/肝硬化'
      ],
      recordCount: 391620,
      patientCount: 12707,
      timestamp: '2026-08-04 14:22:10',
      isStarred: true,
      title: '肝炎门诊宽泛检索队列'
    },
    {
      id: 'hist_3',
      conditions: [
        '纳入条件1: 院区:全院; 就诊类型:住院;',
        '纳入条件2: 同一次就诊; 诊断信息 包含 食管癌 C15.9'
      ],
      recordCount: 1855,
      patientCount: 1717,
      timestamp: '2026-08-03 18:30:12',
      isStarred: false,
      title: '食管癌精准住院队列'
    },
    {
      id: 'hist_4',
      conditions: [
        '纳入条件1: 院区:全院; 就诊类型:全部;',
        '纳入条件2: 同一次就诊; 生化/乳酸 不为空 & 首次就诊'
      ],
      recordCount: 2480,
      patientCount: 2240,
      timestamp: '2026-08-02 11:15:00',
      isStarred: false,
      title: '乳酸指标全队列'
    }
  ]);

  const [searchFavoritesList, setSearchFavoritesList] = useState([
    {
      id: 'fav_1',
      title: '导出测试',
      conditions: [
        '纳入条件1: 院区:东院区; 就诊类型:全部;',
        '纳入条件2: 同一次就诊; 就诊记录/患者ID 包含 V0002393...'
      ],
      recordCount: 0,
      patientCount: 0,
      timestamp: '2026-07-14 14:20:16',
      creator: 'test_A'
    },
    {
      id: 'fav_2',
      title: '1',
      conditions: [
        '纳入条件1: 院区:全院; 就诊类型:门诊/住院;',
        '纳入条件2: 诊断信息 包含 肝功能异常/乙肝'
      ],
      recordCount: 391533,
      patientCount: 12914,
      timestamp: '2026-07-12 10:15:40',
      creator: 'test_A'
    },
    {
      id: 'fav_3',
      title: '1111',
      conditions: [
        '纳入条件1: 院区:东院区; 就诊类型:住院;',
        '纳入条件2: 同一次就诊; 手术名称 包含 食管癌切除术'
      ],
      recordCount: 875,
      patientCount: 904,
      timestamp: '2026-06-28 09:30:22',
      creator: 'test_A'
    },
    {
      id: 'fav_4',
      title: '食管癌免疫治疗受试队列',
      conditions: [
        '纳入条件1: 院区:全院; 就诊类型:全部;',
        '纳入条件2: 包含 PD-1/PD-L1 使用记录 & 随访>3个月'
      ],
      recordCount: 485,
      patientCount: 420,
      timestamp: '2026-06-18 16:45:00',
      creator: 'test_A'
    }
  ]);
  const [quickCampus, setQuickCampus] = useState('东院区');
  const [quickVisitType, setQuickVisitType] = useState('全部');
  const [quickDepartment, setQuickDepartment] = useState('就诊科室');
  const [quickStartDate, setQuickStartDate] = useState('');
  const [quickEndDate, setQuickEndDate] = useState('');
  const [quickQueryText, setQuickQueryText] = useState('');
  const [quickSearchType, setQuickSearchType] = useState<'fuzzy' | 'exact'>('fuzzy');
  const [quickSearchTypeDropdownOpen, setQuickSearchTypeDropdownOpen] = useState(false);
  const [activeQuickDropdown, setActiveQuickDropdown] = useState<string | null>(null);
  const [showAdvancedSection, setShowAdvancedSection] = useState(false);

  const toggleQuickDropdown = (name: string) => {
    setActiveQuickDropdown(activeQuickDropdown === name ? null : name);
  };

  // Advanced Search state variables
  const [advancedCampus, setAdvancedCampus] = useState('东院区');
  const [advancedVisitType, setAdvancedVisitType] = useState('全部');
  const [advancedDepartment, setAdvancedDepartment] = useState('就诊科室');
  const [advancedStartDate, setAdvancedStartDate] = useState('');
  const [advancedEndDate, setAdvancedEndDate] = useState('');
  const [activeAdvancedDropdown, setActiveAdvancedDropdown] = useState<{ rowIndex: number, field: string } | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  interface AdvancedCondition {
    id: string;
    logic: string; // '同一次就诊' | '同一个患者' for row 0, or '与 (and)' | '或 (or)' | '非 (not)' for rest
    field: string; // e.g., '就诊记录/就诊科室'
    operator: string; // e.g., '包含'
    value1: string; // text, date or number
    value2: string; // used for range '介于'
  }

  const [advancedConditions, setAdvancedConditions] = useState<AdvancedCondition[]>([
    {
      id: 'cond_1',
      logic: '同一次就诊',
      field: '就诊记录/就诊科室',
      operator: '包含',
      value1: '',
      value2: ''
    },
    {
      id: 'cond_2',
      logic: '与 (and)',
      field: '就诊记录/就诊时间',
      operator: '介于',
      value1: '',
      value2: ''
    },
    {
      id: 'cond_3',
      logic: '与 (and)',
      field: '就诊记录/年龄(天)',
      operator: '介于',
      value1: '',
      value2: ''
    }
  ]);

  const addAdvancedCondition = (index: number) => {
    const newCondition: AdvancedCondition = {
      id: 'cond_' + Date.now() + Math.random().toString(36).substr(2, 5),
      logic: '与 (and)',
      field: '就诊记录/就诊科室',
      operator: '包含',
      value1: '',
      value2: ''
    };
    const updated = [...advancedConditions];
    updated.splice(index + 1, 0, newCondition);
    setAdvancedConditions(updated);
  };

  const removeAdvancedCondition = (index: number) => {
    if (advancedConditions.length <= 1) return;
    const updated = advancedConditions.filter((_, idx) => idx !== index);
    if (index === 0 && updated.length > 0) {
      updated[0].logic = '同一次就诊';
    }
    setAdvancedConditions(updated);
  };

  const clearAdvancedConditions = () => {
    setAdvancedConditions([
      {
        id: 'cond_' + Date.now(),
        logic: '同一次就诊',
        field: '就诊记录/就诊科室',
        operator: '包含',
        value1: '',
        value2: ''
      }
    ]);
  };

  const [records, setRecords] = useState<DataEntryRecord[]>(DATA_ENTRY_RECORDS);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [isOutcomeModalOpen, setIsOutcomeModalOpen] = useState(false);
  const [outcomeStep, setOutcomeStep] = useState<'list' | 'setup'>('list');
  const [outcomePatient, setOutcomePatient] = useState<any>(null);
  const [selectedDataEntryForm, setSelectedDataEntryForm] = useState<any>({ id: 'std_imaging', name: '检查报告', type: 'standard' });
  const [isFormConfigModalOpen, setIsFormConfigModalOpen] = useState(false);
  const [isCreateFormModalOpen, setIsCreateFormModalOpen] = useState(false);
  const [isEditFormModalOpen, setIsEditFormModalOpen] = useState(false);
  const [editingForm, setEditingForm] = useState<any>(null);
  const [newFormName, setNewFormName] = useState('');
  const [newFormFolderId, setNewFormFolderId] = useState('unmounted');
  const [isAddFormDropdownOpen, setIsAddFormDropdownOpen] = useState(false);
  const [availableFormsToAdd] = useState([
    { id: 'a1', name: '血常规', folderId: 'folder1' },
    { id: 'a2', name: '尿常规', folderId: 'folder1' },
    { id: 'a3', name: 'CT报告', folderId: 'folder2' },
    { id: 'a4', name: 'MRI报告', folderId: 'folder2' },
    { id: 'a5', name: '随访问卷', folderId: 'unmounted' },
  ]);
  const [isPatientMode, setIsPatientMode] = useState(false);
  const [isFromFavorites, setIsFromFavorites] = useState(false);
  const [projectForms, setProjectForms] = useState([
    { 
      id: 'f2', 
      name: '检验报告录入', 
      permission: '本库', 
      configurator: '张三', 
      configTime: '2026-03-30 14:18',
      enabled: true, 
      verifyLevel: 'high', 
      qrValue: window.location.origin + '?mode=patient&form=f2', 
      usage: [],
      folderId: 'folder1',
      expiryDate: '2026-05-03'
    },
    { 
      id: 'f3', 
      name: '影像学评估', 
      permission: '个人', 
      configurator: '李四', 
      configTime: '2026-03-31 09:30',
      enabled: false, 
      verifyLevel: 'high', 
      qrValue: window.location.origin + '?mode=patient&form=f3', 
      usage: [],
      folderId: 'folder2',
      expiryDate: '2026-04-10'
    },
    { 
      id: 'f4', 
      name: '简易问卷', 
      permission: '全院', 
      configurator: '系统', 
      configTime: '2026-04-01 10:00',
      enabled: true, 
      verifyLevel: 'medium', 
      qrValue: window.location.origin + '?mode=patient&form=f4', 
      usage: [],
      folderId: 'unmounted',
      expiryDate: '2027-04-03'
    },
    { 
      id: 'f5', 
      name: '外显子基因报告', 
      permission: '全院', 
      configurator: '系统', 
      configTime: '2026-04-01 10:05',
      enabled: true, 
      verifyLevel: 'high', 
      qrValue: window.location.origin + '?mode=patient&form=f5', 
      usage: [],
      folderId: 'unmounted',
      expiryDate: '2026-05-03'
    }
  ]);
  const [selectedFormForQr, setSelectedFormForQr] = useState<any>(null);
  const [folders, setFolders] = useState([
    { id: 'folder1', name: '检验报告' },
    { id: 'folder2', name: '影像报告' }
  ]);
  const [lastUpdateAttempt, setLastUpdateAttempt] = useState('2025-11-11 14:52:22');
  const [showUpdateToast, setShowUpdateToast] = useState(false);
  const [activeFolderId, setActiveFolderId] = useState('all');
  const [isAddingFolder, setIsAddingFolder] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [editingFolderId, setEditingFolderId] = useState<string | null>(null);
  const [editFolderName, setEditFolderName] = useState('');
  const [editingFormNameId, setEditingFormNameId] = useState<string | null>(null);
  const [editFormNameValue, setEditFormNameValue] = useState('');
  const [isUpdatingData, setIsUpdatingData] = useState(false);
  const [selectedMetricForViz, setSelectedMetricForViz] = useState<{name: string, type: string} | null>(null);
  const [movingFormId, setMovingFormId] = useState<string | null>(null);

  const handleManualUpdate = () => {
    setIsUpdatingData(true);
    setShowUpdateToast(true);
    
    // Simulate updating process toast duration
    setTimeout(() => {
      setShowUpdateToast(false);
    }, 6000);

    // Simulate completion after a delay
    setTimeout(() => {
      setIsUpdatingData(false);
      const now = new Date();
      setLastUpdateAttempt(`${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`);
    }, 8000); 
  };

  const [showVisitDrawer, setShowVisitDrawer] = useState(true);
  const [showEtlModal, setShowEtlModal] = useState(false);
  const [showFormConfigModal, setShowFormConfigModal] = useState(false);
  const [showDataImportModal, setShowDataImportModal] = useState(false);
  const [showPatientSelfEntryModal, setShowPatientSelfEntryModal] = useState(false);
  const [showPatientOutcomeModal, setShowPatientOutcomeModal] = useState(false);

  const [etlReportType, setEtlReportType] = useState<'check' | 'test'>('check');
  const [etlGridRows, setEtlGridRows] = useState([
    { id: '1', patNo: '62010', recNo: 'REC-001', date: '', f1: '', f2: '', f3: '', f4: '', f5: '' },
    { id: '2', patNo: '62010', recNo: 'REC-001', date: '', f1: '', f2: '', f3: '', f4: '', f5: '' },
    { id: '3', patNo: '62011', recNo: 'REC-001', date: '', f1: '', f2: '', f3: '', f4: '', f5: '' },
    { id: '4', patNo: '62011', recNo: 'REC-001', date: '', f1: '', f2: '', f3: '', f4: '', f5: '' },
    { id: '5', patNo: '', recNo: '', date: '', f1: '', f2: '', f3: '', f4: '', f5: '' },
    { id: '6', patNo: '', recNo: '', date: '', f1: '', f2: '', f3: '', f4: '', f5: '' },
    { id: '7', patNo: '', recNo: '', date: '', f1: '', f2: '', f3: '', f4: '', f5: '' },
    { id: '8', patNo: '', recNo: '', date: '', f1: '', f2: '', f3: '', f4: '', f5: '' },
  ]);
  const hasPendingCleaningData = etlGridRows.some(row => row.patNo || row.recNo);

  const [crfFormConfigs, setCrfFormConfigs] = useState([
    { id: '1', name: '简易问卷', category: '未分类 (不挂载)', selfEntry: true, expireDate: '2027-04-03' },
    { id: '2', name: '外显子基因报告', category: '未分类 (不挂载)', selfEntry: false, expireDate: '2026-05-03' },
    { id: '3', name: '检验报告录入', category: '检验报告', selfEntry: true, expireDate: '2026-05-03' },
    { id: '4', name: '影像学评估', category: '影像报告', selfEntry: false, expireDate: '2026-04-10' },
  ]);

  const [selectedEtlItem, setSelectedEtlItem] = useState<any>(null);
  const [formToDelete, setFormToDelete] = useState<any>(null);
  const [patientTargetFormId, setPatientTargetFormId] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const [isBuilderUsageModalOpen, setIsBuilderUsageModalOpen] = useState(false);
  const [isAiFormModalOpen, setIsAiFormModalOpen] = useState(false);
  const [isStandardDataSetModalOpen, setIsStandardDataSetModalOpen] = useState(false);
  const [aiFormPrompt, setAiFormPrompt] = useState('');
  const [aiFormStatus, setAiFormStatus] = useState<'idle' | 'generating' | 'done'>('idle');
  const [aiFormResultTab, setAiFormResultTab] = useState<'plan' | 'preview'>('plan');
  const [builderUsage, setBuilderUsage] = useState<string[]>(['data-center']);
  const [builderFolderId, setBuilderFolderId] = useState<string>('unmounted');
  const [builderFormName, setBuilderFormName] = useState('测试表单');
  const [builderFormScenario, setBuilderFormScenario] = useState('通用数据补录');
  const [addFormSearchQuery, setAddFormSearchQuery] = useState('');

  // Handle URL parameters for patient mode
  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('mode') === 'patient') {
      setIsPatientMode(true);
      const formId = params.get('form');
      if (formId) setPatientTargetFormId(formId);
    }
  }, []);

  const addReport = () => {
    setReports(prev => [...prev, { id: Date.now().toString(), type: 'imaging', data: {} }]);
  };

  const removeReport = (id: string) => {
    if (reports.length > 1) {
      setReports(prev => prev.filter(r => r.id !== id));
    }
  };

  const updateReportType = (id: string, type: 'imaging' | 'pathology' | 'lab' | 'gene') => {
    setReports(prev => prev.map(r => r.id === id ? { ...r, type, data: {} } : r));
  };

  const handleOcr = (id: string) => {
    setReports(prev => prev.map(r => r.id === id ? { ...r, ocrStatus: 'loading', fileName: '外显子基因检测报告_张三.docx' } : r));
    
    // Simulate OCR
    setTimeout(() => {
      setReports(prev => prev.map(r => {
        if (r.id === id) {
          return {
            ...r,
            ocrStatus: 'completed',
            data: {
              reportNo: 'GENE20240328001',
              reportDate: '2024-03-28',
              sampleType: '全血',
              testProject: '全外显子组测序 (WES)',
              clinicalPhenotype: '智力发育迟缓，面容特殊',
              captureReagent: 'Agilent SureSelect V8',
              platform: 'Illumina NovaSeq 6000',
              testScope: '全外显子组',
              sourceDataCode: 'SDC-99281',
              reportVersion: 'V2.1',
              geneName: 'G6PD',
              mutation: 'c.1376G>T (p.Arg459Leu)',
              significance: '致病',
              dbSnp: 'rs137852348',
              mutationRatio: '48.5%',
              alfaFreq: '0.00002',
              chineseFreq: '0.00015',
              vcfRef: 'G',
              vcfAlt: 'T',
              physicalPosition: 'chrX:154535342',
              clinvarDisease: '蚕豆病 (G6PD 缺乏症)',
              inheritance: 'X 连锁不完全显性遗传',
              geneFunction: 'G6PD 基因编码葡萄糖-6-磷酸脱氢酶，是磷酸戊糖途径的关键限速酶。该酶在维持细胞内还原型辅酶 II (NADPH) 水平及保护细胞免受氧化损伤中起重要作用。',
              acmgInterpretation: '该变异 c.1376G>T 导致第 459 位氨基酸由精氨酸变为亮氨酸。根据 ACMG 指南：1. PS1 (相同氨基酸改变已报道为致病)；2. PM2 (人群数据库中极低频率)；3. PP3 (多种生物信息学软件预测有害)。综合评定为致病变异。',
              recommendations: '1. 建议结合临床表现进行家系验证；2. 避免食用蚕豆及接触氧化性药物；3. 建议进行遗传咨询。'
            }
          };
        }
        return r;
      }));
    }, 2000);
  };
  const updateReportData = (id: string, field: string, value: any) => {
    setReports(prev => prev.map(r => r.id === id ? { ...r, data: { ...r.data, [field]: value } } : r));
  };

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [needsEncounter, setNeedsEncounter] = useState(false);
  const [selectedEncounterId, setSelectedEncounterId] = useState<string | null>(null);

  if (isPatientMode) {
    const targetForm = patientTargetFormId ? projectForms.find(f => f.id === patientTargetFormId) : undefined;
    
    return <PatientSelfFillForm 
      targetForm={targetForm}
      onBack={() => {
        setIsPatientMode(false);
        setPatientTargetFormId(null);
        // Clear URL params without reload
        window.history.replaceState({}, '', window.location.pathname);
      }} 
      onComplete={(newRecords) => {
        setRecords(prev => [...newRecords, ...prev]);
        setIsPatientMode(false);
        setPatientTargetFormId(null);
        window.history.replaceState({}, '', window.location.pathname);
      }} 
    />;
  }

  return (
    <div className="flex h-screen bg-[#f0f5fb] font-sans text-slate-900 overflow-hidden">
      {/* Sidebar */}
      <aside className={`${isSidebarCollapsed ? 'w-[72px]' : 'w-[210px]'} bg-[#1c263d] flex flex-col flex-shrink-0 z-50 transition-all duration-300 relative`}>
        <div className={`p-6 mb-4 flex items-center ${isSidebarCollapsed ? 'justify-center px-0' : 'gap-2'}`}>
          <div className="w-8 h-8 flex-shrink-0 bg-blue-500 rounded-lg flex items-center justify-center">
            <Database size={18} className="text-white" />
          </div>
          {!isSidebarCollapsed && <span className="text-white font-bold text-lg tracking-tight whitespace-nowrap overflow-hidden">肝病</span>}
        </div>
        
        <nav className="flex-1 overflow-y-auto no-scrollbar pb-6 relative">
          <SidebarItem 
            icon={Home} 
            label="首页" 
            active={activePage === 'home'} 
            isCollapsed={isSidebarCollapsed}
            onClick={() => setActivePage('home')} 
          />
          <SidebarItem 
            icon={Search} 
            label="数据检索" 
            active={activePage === 'search'} 
            isCollapsed={isSidebarCollapsed}
            onClick={() => setActivePage('search')} 
          />
          <SidebarItem 
            icon={Star} 
            label="患者收藏" 
            active={activePage === 'favorites'} 
            isCollapsed={isSidebarCollapsed}
            onClick={() => setActivePage('favorites')} 
          />
          <SidebarItem 
            icon={FolderOpen} 
            label="项目管理" 
            active={activePage === 'project'} 
            isCollapsed={isSidebarCollapsed}
            onClick={() => setActivePage('project')} 
          />
          <SidebarItem 
            icon={Cloud} 
            label="个人云盘" 
            active={activePage === 'cloud'} 
            isCollapsed={isSidebarCollapsed}
            onClick={() => setActivePage('cloud')} 
          />

          <SidebarItem 
            icon={BarChart3} 
            label="数据中心" 
            active={activePage === 'data-center'} 
            isCollapsed={isSidebarCollapsed}
            onClick={() => setActivePage('data-center')} 
          />
          <SidebarItem 
            icon={ClipboardList} 
            label="表单中心" 
            active={activePage === 'form-center'} 
            isCollapsed={isSidebarCollapsed}
            onClick={() => setActivePage('form-center')} 
          />
          <SidebarItem 
            icon={Shield} 
            label="审批中心" 
            active={activePage === 'approval-center'} 
            isCollapsed={isSidebarCollapsed}
            onClick={() => setActivePage('approval-center')} 
          />
        </nav>
        
        <div className="absolute right-0 translate-x-1/2 bottom-8 z-50">
          <button 
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="w-7 h-7 bg-[#dde4f0] border border-slate-200 rounded-full flex items-center justify-center text-slate-500 shadow-sm hover:bg-white hover:text-slate-700 transition-colors"
          >
            {isSidebarCollapsed ? <ChevronsRight size={14} /> : <ChevronsLeft size={14} />}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 relative overflow-hidden flex flex-col">
        <AnimatePresence mode="wait">
          {activePage === 'home' && (
            <motion.div 
              key="home"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex-1 flex flex-col items-center justify-center bg-white p-20 relative overflow-hidden"
            >
              {/* Background Decoration */}
              <div className="absolute -top-40 -right-20 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-blue-500/10 to-transparent blur-3xl pointer-events-none" />
              
              <div className="z-10 text-center flex flex-col items-center max-w-4xl">
                <motion.h1 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 }}
                  className="text-5xl font-extrabold text-slate-800 mb-6 tracking-tight"
                >
                  一站式智慧科研数据检索与分析平台
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-slate-500 text-lg max-w-2xl mb-12 leading-relaxed"
                >
                  基于院内真实病历数据，提供数据检索、课题管理、以及统计分析、机器学习等功能，助力科研成果产出。
                </motion.p>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex gap-6 mb-24"
                >
                  <button 
                    onClick={() => setActivePage('data-center')}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-full font-bold shadow-xl shadow-blue-200 transition-all flex items-center gap-2 group"
                  >
                    科研数据库 <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button className="bg-sky-500 hover:bg-sky-600 text-white px-10 py-4 rounded-full font-bold shadow-xl shadow-sky-100 transition-all flex items-center gap-2">
                    数据检索 <ChevronRight size={18} />
                  </button>
                  <button className="bg-slate-400 hover:bg-slate-500 text-white px-10 py-4 rounded-full font-bold shadow-xl shadow-slate-100 transition-all flex items-center gap-2">
                    使用指引 <ChevronRight size={18} />
                  </button>
                </motion.div>

                <div className="grid grid-cols-2 gap-10 w-full">
                  {/* Data Overview Card */}
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm text-left"
                  >
                    <div className="flex justify-between items-center mb-8">
                      <h3 className="font-bold text-slate-700 flex items-center gap-2">
                        <BarChart3 size={18} className="text-blue-500" />
                        数据概览
                      </h3>
                      <div className="bg-slate-100 p-1 rounded-lg flex text-[10px] font-bold">
                        <span className="bg-white px-3 py-1 rounded-md shadow-sm text-blue-600">年</span>
                        <span className="px-3 py-1 text-slate-400">月</span>
                      </div>
                    </div>
                    <div className="h-32 flex items-end gap-3 pb-2">
                      {[0.7, 0.85, 0.55, 0.4, 0.9, 0.65].map((h, i) => (
                        <motion.div 
                          key={i}
                          initial={{ height: 0 }}
                          animate={{ height: `${h * 100}%` }}
                          transition={{ delay: 0.5 + i * 0.05 }}
                          className={`w-full rounded-t-md ${i < 2 ? 'bg-orange-200' : 'bg-blue-500'}`}
                        />
                      ))}
                    </div>
                  </motion.div>

                  {/* Databases Card */}
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm text-left"
                  >
                    <h3 className="font-bold text-slate-700 mb-8 flex items-center gap-2">
                      <Database size={18} className="text-blue-500" />
                      热门科研库
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {[
                        { label: '急性胆囊炎', color: 'bg-rose-50 text-rose-500' },
                        { label: '心血管专病', color: 'bg-blue-50 text-blue-500' },
                        { label: '慢性肾病', color: 'bg-emerald-50 text-emerald-500' },
                        { label: '呼吸系统', color: 'bg-amber-50 text-amber-500' },
                        { label: '急性阑尾炎', color: 'bg-purple-50 text-purple-500' },
                        { label: '体格检查', color: 'bg-sky-50 text-sky-500' },
                      ].map((tag, i) => (
                        <span key={i} className={`${tag.color} px-4 py-2 rounded-full text-xs font-bold tracking-tight`}>
                          {tag.label}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}

          {activePage === 'search' && (
            <motion.div 
              key="search"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex overflow-hidden bg-[#f0f4f8]"
            >
              {/* Search Content */}
              <div className="flex-1 flex flex-col overflow-y-auto">
                {/* Search Mode Header */}
                <div className="h-16 flex items-center justify-between px-8 bg-white border-b border-slate-200/50 shrink-0 sticky top-0 z-20">
                  <div className="w-64 flex items-center">
                    <span className="text-sm font-bold text-slate-700">检索中心</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => {
                        setSearchMode('quick');
                      }}
                      className={`px-6 py-1.5 rounded-full text-[13px] font-bold transition-all ${searchMode === 'quick' || searchMode === 'advanced' ? 'bg-blue-600 text-white shadow-md shadow-blue-100' : 'text-slate-500 hover:bg-slate-100'}`}
                    >
                      快速与高级检索
                    </button>
                    <button 
                      onClick={() => setSearchMode('scientific')}
                      className={`px-6 py-1.5 rounded-full text-[13px] font-bold transition-all ${searchMode === 'scientific' ? 'bg-blue-600 text-white shadow-md shadow-blue-100' : 'text-slate-500 hover:bg-slate-100'}`}
                    >
                      科研检索
                    </button>
                    <button 
                      onClick={() => setSearchMode('ai')}
                      className={`px-6 py-1.5 rounded-full text-[13px] font-bold transition-all ${searchMode === 'ai' ? 'bg-blue-600 text-white shadow-md shadow-blue-100' : 'text-slate-500 hover:bg-slate-100'}`}
                    >
                      AI智能检索
                    </button>
                  </div>
                  
                  <div className="w-64 flex items-center justify-end gap-3">
                    <button 
                      onClick={() => {
                        setSearchSidebarTab('help');
                        setIsSearchSidebarOpen(true);
                      }}
                      className="flex items-center gap-1.5 text-xs text-slate-500 font-bold hover:text-blue-600 transition-all mr-1 group"
                    >
                      <span>检索示例</span>
                      <div className="w-4 h-4 rounded-full bg-slate-200 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                        <Play size={8} className="text-slate-500 group-hover:text-blue-600 translate-x-[0.5px] fill-current" />
                      </div>
                    </button>
                    
                    <button 
                      onClick={() => {
                        setSearchSidebarTab('history');
                        setIsSearchSidebarOpen(!isSearchSidebarOpen || searchSidebarTab !== 'history' ? true : false);
                      }}
                      className={`w-8 h-8 rounded-full flex items-center justify-center shadow-sm border transition-all relative ${isSearchSidebarOpen && searchSidebarTab === 'history' ? 'bg-blue-50 border-blue-200 text-blue-600' : 'bg-white border-slate-200/60 text-slate-500 hover:text-blue-600 hover:border-slate-300'}`}
                    >
                      <FileText size={15} />
                      <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-[8px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold">1</span>
                    </button>
                    
                    <button 
                      onClick={() => {
                        setSearchSidebarTab('favorites');
                        setIsSearchSidebarOpen(!isSearchSidebarOpen || searchSidebarTab !== 'favorites' ? true : false);
                      }}
                      className={`w-8 h-8 rounded-full flex items-center justify-center shadow-sm border transition-all ${isSearchSidebarOpen && searchSidebarTab === 'favorites' ? 'bg-blue-50 border-blue-200 text-blue-600' : 'bg-white border-slate-200/60 text-slate-500 hover:text-blue-600 hover:border-slate-300'}`}
                    >
                      <Star size={15} />
                    </button>
                    
                    <button 
                      onClick={() => {
                        setSearchSidebarTab('help');
                        setIsSearchSidebarOpen(!isSearchSidebarOpen || searchSidebarTab !== 'help' ? true : false);
                      }}
                      className={`w-8 h-8 rounded-full flex items-center justify-center shadow-sm border transition-all ${isSearchSidebarOpen && searchSidebarTab === 'help' ? 'bg-blue-50 border-blue-200 text-blue-600' : 'bg-white border-slate-200/60 text-slate-500 hover:text-blue-600 hover:border-slate-300'}`}
                    >
                      <BookOpen size={15} />
                    </button>
                  </div>
                </div>

                <div className="px-6 pb-20 space-y-6">
                  {searchMode === 'quick' || searchMode === 'advanced' ? (
                    <div className="max-w-[1400px] mx-auto w-full pt-6 pb-24 space-y-6 animate-in fade-in duration-300">
                      {/* Unified Search Panel Card */}
                      <div className="bg-white border border-slate-200/80 rounded-[28px] shadow-lg shadow-slate-200/30 p-6 md:p-8 w-full relative">
                        
                        {/* Upper Segmented Control Header */}
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 mb-6">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                              <Search size={20} className="stroke-[2.5px]" />
                            </div>
                            <div>
                              <h2 className="text-base font-black text-slate-800">智能检索中心</h2>
                              <p className="text-xs text-slate-400 font-semibold">支持快速全文过滤及多维度逻辑组条件匹配</p>
                            </div>
                          </div>
                          
                          {/* Premium Segmented Control */}
                          <div className="bg-slate-100 p-1 rounded-2xl flex items-center border border-slate-200/30 shadow-inner self-center sm:self-auto">
                            <button 
                              onClick={() => {
                                setSearchMode('quick');
                                // Synchronize filter states
                                setQuickCampus(advancedCampus);
                                setQuickVisitType(advancedVisitType);
                                setQuickDepartment(advancedDepartment);
                                setQuickStartDate(advancedStartDate);
                                setQuickEndDate(advancedEndDate);
                              }}
                              className={`px-6 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${searchMode === 'quick' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
                            >
                              <Zap size={14} className={searchMode === 'quick' ? 'text-blue-500 animate-pulse' : ''} />
                              快速全文检索
                            </button>
                            <button 
                              onClick={() => {
                                setSearchMode('advanced');
                                // Synchronize filter states
                                setAdvancedCampus(quickCampus);
                                setAdvancedVisitType(quickVisitType);
                                setAdvancedDepartment(quickDepartment);
                                setAdvancedStartDate(quickStartDate);
                                setAdvancedEndDate(quickEndDate);
                              }}
                              className={`px-6 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${searchMode === 'advanced' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
                            >
                              <Sliders size={14} className={searchMode === 'advanced' ? 'text-blue-500' : ''} />
                              高级条件建组
                            </button>
                          </div>
                        </div>

                        {/* Shared Base Filters Card */}
                        <div className="bg-slate-50/50 border border-slate-200/40 rounded-2xl p-5 mb-6">
                          <div className="flex items-center gap-2 mb-4">
                            <div className="w-1 h-3 bg-blue-500 rounded-full" />
                            <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">全局基础筛选范围</span>
                            <span className="text-[10px] text-slate-400 font-semibold">(在快速和高级检索中实时同步)</span>
                          </div>
                          
                          <div className="flex flex-wrap items-center gap-3">
                            {/* Campus Dropdown */}
                            <div className="relative">
                              <button 
                                onClick={() => toggleQuickDropdown('campus')}
                                className="flex items-center justify-between gap-2 px-4 py-2 bg-white border border-slate-200/80 rounded-xl hover:bg-slate-50 transition-all text-xs font-semibold text-slate-700 w-36 shadow-sm"
                              >
                                <span>{searchMode === 'quick' ? quickCampus : advancedCampus}</span>
                                <ChevronDown size={14} className="text-slate-400" />
                              </button>
                              {activeQuickDropdown === 'campus' && (
                                <div className="absolute left-0 top-11 bg-white border border-slate-100 rounded-xl shadow-xl py-2 w-44 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                                  {['东院区', '西院区', '总部', '南院区'].map(opt => (
                                    <button
                                      key={opt}
                                      onClick={() => {
                                        setQuickCampus(opt);
                                        setAdvancedCampus(opt);
                                        setActiveQuickDropdown(null);
                                      }}
                                      className={`w-full text-left px-4 py-2 text-xs font-semibold hover:bg-slate-50 transition-colors ${(searchMode === 'quick' ? quickCampus : advancedCampus) === opt ? 'text-blue-600 bg-blue-50/50' : 'text-slate-600'}`}
                                    >
                                      {opt}
                                    </button>
                                  ))}
                                </div>
                              )}
                            </div>

                            {/* Visit Type Dropdown */}
                            <div className="relative">
                              <button 
                                onClick={() => toggleQuickDropdown('visitType')}
                                className="flex items-center justify-between gap-2 px-4 py-2 bg-white border border-slate-200/80 rounded-xl hover:bg-slate-50 transition-all text-xs font-semibold text-slate-700 w-28 shadow-sm"
                              >
                                <span>{searchMode === 'quick' ? quickVisitType : advancedVisitType}</span>
                                <ChevronDown size={14} className="text-slate-400" />
                              </button>
                              {activeQuickDropdown === 'visitType' && (
                                <div className="absolute left-0 top-11 bg-white border border-slate-100 rounded-xl shadow-xl py-2 w-36 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                                  {['全部', '门诊', '住院', '急诊'].map(opt => (
                                    <button
                                      key={opt}
                                      onClick={() => {
                                        setQuickVisitType(opt);
                                        setAdvancedVisitType(opt);
                                        setActiveQuickDropdown(null);
                                      }}
                                      className={`w-full text-left px-4 py-2 text-xs font-semibold hover:bg-slate-50 transition-colors ${(searchMode === 'quick' ? quickVisitType : advancedVisitType) === opt ? 'text-blue-600 bg-blue-50/50' : 'text-slate-600'}`}
                                    >
                                      {opt}
                                    </button>
                                  ))}
                                </div>
                              )}
                            </div>

                            {/* Department Dropdown */}
                            <div className="relative">
                              <button 
                                onClick={() => toggleQuickDropdown('department')}
                                className="flex items-center justify-between gap-2 px-4 py-2 bg-white border border-slate-200/80 rounded-xl hover:bg-slate-50 transition-all text-xs font-semibold text-slate-700 w-44 shadow-sm"
                              >
                                <span>{searchMode === 'quick' ? quickDepartment : advancedDepartment}</span>
                                <ChevronDown size={14} className="text-slate-400" />
                              </button>
                              {activeQuickDropdown === 'department' && (
                                <div className="absolute left-0 top-11 bg-white border border-slate-100 rounded-xl shadow-xl py-2 w-52 max-h-60 overflow-y-auto z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                                  {['就诊科室', '呼吸内科', '消化内科', '心血管内科', '神经外科', '普外科', '肿瘤科', '妇产科', '儿科', '急诊科'].map(opt => (
                                    <button
                                      key={opt}
                                      onClick={() => {
                                        setQuickDepartment(opt);
                                        setAdvancedDepartment(opt);
                                        setActiveQuickDropdown(null);
                                      }}
                                      className={`w-full text-left px-4 py-2 text-xs font-semibold hover:bg-slate-50 transition-colors ${(searchMode === 'quick' ? quickDepartment : advancedDepartment) === opt ? 'text-blue-600 bg-blue-50/50' : 'text-slate-600'}`}
                                    >
                                      {opt}
                                    </button>
                                  ))}
                                </div>
                              )}
                            </div>

                            <div className="h-6 w-px bg-slate-200 mx-1 shrink-0" />

                            {/* Date Range Picker */}
                            <div className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200/80 rounded-xl text-xs text-slate-700 flex-1 min-w-[280px] shadow-sm">
                              <Calendar size={14} className="text-slate-400 shrink-0" />
                              <input 
                                type="text" 
                                placeholder="开始日期" 
                                onFocus={(e) => (e.target.type = "date")}
                                onBlur={(e) => (e.target.type = "text")}
                                value={searchMode === 'quick' ? quickStartDate : advancedStartDate} 
                                onChange={(e) => {
                                  setQuickStartDate(e.target.value);
                                  setAdvancedStartDate(e.target.value);
                                }} 
                                className="w-full bg-transparent text-center text-xs text-slate-700 placeholder-slate-400 border-none outline-none focus:ring-0 p-0 cursor-pointer" 
                              />
                              <span className="text-slate-400 font-semibold shrink-0">-</span>
                              <input 
                                type="text" 
                                placeholder="结束日期" 
                                onFocus={(e) => (e.target.type = "date")}
                                onBlur={(e) => (e.target.type = "text")}
                                value={searchMode === 'quick' ? quickEndDate : advancedEndDate} 
                                onChange={(e) => {
                                  setQuickEndDate(e.target.value);
                                  setAdvancedEndDate(e.target.value);
                                }} 
                                className="w-full bg-transparent text-center text-xs text-slate-700 placeholder-slate-400 border-none outline-none focus:ring-0 p-0 cursor-pointer" 
                              />
                            </div>
                          </div>
                        </div>

                        {/* Mode Content */}
                        {searchMode === 'quick' ? (
                          <div className="space-y-6 animate-in fade-in duration-300">
                            {/* Input Query Card */}
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <div className="w-1 h-3.5 bg-blue-500 rounded-full" />
                                <label className="text-xs font-black text-slate-700">检索关键词</label>
                              </div>
                              
                              <div className="flex items-center gap-3 bg-slate-50 border border-slate-200/80 rounded-2xl p-3.5 pl-4 relative hover:border-slate-300 transition-all">
                                <Search size={18} className="text-slate-400 shrink-0" />
                                <input 
                                  type="text"
                                  value={quickQueryText}
                                  onChange={(e) => setQuickQueryText(e.target.value.slice(0, 120))}
                                  placeholder="输入疾病、药品、手术、主诉等就诊记录关键词（如：高血压、阿司匹林、左下腹痛）"
                                  maxLength={120}
                                  className="flex-1 bg-transparent border-none outline-none text-[14px] text-slate-800 placeholder-slate-400 focus:ring-0 py-1"
                                />

                                <span className="text-xs text-slate-400 font-medium shrink-0 px-2 select-none">
                                  {quickQueryText.length} / 120
                                </span>

                                {/* Split Action Button */}
                                <div className="relative shrink-0 flex items-center">
                                  <button 
                                    onClick={() => {
                                      setSearchQuery(quickQueryText);
                                      setActivePage('research-search-result');
                                    }}
                                    className="h-10 px-5 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white font-bold text-sm rounded-l-xl flex items-center gap-1 transition-all shadow-md shadow-blue-100"
                                  >
                                    {quickSearchType === 'fuzzy' ? '模糊查询' : '精确查询'}
                                  </button>
                                  <div className="w-px h-10 bg-blue-600/30 shrink-0" />
                                  <button 
                                    onClick={() => setQuickSearchTypeDropdownOpen(!quickSearchTypeDropdownOpen)}
                                    className="h-10 px-3 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white rounded-r-xl flex items-center justify-center transition-all shadow-md shadow-blue-100 shrink-0"
                                  >
                                    <ChevronDown size={14} />
                                  </button>
                                  
                                  {quickSearchTypeDropdownOpen && (
                                    <div className="absolute right-0 top-12 bg-white border border-slate-100 rounded-xl shadow-xl py-1.5 w-32 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                                      <button 
                                        onClick={() => {
                                          setQuickSearchType('fuzzy');
                                          setQuickSearchTypeDropdownOpen(false);
                                        }}
                                        className={`w-full text-left px-4 py-2 text-xs font-semibold hover:bg-slate-50 transition-colors ${quickSearchType === 'fuzzy' ? 'text-blue-600 bg-blue-50/50' : 'text-slate-600'}`}
                                      >
                                        模糊查询
                                      </button>
                                      <button 
                                        onClick={() => {
                                          setQuickSearchType('exact');
                                          setQuickSearchTypeDropdownOpen(false);
                                        }}
                                        className={`w-full text-left px-4 py-2 text-xs font-semibold hover:bg-slate-50 transition-colors ${quickSearchType === 'exact' ? 'text-blue-600 bg-blue-50/50' : 'text-slate-600'}`}
                                      >
                                        精确查询
                                      </button>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>

                            {/* Help & Examples Inside Card */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                              <div className="bg-blue-50/50 border border-blue-100/60 rounded-2xl p-5">
                                <div className="flex items-center gap-2 mb-3">
                                  <HelpCircle size={15} className="text-blue-500" />
                                  <span className="text-xs font-black text-blue-800">快速检索小贴士</span>
                                </div>
                                <p className="text-[11px] text-slate-600 leading-relaxed font-semibold">
                                  直接在上方输入框中录入文本（如 “2型糖尿病”），即可对全院临床文本库进行秒级毫秒索引检索。您还可以配合上方的“全局基础筛选范围”来缩小结果的目标院区或特定就诊时间段。
                                </p>
                              </div>
                              <div className="bg-slate-50 border border-slate-200/50 rounded-2xl p-5 flex flex-col justify-between">
                                <div>
                                  <span className="text-xs font-black text-slate-700 block mb-2">常用检索示例：</span>
                                  <div className="flex flex-wrap gap-1.5">
                                    {['高血压', '左半结肠切除术', '阿司匹林', '发热三周'].map((ex) => (
                                      <button
                                        key={ex}
                                        onClick={() => setQuickQueryText(ex)}
                                        className="px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-[10px] font-bold text-slate-600 hover:border-blue-300 hover:text-blue-600 transition-colors"
                                      >
                                        {ex}
                                      </button>
                                    ))}
                                  </div>
                                </div>
                                <button 
                                  onClick={() => {
                                    setSearchSidebarTab('help');
                                    setIsSearchSidebarOpen(true);
                                  }}
                                  className="text-[11px] font-bold text-blue-600 hover:underline flex items-center gap-1 mt-3"
                                >
                                  查看更详尽的系统检索语法指南 <ArrowRight size={10} />
                                </button>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="flex flex-col lg:flex-row gap-6 animate-in fade-in duration-300">
                            {/* Left Panel: Dynamic Conditions Builder */}
                            <div className="flex-1 flex flex-col min-h-[450px]">
                              <div className="flex items-center gap-2 mb-4">
                                <div className="w-1 h-3.5 bg-blue-500 rounded-full" />
                                <span className="text-xs font-black text-slate-700">条件链逻辑组合 (由上而下顺序计算)</span>
                              </div>

                              {/* Conditions List */}
                              <div className="space-y-3.5 flex-1">
                                {advancedConditions.map((cond, idx) => (
                                  <div key={cond.id} className="flex flex-wrap items-center gap-2.5 bg-slate-50/50 hover:bg-slate-50 p-3 rounded-2xl transition-all border border-slate-150">
                                    {/* Col 1: Connection operator */}
                                    <div className="relative">
                                      <button 
                                        onClick={() => setActiveAdvancedDropdown(activeAdvancedDropdown?.rowIndex === idx && activeAdvancedDropdown?.field === 'logic' ? null : { rowIndex: idx, field: 'logic' })}
                                        className="flex items-center justify-between gap-1.5 px-3 py-2 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all text-xs font-semibold text-slate-700 w-28 shrink-0 shadow-sm"
                                      >
                                        <span className="truncate">{cond.logic}</span>
                                        <ChevronDown size={14} className="text-slate-400" />
                                      </button>
                                      {activeAdvancedDropdown?.rowIndex === idx && activeAdvancedDropdown?.field === 'logic' && (
                                        <div className="absolute left-0 top-10 bg-white border border-slate-100 rounded-xl shadow-xl py-1.5 w-36 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                                          {(idx === 0 ? ['同一次就诊', '同一个患者'] : ['与 (and)', '或 (or)', '非 (not)']).map(opt => (
                                            <button
                                              key={opt}
                                              onClick={() => {
                                                const updated = [...advancedConditions];
                                                updated[idx].logic = opt;
                                                setAdvancedConditions(updated);
                                                setActiveAdvancedDropdown(null);
                                              }}
                                              className={`w-full text-left px-3 py-1.5 text-xs font-semibold hover:bg-slate-50 transition-colors ${cond.logic === opt ? 'text-blue-600 bg-blue-50/50' : 'text-slate-600'}`}
                                            >
                                              {opt}
                                            </button>
                                          ))}
                                        </div>
                                      )}
                                    </div>

                                    {/* Col 2: Field indicator */}
                                    <div className="relative">
                                      <button 
                                        onClick={() => setActiveAdvancedDropdown(activeAdvancedDropdown?.rowIndex === idx && activeAdvancedDropdown?.field === 'field' ? null : { rowIndex: idx, field: 'field' })}
                                        className="flex items-center justify-between gap-1.5 px-3 py-2 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all text-xs font-semibold text-slate-700 w-48 shrink-0 shadow-sm"
                                      >
                                        <span className="truncate">{cond.field}</span>
                                        <ChevronDown size={14} className="text-slate-400" />
                                      </button>
                                      {activeAdvancedDropdown?.rowIndex === idx && activeAdvancedDropdown?.field === 'field' && (
                                        <div className="absolute left-0 top-10 bg-white border border-slate-100 rounded-xl shadow-xl py-1.5 w-60 max-h-56 overflow-y-auto z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                                          {['就诊记录/就诊科室', '就诊记录/就诊时间', '就诊记录/年龄(天)', '就诊记录/诊断名称', '患者信息/性别', '患者信息/出生年份', '检验结果/白细胞计数', '检验结果/血红蛋白'].map(opt => (
                                            <button
                                              key={opt}
                                              onClick={() => {
                                                const updated = [...advancedConditions];
                                                updated[idx].field = opt;
                                                if (opt.includes('时间') || opt.includes('日期') || opt.includes('年份')) {
                                                  updated[idx].operator = '介于';
                                                } else if (opt.includes('年龄') || opt.includes('计数') || opt.includes('血红蛋白')) {
                                                  updated[idx].operator = '介于';
                                                } else {
                                                  updated[idx].operator = '包含';
                                                }
                                                updated[idx].value1 = '';
                                                updated[idx].value2 = '';
                                                setAdvancedConditions(updated);
                                                setActiveAdvancedDropdown(null);
                                              }}
                                              className={`w-full text-left px-3 py-1.5 text-xs font-semibold hover:bg-slate-50 transition-colors ${cond.field === opt ? 'text-blue-600 bg-blue-50/50' : 'text-slate-600'}`}
                                            >
                                              {opt}
                                            </button>
                                          ))}
                                        </div>
                                      )}
                                    </div>

                                    {/* Col 3: Match operator */}
                                    <div className="relative">
                                      <button 
                                        onClick={() => setActiveAdvancedDropdown(activeAdvancedDropdown?.rowIndex === idx && activeAdvancedDropdown?.field === 'operator' ? null : { rowIndex: idx, field: 'operator' })}
                                        className="flex items-center justify-between gap-1.5 px-3 py-2 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all text-xs font-semibold text-slate-700 w-28 shrink-0 shadow-sm"
                                      >
                                        <span className="truncate">{cond.operator}</span>
                                        <ChevronDown size={14} className="text-slate-400" />
                                      </button>
                                      {activeAdvancedDropdown?.rowIndex === idx && activeAdvancedDropdown?.field === 'operator' && (
                                        <div className="absolute left-0 top-10 bg-white border border-slate-100 rounded-xl shadow-xl py-1.5 w-40 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                                          {['包含', '不包含', '等于', '不等于', '大于', '小于', '介于', '为空', '不为空'].map(opt => (
                                            <button
                                              key={opt}
                                              onClick={() => {
                                                const updated = [...advancedConditions];
                                                updated[idx].operator = opt;
                                                setAdvancedConditions(updated);
                                                setActiveAdvancedDropdown(null);
                                              }}
                                              className={`w-full text-left px-3 py-1.5 text-xs font-semibold hover:bg-slate-50 transition-colors ${cond.operator === opt ? 'text-blue-600 bg-blue-50/50' : 'text-slate-600'}`}
                                            >
                                              {opt}
                                            </button>
                                          ))}
                                        </div>
                                      )}
                                    </div>

                                    {/* Col 4: Value Inputs */}
                                    <div className="flex-1 min-w-[180px]">
                                      {cond.operator === '为空' || cond.operator === '不为空' ? (
                                        <div className="h-9 bg-slate-100/40 border border-slate-200/60 rounded-xl flex items-center px-4 text-xs text-slate-400 italic w-full max-w-[280px]">
                                          无需输入条件值
                                        </div>
                                      ) : cond.operator === '介于' ? (
                                        cond.field.includes('时间') || cond.field.includes('日期') || cond.field.includes('年份') ? (
                                          <div className="flex items-center gap-1.5 px-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-700 h-9 w-full max-w-[280px] shadow-sm">
                                            <Calendar size={13} className="text-slate-400 shrink-0" />
                                            <input 
                                              type="text" 
                                              placeholder="开始日期" 
                                              onFocus={(e) => (e.target.type = "date")}
                                              onBlur={(e) => (e.target.type = "text")}
                                              value={cond.value1} 
                                              onChange={(e) => {
                                                const updated = [...advancedConditions];
                                                updated[idx].value1 = e.target.value;
                                                setAdvancedConditions(updated);
                                              }} 
                                              className="w-full bg-transparent text-center text-xs text-slate-700 placeholder-slate-400 border-none outline-none focus:ring-0 p-0 cursor-pointer text-ellipsis overflow-hidden" 
                                            />
                                            <span className="text-slate-400 font-semibold shrink-0">~</span>
                                            <input 
                                              type="text" 
                                              placeholder="结束日期" 
                                              onFocus={(e) => (e.target.type = "date")}
                                              onBlur={(e) => (e.target.type = "text")}
                                              value={cond.value2} 
                                              onChange={(e) => {
                                                const updated = [...advancedConditions];
                                                updated[idx].value2 = e.target.value;
                                                setAdvancedConditions(updated);
                                              }} 
                                              className="w-full bg-transparent text-center text-xs text-slate-700 placeholder-slate-400 border-none outline-none focus:ring-0 p-0 cursor-pointer text-ellipsis overflow-hidden" 
                                            />
                                          </div>
                                        ) : cond.field.includes('年龄') || cond.field.includes('计数') || cond.field.includes('量') || cond.field.includes('红蛋白') ? (
                                          <div className="flex items-center gap-1.5 px-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-700 h-9 w-full max-w-[280px] shadow-sm">
                                            <input 
                                              type="number" 
                                              placeholder="开始数值" 
                                              value={cond.value1} 
                                              onChange={(e) => {
                                                const updated = [...advancedConditions];
                                                updated[idx].value1 = e.target.value;
                                                setAdvancedConditions(updated);
                                              }} 
                                              className="w-full bg-transparent text-center text-xs text-slate-700 placeholder-slate-400 border-none outline-none focus:ring-0 p-0 text-ellipsis overflow-hidden" 
                                            />
                                            <span className="text-slate-400 font-semibold shrink-0">~</span>
                                            <input 
                                              type="number" 
                                              placeholder="结束数值" 
                                              value={cond.value2} 
                                              onChange={(e) => {
                                                const updated = [...advancedConditions];
                                                updated[idx].value2 = e.target.value;
                                                setAdvancedConditions(updated);
                                              }} 
                                              className="w-full bg-transparent text-center text-xs text-slate-700 placeholder-slate-400 border-none outline-none focus:ring-0 p-0 text-ellipsis overflow-hidden" 
                                            />
                                          </div>
                                        ) : (
                                          <div className="flex items-center gap-1.5 px-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-700 h-9 w-full max-w-[280px] shadow-sm">
                                            <input 
                                              type="text" 
                                              placeholder="开始值" 
                                              value={cond.value1} 
                                              onChange={(e) => {
                                                const updated = [...advancedConditions];
                                                updated[idx].value1 = e.target.value;
                                                setAdvancedConditions(updated);
                                              }} 
                                              className="w-full bg-transparent text-center text-xs text-slate-700 placeholder-slate-400 border-none outline-none focus:ring-0 p-0 text-ellipsis overflow-hidden" 
                                            />
                                            <span className="text-slate-400 font-semibold shrink-0">~</span>
                                            <input 
                                              type="text" 
                                              placeholder="结束值" 
                                              value={cond.value2} 
                                              onChange={(e) => {
                                                const updated = [...advancedConditions];
                                                updated[idx].value2 = e.target.value;
                                                setAdvancedConditions(updated);
                                              }} 
                                              className="w-full bg-transparent text-center text-xs text-slate-700 placeholder-slate-400 border-none outline-none focus:ring-0 p-0 text-ellipsis overflow-hidden" 
                                            />
                                          </div>
                                        )
                                      ) : (
                                        cond.field.includes('时间') || cond.field.includes('日期') || cond.field.includes('年份') ? (
                                          <div className="flex items-center gap-2 px-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-700 h-9 w-full max-w-[280px] shadow-sm animate-in fade-in duration-100">
                                            <Calendar size={13} className="text-slate-400 shrink-0" />
                                            <input 
                                              type="text" 
                                              placeholder="选择日期" 
                                              onFocus={(e) => (e.target.type = "date")}
                                              onBlur={(e) => (e.target.type = "text")}
                                              value={cond.value1} 
                                              onChange={(e) => {
                                                const updated = [...advancedConditions];
                                                updated[idx].value1 = e.target.value;
                                                setAdvancedConditions(updated);
                                              }} 
                                              className="w-full bg-transparent text-left text-xs text-slate-700 placeholder-slate-400 border-none outline-none focus:ring-0 p-0 cursor-pointer" 
                                            />
                                          </div>
                                        ) : (
                                          <input 
                                            type="text" 
                                            placeholder="请输入筛选值" 
                                            value={cond.value1} 
                                            onChange={(e) => {
                                              const updated = [...advancedConditions];
                                              updated[idx].value1 = e.target.value;
                                              setAdvancedConditions(updated);
                                            }} 
                                            className="w-full max-w-[280px] px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-700 h-9 outline-none focus:border-blue-300 shadow-sm animate-in fade-in duration-100" 
                                          />
                                        )
                                      )}
                                    </div>

                                    {/* Col 5: Actions */}
                                    <div className="flex items-center gap-1.5 shrink-0 ml-auto">
                                      <button 
                                        onClick={() => addAdvancedCondition(idx)}
                                        className="w-8 h-8 rounded-lg border border-slate-200 text-slate-500 hover:text-blue-600 hover:bg-blue-50 hover:border-blue-200 transition-all flex items-center justify-center shadow-sm"
                                        title="添加条件"
                                      >
                                        <Plus size={14} className="stroke-[3px]" />
                                      </button>
                                      {idx > 0 && (
                                        <button 
                                          onClick={() => removeAdvancedCondition(idx)}
                                          className="w-8 h-8 rounded-lg border border-slate-200 text-slate-400 hover:text-red-500 hover:bg-red-50 hover:border-red-200 transition-all flex items-center justify-center shadow-sm"
                                          title="删除条件"
                                        >
                                          <Minus size={14} className="stroke-[3px]" />
                                        </button>
                                      )}
                                    </div>
                                  </div>
                                ))}
                              </div>

                              {/* Bottom Actions Row */}
                              <div className="flex items-center justify-center sm:justify-start gap-3 pt-6 border-t border-slate-100 mt-6 shrink-0">
                                <button 
                                  onClick={() => {
                                    setSearchQuery(advancedConditions.map(c => `${c.field} ${c.operator} ${c.value1}${c.value2 ? ' ~ ' + c.value2 : ''}`).join(' ' + (advancedConditions[1]?.logic || '与') + ' '));
                                    setActivePage('research-search-result');
                                  }}
                                  className="h-10 px-6 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-md shadow-blue-100 min-w-[120px]"
                                >
                                  <Search size={14} />
                                  <span>执行高级检索</span>
                                </button>
                                <button 
                                  onClick={() => {
                                    clearAdvancedConditions();
                                    setToastMessage("检索条件已成功清空");
                                    setTimeout(() => setToastMessage(null), 2500);
                                  }}
                                  className="h-10 px-4 bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 font-bold text-xs rounded-xl transition-all shadow-sm"
                                >
                                  清空条件
                                </button>
                                <button 
                                  onClick={() => {
                                    setToastMessage("检索条件已成功保存！可在右侧“检索收藏”中查看。");
                                    setTimeout(() => setToastMessage(null), 3000);
                                  }}
                                  className="h-10 px-4 bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 font-bold text-xs rounded-xl transition-all shadow-sm"
                                >
                                  收藏条件
                                </button>
                              </div>
                            </div>

                            {/* Right Panel: Search Tips */}
                            <div className="w-full lg:w-[320px] bg-slate-50/50 border border-slate-150 rounded-2xl p-5 shrink-0 flex flex-col justify-between">
                              <div className="space-y-4">
                                <div className="bg-blue-50/80 border border-blue-100 text-blue-700 font-extrabold text-xs text-center py-2 rounded-xl">
                                  检索Tips & 指南
                                </div>
                                <div className="space-y-3 text-slate-600 text-[11px] font-semibold leading-relaxed font-sans">
                                  <p>
                                    <span className="text-slate-800 font-extrabold">1. 逻辑条件组合：</span>
                                    高级检索支持多维指标复合嵌套，您可组合“与或非”等复杂运算规则。
                                  </p>
                                  <p>
                                    <span className="text-slate-800 font-extrabold">2. 运算顺序规则：</span>
                                    “与或非”没有默认优先级，多字段拼装时自上而下依次进行运算。
                                  </p>
                                  <p>
                                    <span className="text-slate-800 font-extrabold">3. 诊疗归类差异：</span>
                                    <span className="text-blue-600">“同一次就诊”</span>限制所有条件必须在同一次挂号住院下共同触发；而<span className="text-blue-600">“同一个患者”</span>则对跨就诊合并。
                                  </p>
                                </div>
                              </div>
                              <button 
                                onClick={() => {
                                  setSearchSidebarTab('help');
                                  setIsSearchSidebarOpen(true);
                                }}
                                className="w-full py-2 bg-white hover:bg-slate-100 text-slate-600 border border-slate-200 text-[11px] font-black rounded-xl text-center transition-all mt-4"
                              >
                                查看更详尽的系统功能手册
                              </button>
                            </div>
                          </div>
                        )}
                        
                      </div>

                      {/* Floating toast alerts */}
                      {toastMessage && (
                        <div className="fixed bottom-6 right-6 bg-slate-900/95 text-white text-xs font-semibold px-4 py-3 rounded-2xl shadow-xl z-50 animate-in fade-in slide-in-from-bottom-2 duration-200 flex items-center gap-2 border border-slate-800">
                          <CheckCircle2 size={14} className="text-emerald-400" />
                          <span>{toastMessage}</span>
                          <button onClick={() => setToastMessage(null)} className="hover:text-slate-300 ml-1 font-bold">✕</button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <>
                      {/* Case / Control Group Toggle */}
                      <div className="flex justify-center w-full mb-2 mt-2">
                     <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl w-fit border border-slate-200 shadow-sm">
                        <button 
                           onClick={() => setSearchGroupMode('case')}
                           className={`px-10 py-2.5 rounded-lg text-[13px] font-black transition-all flex items-center gap-2 ${searchGroupMode === 'case' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
                        >
                           <Shield size={16} /> 病例组(Case) 筛选配置
                        </button>
                        <button 
                           onClick={() => setSearchGroupMode('control')}
                           className={`px-10 py-2.5 rounded-lg text-[13px] font-black transition-all flex items-center gap-2 ${searchGroupMode === 'control' ? 'bg-white shadow-sm text-emerald-600' : 'text-slate-500 hover:text-slate-700'}`}
                        >
                           <Users size={16} /> 对照组(Control) 匹配策略
                           {enableControlMatch && <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />}
                        </button>
                     </div>
                  </div>

                  {searchGroupMode === 'case' ? (
                     <>
                  {/* Scientific Search Sub-Tabs */}
                  <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
                    <div className="flex gap-1 p-1 bg-slate-100 rounded-xl w-fit mb-6">
                      <button 
                        onClick={() => setScientificSearchSubTab('inclusion')}
                        className={`px-8 py-2 rounded-lg text-xs font-black transition-all ${scientificSearchSubTab === 'inclusion' ? 'bg-blue-600 text-white shadow-md shadow-blue-100' : 'text-slate-500'}`}
                      >
                        纳入标准
                      </button>
                      <button 
                        onClick={() => setScientificSearchSubTab('exclusion')}
                        className={`px-8 py-2 rounded-lg text-xs font-black transition-all ${scientificSearchSubTab === 'exclusion' ? 'bg-blue-600 text-white shadow-md shadow-blue-100' : 'text-slate-500'}`}
                      >
                        排除标准
                      </button>
                      <button 
                        onClick={() => setScientificSearchSubTab('event')}
                        className={`px-8 py-2 rounded-lg text-xs font-black transition-all flex items-center gap-1 ${scientificSearchSubTab === 'event' ? 'bg-blue-600 text-white shadow-md shadow-blue-100' : 'text-slate-500'}`}
                      >
                        <Network size={14} /> 事件筛选
                      </button>
                      <button 
                        onClick={() => setScientificSearchSubTab('tips')}
                        className={`px-8 py-2 rounded-lg text-xs font-black transition-all ${scientificSearchSubTab === 'tips' ? 'bg-blue-600 text-white shadow-md shadow-blue-100' : 'text-slate-500'}`}
                      >
                        检索tips
                      </button>
                    </div>

                    {scientificSearchSubTab !== 'event' && (
                      <>
                        <div className="space-y-4">
                          <span className="text-xs font-black text-slate-800 uppercase tracking-widest flex items-center gap-2">
                            条件筛选
                          </span>
                          
                          <div className="bg-[#f0f4f8] rounded-3xl border border-slate-200 overflow-hidden relative min-h-[400px]">
                            {/* Builder Toolbar */}
                            <div className="absolute top-4 right-4 z-10 flex items-center gap-2 bg-white/90 backdrop-blur shadow-sm border border-slate-200 rounded-xl p-1.5">
                              <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-400"><Minus size={16} /></button>
                              <span className="text-[11px] font-black w-10 text-center text-slate-600">100%</span>
                              <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-400"><Plus size={16} /></button>
                              <div className="w-px h-4 bg-slate-200 mx-1" />
                              <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-400"><Layout size={16} /></button>
                            </div>

                            {/* Flow Builder */}
                            <div className="p-8 space-y-12">
                              <button className="bg-blue-600 text-white px-4 py-2 rounded-xl text-xs font-black flex items-center gap-2 shadow-lg shadow-blue-100">
                                <Plus size={16} /> {scientificSearchSubTab === 'exclusion' ? '排除条件' : '纳入条件'}
                              </button>

                              <div className="space-y-8 pl-8 relative">
                                <div className="absolute left-0 top-[-30px] bottom-10 w-0.5 bg-slate-200" />
                                <div className="flex items-center gap-4 relative">
                                  <div className="absolute left-[-32px] top-1/2 w-8 h-0.5 bg-slate-200" />
                                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4 w-full">
                                    <span className="text-xs font-black text-slate-700 whitespace-nowrap">{scientificSearchSubTab === 'exclusion' ? '排除条件' : '纳入条件'}1</span>
                                    <div className="flex flex-1 items-center gap-2">
                                      <div className="px-4 py-2 border border-slate-100 bg-slate-50 text-[13px] rounded-lg text-slate-700 flex items-center justify-between w-48">
                                        <span>全院</span>
                                        <ChevronDown size={14} className="text-slate-400" />
                                      </div>
                                      <div className="px-4 py-2 border border-slate-100 bg-slate-50 text-[13px] rounded-lg text-slate-700 flex items-center justify-between w-24">
                                        <span>全部</span>
                                        <ChevronDown size={14} className="text-slate-400" />
                                      </div>
                                      <div className="px-4 py-2 border border-slate-100 bg-slate-50 text-[13px] rounded-lg text-slate-700 flex items-center justify-between w-48">
                                        <span className="text-slate-400">就诊科室</span>
                                        <ChevronDown size={14} className="text-slate-400" />
                                      </div>
                                      <Calendar size={18} className="text-slate-300" />
                                      <div className="flex-1 bg-slate-50 border border-slate-100 rounded-lg h-9" />
                                    </div>
                                  </div>
                                </div>

                                <div className="flex items-center gap-4 relative">
                                  <div className="absolute left-[-32px] top-1/2 w-8 h-0.5 bg-slate-200" />
                                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-4 w-full">
                                    <div className="flex items-center gap-4">
                                      <span className="text-xs font-black text-slate-700 whitespace-nowrap">{scientificSearchSubTab === 'exclusion' ? '排除条件' : '纳入条件'}2</span>
                                      <div className="flex items-center gap-1">
                                        <button className="p-1.5 text-slate-300 hover:text-blue-600"><Copy size={16} /></button>
                                        <button className="p-1.5 text-slate-300 hover:text-red-500"><Trash2 size={16} /></button>
                                        <button className="p-1.5 text-slate-300 hover:text-slate-600"><Settings size={16} /></button>
                                      </div>
                                      <div className="flex items-center gap-2 bg-slate-50 p-1.5 rounded-xl border border-slate-100">
                                        <div className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-[13px] flex items-center gap-4">
                                          <span>同一次就诊</span>
                                          <ChevronDown size={14} className="text-slate-400" />
                                        </div>
                                        <div className="bg-blue-600 text-white px-3 py-1 rounded-lg text-[11px] font-black flex items-center gap-1">
                                          且 <ChevronDown size={12} />
                                        </div>
                                        <button className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                                          <Plus size={16} />
                                        </button>
                                      </div>
                                    </div>
                                    <div className="pl-12 space-y-4 relative">
                                      <div className="absolute left-4 top-[-20px] bottom-6 w-0.5 bg-slate-200" />
                                      <div className="absolute left-4 bottom-6 w-4 h-0.5 bg-slate-200" />
                                      <div className="flex items-center gap-3">
                                        <button className="flex items-center gap-1 text-[11px] font-black text-slate-400 bg-slate-50 px-2 py-1 rounded">
                                          <Minus size={14} /> 按
                                        </button>
                                        <div className="flex-1 flex gap-2">
                                          <div className="px-4 py-2 border border-slate-200 rounded-xl bg-white text-[13px] flex items-center justify-between flex-1">
                                            <span>诊断信息/原始诊断名称</span>
                                            <ChevronDown size={14} className="text-slate-400" />
                                          </div>
                                          <div className="px-4 py-2 border border-slate-200 rounded-xl bg-white text-[13px] flex items-center justify-between w-32">
                                            <span>包含</span>
                                            <ChevronDown size={14} className="text-slate-400" />
                                          </div>
                                          <div className="px-4 py-2 border border-slate-200 rounded-xl bg-white text-[13px] flex items-center gap-2 min-w-[300px]">
                                            <span className="flex items-center gap-1 bg-slate-100 px-2 py-1 rounded text-blue-600 font-bold">
                                              肝衰竭 <X size={12} className="text-slate-400" />
                                            </span>
                                            <span className="text-slate-300 font-bold p-1">或</span>
                                            <span className="flex items-center gap-1 bg-slate-100 px-2 py-1 rounded text-blue-600 font-bold">
                                              肝炎 <X size={12} className="text-slate-400" />
                                            </span>
                                            <input type="text" className="outline-none flex-1" placeholder="请输入" />
                                          </div>
                                          <button className="p-2 text-slate-300 hover:text-slate-500"><Settings size={18} /></button>
                                        </div>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <button className="px-4 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-[11px] font-bold">+ 条件</button>
                                        <button className="px-4 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-[11px] font-bold">+ 括号</button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    )}

                    {scientificSearchSubTab === 'event' && (
                      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm space-y-6 mt-6">
                        <div className="flex flex-col gap-2">
                          <span className="text-xs font-black text-slate-800 uppercase tracking-widest flex items-center gap-2">
                            时序时间轴 (患者诊疗事件T0坐标系构建)
                          </span>
                        </div>

                        <div className="space-y-6">
                          {/* Baseline Event = T0 Anchor */}
                          <div className="relative pl-10 border border-slate-200 rounded-3xl p-6 bg-blue-50/50 shadow-sm">
                            <div className="absolute left-6 top-8 w-[2px] h-[calc(100%-40px)] bg-blue-600 rounded-full" />
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center gap-4">
                                <div className="bg-blue-600 text-white px-3 py-1 rounded-lg text-sm font-black flex items-center gap-2 shadow-md shadow-blue-200">
                                  <Anchor size={16} /> 核心事件锚点 (T0)
                                </div>
                                <span className="text-[13px] font-black text-slate-800">基准起始点，构建时序系统</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="bg-white border border-slate-200 px-3 py-1 rounded-md text-xs font-bold text-slate-500 shadow-sm">自动提取患者诊疗时间特征</span>
                              </div>
                            </div>
                            
                            <div className="bg-white p-4 border border-blue-100 rounded-2xl space-y-4">
                              <div className="flex items-center gap-3">
                                <div className="px-2 py-1 border border-slate-200 rounded-xl bg-slate-50 text-[13px] font-bold text-blue-600 flex items-center justify-between min-w-[200px]">
                                  <select 
                                    className="bg-transparent border-none outline-none cursor-pointer w-full text-blue-600 font-bold"
                                    value={anchorCategory}
                                    onChange={(e) => setAnchorCategory(e.target.value)}
                                  >
                                    <option>诊断信息/确诊时间</option>
                                    <option>首次入院时间</option>
                                    <option>手术日期</option>
                                    <option>放化疗开始时间</option>
                                  </select>
                                </div>
                                <span className="text-slate-400 font-bold text-xs">满足单条件或多组合精准定义</span>
                                <div className="px-2 py-1 border border-slate-200 rounded-xl bg-slate-50 text-[13px] text-slate-700 w-32 flex items-center justify-between">
                                  <select 
                                    className="bg-transparent border-none outline-none cursor-pointer w-full text-slate-700"
                                    value={anchorCondition}
                                    onChange={(e) => setAnchorCondition(e.target.value)}
                                  >
                                    <option>首次确诊</option>
                                    <option>末次确诊</option>
                                    <option>任意确诊</option>
                                  </select>
                                </div>
                                <button className="p-2 text-slate-300 hover:text-blue-600"><Settings size={18} /></button>
                              </div>
                            </div>
                          </div>

                          {/* Time Window Rules / Coordinate System */}
                          <div className="relative border border-slate-200 rounded-3xl p-6 bg-white shadow-sm flex flex-col items-center justify-center">
                            <div className="flex items-center gap-2 text-[13px] mb-4 bg-slate-100 px-4 py-2 rounded-xl text-slate-600 font-bold border border-slate-200">
                              <Layers size={16} className="text-blue-500" /> 以 T0 为中心的时序坐标系分析 (时间范围/顺序快速过滤)
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <span className="text-slate-500 font-bold">检索范围在 T0 的</span>
                              <div className="flex items-center gap-1">
                                <input type="number" className="w-16 h-9 border-2 border-slate-200 rounded-lg text-center font-bold text-blue-600 focus:border-blue-500 outline-none" 
                                  value={timeWindowStart} 
                                  onChange={(e) => setTimeWindowStart(Number(e.target.value))} 
                                />
                                <span className="text-slate-500">天前</span>
                              </div>
                              <div className="px-8 h-[2px] bg-slate-200 relative mx-2">
                                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white text-[10px] font-black px-2 py-1 rounded w-8 text-center shadow-md">T0</div>
                              </div>
                              <div className="flex items-center gap-1">
                                <span className="text-slate-500">至</span>
                                <input type="number" className="w-16 h-9 border-2 border-slate-200 rounded-lg text-center font-bold text-blue-600 focus:border-blue-500 outline-none" 
                                  value={timeWindowEnd} 
                                  onChange={(e) => setTimeWindowEnd(Number(e.target.value))} 
                                />
                                <span className="text-slate-500">天后内</span>
                              </div>
                            </div>
                          </div>

                          {/* Complex Event Overlap - Other events */}
                          <div className="relative pl-10 border border-slate-200 rounded-3xl p-6 bg-slate-50 shadow-sm">
                            <div className="absolute left-6 top-8 w-[2px] h-[calc(100%-40px)] bg-slate-300 rounded-full border-l-2 border-dashed border-slate-400 bg-transparent" />
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center gap-3">
                                <div className="bg-slate-700 text-white px-3 py-1 rounded-lg text-[13px] font-black flex items-center gap-2">
                                  <ListTree size={16} /> 多事件链叠加分析
                                </div>
                                <span className="text-[13px] font-bold text-slate-600">自定义序列条件进行精确事件链叠加与过滤</span>
                              </div>
                              <button 
                                onClick={() => setOverlapEvents([...overlapEvents, { id: 'evt_' + Date.now(), sequence: 'T0 后发生', countType: '总次数', operator: '≥', count: 1, category: '请选择事件类型', condition: '请设置触发条件' }])}
                                className="text-blue-600 text-[13px] font-bold flex items-center gap-1 hover:text-blue-700">
                                <Plus size={16} /> 新增叠加事件
                              </button>
                            </div>
                            
                            <div className="space-y-4">
                              {overlapEvents.map((evt, idx) => (
                                <div key={evt.id} className="bg-white p-5 border border-slate-200 rounded-2xl space-y-4 shadow-sm">
                                  <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                                    <select 
                                      className="text-xs font-black text-slate-500 bg-slate-100 px-2 py-1 rounded border-none outline-none cursor-pointer"
                                      value={evt.sequence}
                                      onChange={(e) => setOverlapEvents(overlapEvents.map(v => v.id === evt.id ? { ...v, sequence: e.target.value } : v))}
                                    >
                                      <option>T0 后发生</option>
                                      <option>T0 前发生</option>
                                      <option>伴随 T0 发生</option>
                                    </select>
                                    <div className="px-2 py-1 bg-slate-50 border border-slate-200 rounded text-[13px] text-slate-700 flex items-center justify-between">
                                      <select className="bg-transparent border-none outline-none cursor-pointer w-full"
                                        value={evt.countType}
                                        onChange={(e) => setOverlapEvents(overlapEvents.map(v => v.id === evt.id ? { ...v, countType: e.target.value } : v))}
                                      >
                                        <option>总次数</option>
                                        <option>连续次数</option>
                                        <option>无发生</option>
                                      </select>
                                    </div>
                                    <div className="px-2 py-1 bg-slate-50 border border-slate-200 rounded text-[13px] text-slate-700 flex items-center justify-between">
                                      <select className="bg-transparent border-none outline-none cursor-pointer"
                                        value={evt.operator}
                                        onChange={(e) => setOverlapEvents(overlapEvents.map(v => v.id === evt.id ? { ...v, operator: e.target.value } : v))}
                                      >
                                        <option>≥</option>
                                        <option>≤</option>
                                        <option>=</option>
                                        <option>&gt;</option>
                                        <option>&lt;</option>
                                      </select>
                                    </div>
                                    <input type="number" 
                                      className="w-16 h-9 border border-slate-200 rounded-xl px-2 text-sm font-bold text-center outline-none focus:border-blue-500" 
                                      value={evt.count}
                                      onChange={(e) => setOverlapEvents(overlapEvents.map(v => v.id === evt.id ? { ...v, count: Number(e.target.value) } : v))}
                                    />
                                  </div>
                                  <div className="flex items-center gap-3">
                                    <div className="px-2 py-1 border border-slate-200 rounded text-[13px] font-bold text-slate-700 min-w-[150px] flex items-center justify-between">
                                      <select className="bg-transparent border-none outline-none cursor-pointer w-full text-slate-700"
                                        value={evt.category}
                                        onChange={(e) => setOverlapEvents(overlapEvents.map(v => v.id === evt.id ? { ...v, category: e.target.value } : v))}
                                      >
                                        <option>请选择事件类型</option>
                                        <option>检验信息/生化全套</option>
                                        <option>检验信息/血常规</option>
                                        <option>诊断信息/合并症</option>
                                        <option>用药记录/靶向药</option>
                                      </select>
                                    </div>
                                    <div className="px-2 py-1 border border-slate-200 rounded text-[13px] font-bold text-slate-700 min-w-[120px] flex items-center justify-between gap-1">
                                      <Activity size={14} className="text-emerald-500"/>
                                      <select className="bg-transparent border-none outline-none cursor-pointer w-full"
                                        value={evt.condition}
                                        onChange={(e) => setOverlapEvents(overlapEvents.map(v => v.id === evt.id ? { ...v, condition: e.target.value } : v))}
                                      >
                                        <option>请设置触发条件</option>
                                        <option>异常偏高</option>
                                        <option>异常偏低</option>
                                        <option>阳性</option>
                                        <option>阴性</option>
                                      </select>
                                    </div>
                                    <button 
                                      onClick={() => setOverlapEvents(overlapEvents.filter(v => v.id !== evt.id))}
                                      className="p-2.5 text-slate-300 hover:text-red-500 ml-auto transition-colors"
                                    >
                                      <Trash2 size={16} />
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>


                     </>
                      ) : (
                        <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                           <div className="flex justify-between items-center mb-6 pl-2">
                              <div>
                                 <h3 className="text-base font-black text-slate-800">构建对照组匹配策略</h3>
                                 <p className="text-xs text-slate-500 mt-1 pb-2">设定对照组（Control）匹配规则，系统将从全量库中为找到的病例寻找特征相似的对照患者，常用于 PSM 评分匹配。</p>
                              </div>
                              <button 
                                onClick={() => setEnableControlMatch(!enableControlMatch)}
                                className={`px-6 py-2 rounded-xl text-sm font-black border-2 transition-all flex items-center gap-2 ${enableControlMatch ? 'border-red-200 text-red-500 bg-red-50 hover:bg-red-100 shadow-sm' : 'border-emerald-200 text-emerald-600 bg-emerald-50 hover:bg-emerald-100 shadow-sm'}`}
                              >
                                {enableControlMatch ? <><Minus className="w-4 h-4" /> 停用当前匹配策略</> : <><Plus className="w-4 h-4" /> 启用对照组匹配检索</>}
                              </button>
                           </div>

                           {!enableControlMatch && (
                             <div className="bg-[#f0f4f8] border border-dashed border-slate-300 rounded-3xl p-12 flex flex-col items-center justify-center min-h-[300px]">
                                <Users size={48} className="text-slate-300 mb-4" />
                                <h4 className="text-lg font-bold text-slate-500 mb-2">尚未启用对照组匹配</h4>
                                <p className="text-sm text-slate-400 mb-6 text-center max-w-md">启用后，您可以配置基准群体条件、精确匹配因子和倾向性评分(PSM)容差因子，以便在检索病例基线外，同步找出对照组数据，帮助您实现更好的统计分析对比。</p>
                                <button 
                                  onClick={() => setEnableControlMatch(true)}
                                  className="px-6 py-2.5 bg-emerald-500 text-white hover:bg-emerald-600 rounded-xl font-bold shadow-sm flex items-center gap-2 transition-all"
                                >
                                  <Plus size={16} /> 立即启用匹配
                                </button>
                             </div>
                           )}

                           {enableControlMatch && (
                             <div className="space-y-6 border border-slate-200 rounded-3xl bg-[#f0f4f8] p-8">
                                <div className="flex items-center gap-2 mb-6">
                                   <span className="text-sm font-black text-slate-800 uppercase tracking-widest flex items-center gap-2">
                                     对照组匹配策略配置
                                   </span>
                                </div>


                        {/* Match Configuration */}
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
                           <div className="flex items-center justify-between">
                              <h4 className="text-[13px] font-bold text-slate-700">1. 对照组基准群体条件</h4>
                           </div>
                           <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-4">
                              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                                 <Plus size={16} />
                              </div>
                              <div className="flex-1 space-y-3 mt-1">
                                 <div className="flex items-center gap-3">
                                   <div className="px-4 py-2 border border-slate-200 rounded-lg bg-white text-xs flex items-center justify-between min-w-[200px]">
                                      <span>就诊信息/住院时间</span>
                                      <ChevronDown size={14} className="text-slate-400" />
                                   </div>
                                   <span className="text-xs font-bold text-slate-500">介于</span>
                                   <div className="px-4 py-2 border border-slate-200 rounded-lg bg-white text-xs flex items-center justify-between w-48">
                                      <span>2024-01-01 至 2024-12-31</span>
                                      <Calendar size={14} className="text-slate-400" />
                                   </div>
                                 </div>
                                 <div className="flex items-center gap-3">
                                   <div className="px-4 py-2 border border-slate-200 rounded-lg bg-white text-xs flex items-center justify-between min-w-[200px]">
                                      <span>诊断信息/疾病名称</span>
                                      <ChevronDown size={14} className="text-slate-400" />
                                   </div>
                                   <span className="text-xs font-bold text-slate-500">等于</span>
                                   <div className="px-4 py-2 border border-slate-200 rounded-lg bg-white text-xs text-blue-600 font-bold max-w-fit">
                                      食管癌
                                   </div>
                                 </div>
                                 <div className="flex items-center gap-3">
                                   <div className="px-4 py-2 border border-slate-200 rounded-lg bg-white text-xs flex items-center justify-between min-w-[200px]">
                                      <span>治疗信息/新辅助治疗</span>
                                      <ChevronDown size={14} className="text-slate-400" />
                                   </div>
                                   <span className="text-xs font-bold text-slate-500">等于</span>
                                   <div className="px-4 py-2 border border-slate-200 rounded-lg bg-white text-xs text-blue-600 font-bold max-w-fit">
                                      否
                                   </div>
                                 </div>
                              </div>
                           </div>

                           <div className="h-px w-full bg-slate-100" />

                           <div className="flex items-center justify-between">
                              <h4 className="text-[13px] font-bold text-slate-700">2. 病例-对照 匹配规则 (PSM匹配等)</h4>
                           </div>
                           <div className="grid grid-cols-2 gap-4">
                              <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm relative group hover:border-blue-300">
                                <div className="absolute right-4 top-4 text-slate-300 hover:text-red-500 cursor-pointer">
                                  <Trash2 size={16} />
                                </div>
                                <div className="text-[13px] font-bold text-slate-700 mb-4">属性精确匹配</div>
                                <div className="space-y-3">
                                  <div className="flex items-center justify-between text-xs bg-slate-50 p-2 rounded">
                                    <span className="text-slate-500">性别</span>
                                    <span className="font-bold text-slate-700">完全一致</span>
                                  </div>
                                  <div className="flex items-center justify-between text-xs bg-slate-50 p-2 rounded">
                                    <span className="text-slate-500">临床分期</span>
                                    <span className="font-bold text-slate-700">完全一致</span>
                                  </div>
                                </div>
                                <button className="mt-4 w-full py-2 border border-dashed border-slate-300 text-slate-500 text-xs rounded hover:bg-slate-50 font-bold transition-colors">
                                  + 添加精确匹配因子
                                </button>
                              </div>

                              <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm relative group hover:border-blue-300">
                                <div className="absolute right-4 top-4 text-slate-300 hover:text-red-500 cursor-pointer">
                                  <Trash2 size={16} />
                                </div>
                                <div className="text-[13px] font-bold text-slate-700 mb-4">倾向性评分匹配 (PSM/容差)</div>
                                <div className="space-y-3">
                                  <div className="flex items-center justify-between text-xs bg-slate-50 p-2 rounded">
                                    <span className="text-slate-500">年龄</span>
                                    <span className="font-bold text-slate-700">± 3 岁容差</span>
                                  </div>
                                </div>
                                <button className="mt-4 w-full py-2 border border-dashed border-slate-300 text-slate-500 text-xs rounded hover:bg-slate-50 font-bold transition-colors">
                                  + 添加容差/PSM因子
                                </button>
                              </div>
                           </div>

                           <div className="h-px w-full bg-slate-100" />

                           <div className="flex items-center justify-between">
                              <h4 className="text-[13px] font-bold text-slate-700">3. 匹配比例</h4>
                           </div>
                           <div className="flex items-center gap-4">
                              <div className="px-4 py-2 border border-slate-200 bg-slate-50 rounded-lg text-xs font-bold text-slate-700">
                                 1 : 1 匹配
                              </div>
                              <div className="px-4 py-2 border border-slate-200 bg-white rounded-lg text-xs font-bold text-slate-400">
                                 1 : N 匹配
                              </div>
                           </div>

                        </div>
                             </div>
                           )}
                           </div>
                        )}

                  {/* Actions Bar */}
                  <div className="flex items-center justify-center gap-4 pt-10">
                    <button 
                      onClick={() => setActivePage('research-search-result')}
                      className="px-12 py-3 bg-blue-600 text-white font-black rounded-2xl shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all flex items-center gap-2"
                    >
                       检索
                    </button>
                    <button className="px-10 py-3 text-slate-600 font-bold hover:bg-slate-50 rounded-2xl border border-slate-200 transition-all">
                       清空检索条件
                    </button>
                    <button className="px-10 py-3 text-slate-600 font-bold hover:bg-slate-50 rounded-2xl border border-slate-200 transition-all">
                       收藏条件
                    </button>
                  </div>
                    </>
                  )}
                </div>
              </div>

              {/* Right Sidebar Panel */}
              {isSearchSidebarOpen && (
                <div className="w-[380px] bg-white border-l border-slate-100 h-screen flex flex-col shadow-2xl relative z-10 animate-in slide-in-from-right duration-300 shrink-0">
                  {/* Sidebar Header Tabs */}
                  <div className="flex items-center p-4 border-b border-slate-100 bg-white">
                     <div className="flex-1 flex gap-1 bg-slate-100 p-1 rounded-xl">
                        <button 
                         onClick={() => setSearchSidebarTab('history')}
                         className={`flex-1 py-2 text-[13px] font-bold rounded-lg transition-all ${searchSidebarTab === 'history' ? 'bg-white text-blue-600 shadow-sm font-black' : 'text-slate-500 hover:text-slate-700'}`}
                        >检索历史</button>
                        <button 
                         onClick={() => setSearchSidebarTab('favorites')}
                         className={`flex-1 py-2 text-[13px] font-bold rounded-lg transition-all ${searchSidebarTab === 'favorites' ? 'bg-white text-blue-600 shadow-sm font-black' : 'text-slate-500 hover:text-slate-700'}`}
                        >检索收藏</button>
                        <button 
                         onClick={() => setSearchSidebarTab('help')}
                         className={`flex-1 py-2 text-[13px] font-bold rounded-lg transition-all ${searchSidebarTab === 'help' ? 'bg-white text-blue-600 shadow-sm font-black' : 'text-slate-500 hover:text-slate-700'}`}
                        >使用帮助</button>
                     </div>
                     <button 
                       onClick={() => setIsSearchSidebarOpen(false)}
                       className="ml-2 p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 transition-colors"
                     >
                       <X size={18} />
                     </button>
                  </div>

                  {/* Sidebar Body Content */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4 relative">
                    {/* Background Watermark */}
                    <div className="absolute inset-0 pointer-events-none select-none opacity-[0.03] flex flex-col items-center justify-center gap-12 overflow-hidden -rotate-12">
                      <span className="text-4xl font-mono font-black text-slate-900">test_A 8901</span>
                      <span className="text-4xl font-mono font-black text-slate-900">test_A 8901</span>
                      <span className="text-4xl font-mono font-black text-slate-900">test_A 8901</span>
                    </div>

                    {/* HISTORY TAB */}
                    {searchSidebarTab === 'history' && (
                      <div className="space-y-4">
                        {/* Search Bar */}
                        <div className="relative mb-4">
                          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                          <input 
                            type="text" 
                            value={historySearchKeyword}
                            onChange={(e) => setHistorySearchKeyword(e.target.value)}
                            placeholder="输入搜索关键词" 
                            className="w-full pl-9 pr-16 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-blue-500 focus:bg-white transition-all"
                          />
                          <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 text-white text-xs px-3 py-1 rounded-lg font-bold hover:bg-blue-700 transition-colors">
                            搜索
                          </button>
                        </div>

                        {/* Selection Sub-Header */}
                        <div className="flex items-center justify-between px-1 py-1 text-xs text-slate-500 border-b border-slate-100 pb-2">
                          <span className="font-bold">检索历史 ({searchHistoryList.length})</span>
                        </div>

                        {/* List of History Items */}
                        <div className="space-y-3">
                          {searchHistoryList
                            .filter(item => !historySearchKeyword || item.conditions.some(c => c.includes(historySearchKeyword)) || item.title.includes(historySearchKeyword))
                            .map((item) => {
                              return (
                                <div 
                                  key={item.id} 
                                  className="p-3.5 bg-white rounded-2xl border border-slate-200/80 hover:border-blue-200 transition-all relative group hover:shadow-md"
                                >
                                  {/* Conditions */}
                                  <div className="flex items-start gap-2.5 mb-2">
                                    <div className="flex-1 space-y-1 text-xs text-slate-700 leading-relaxed font-normal">
                                      {item.conditions.map((cond, cIdx) => (
                                        <div key={cIdx} className="text-[11px] text-slate-600 font-medium">
                                          {cond}
                                        </div>
                                      ))}
                                    </div>
                                  </div>

                                  {/* Record & Patient Counts */}
                                  <div className="text-[11px] text-slate-600 mb-2 pl-6 font-medium">
                                    共 <span className="text-blue-600 font-bold font-mono text-xs">{item.recordCount.toLocaleString()}</span> 份病历，来源于 <span className="text-blue-600 font-bold font-mono text-xs">{item.patientCount.toLocaleString()}</span> 个患者
                                  </div>

                                  {/* Timestamp */}
                                  <div className="flex items-center gap-1 text-[10px] text-slate-400 mb-3 pl-6">
                                    <Clock size={12} className="text-slate-300" />
                                    <span>{item.timestamp}</span>
                                  </div>

                                  {/* Action Footer */}
                                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 pl-6">
                                    <button 
                                      onClick={() => {
                                        setSearchHistoryList(searchHistoryList.map(h => h.id === item.id ? { ...h, isStarred: !h.isStarred } : h));
                                        setToastMessage(item.isStarred ? '已取消收藏' : '已成功收藏该检索条件！');
                                      }}
                                      className={`text-xs font-bold flex items-center gap-1 transition-colors ${item.isStarred ? 'text-amber-500' : 'text-slate-400 hover:text-amber-500'}`}
                                    >
                                      <Star size={13} className={item.isStarred ? 'fill-amber-500' : ''} />
                                      <span>{item.isStarred ? '已收藏' : '收藏'}</span>
                                    </button>

                                    <button 
                                      onClick={() => {
                                        setActivePage('research-search-result');
                                        setResearchSubTab('results');
                                        setToastMessage('已成功加载该历史检索方案并执行科研检索！');
                                      }}
                                      className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-all shadow-sm active:scale-95 flex items-center gap-1"
                                    >
                                      <span>科研检索</span>
                                    </button>
                                  </div>
                                </div>
                              );
                            })}
                        </div>
                      </div>
                    )}

                    {/* FAVORITES TAB */}
                    {searchSidebarTab === 'favorites' && (
                      <div className="space-y-4">
                        {/* Search Bar */}
                        <div className="relative mb-4">
                          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                          <input 
                            type="text" 
                            value={favoriteSearchKeyword}
                            onChange={(e) => setFavoriteSearchKeyword(e.target.value)}
                            placeholder="输入收藏名字、分享人名字" 
                            className="w-full pl-9 pr-16 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-blue-500 focus:bg-white transition-all"
                          />
                          <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 text-white text-xs px-3 py-1 rounded-lg font-bold hover:bg-blue-700 transition-colors">
                            搜索
                          </button>
                        </div>

                        {/* Selection Sub-Header */}
                        <div className="flex items-center justify-between px-1 py-1 text-xs text-slate-500 border-b border-slate-100 pb-2">
                          <span className="font-bold">检索收藏库 ({searchFavoritesList.length})</span>
                        </div>

                        {/* List of Favorite Items */}
                        <div className="space-y-3">
                          {searchFavoritesList
                            .filter(item => !favoriteSearchKeyword || item.title.includes(favoriteSearchKeyword) || item.conditions.some(c => c.includes(favoriteSearchKeyword)))
                            .map((item) => {
                              const isEditingThis = editingFavoriteId === item.id;
                              return (
                                <div 
                                  key={item.id} 
                                  className="p-3.5 bg-white rounded-2xl border border-slate-200/80 hover:border-blue-200 transition-all relative group hover:shadow-md"
                                >
                                  {/* Title with edit icon */}
                                  <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2 flex-1 pr-2">
                                      {isEditingThis ? (
                                        <div className="flex items-center gap-1 flex-1">
                                          <input 
                                            type="text" 
                                            value={editingFavoriteTitle}
                                            onChange={(e) => setEditingFavoriteTitle(e.target.value)}
                                            className="px-2 py-0.5 border border-blue-400 rounded text-xs font-bold outline-none flex-1"
                                            autoFocus
                                          />
                                          <button 
                                            onClick={() => {
                                              setSearchFavoritesList(searchFavoritesList.map(f => f.id === item.id ? { ...f, title: editingFavoriteTitle } : f));
                                              setEditingFavoriteId(null);
                                              setToastMessage('名称修改成功！');
                                            }}
                                            className="p-1 bg-blue-600 text-white rounded text-[10px] font-bold"
                                          >
                                            保存
                                          </button>
                                        </div>
                                      ) : (
                                        <div className="flex items-center gap-1.5">
                                          <h4 className="text-xs font-black text-slate-800">{item.title}</h4>
                                          <button 
                                            onClick={() => {
                                              setEditingFavoriteId(item.id);
                                              setEditingFavoriteTitle(item.title);
                                            }}
                                            className="text-slate-400 hover:text-blue-600 p-0.5 transition-colors"
                                            title="重命名收藏名称"
                                          >
                                            <Edit2 size={12} />
                                          </button>
                                        </div>
                                      )}
                                    </div>
                                  </div>

                                  {/* Condition details */}
                                  <div className="space-y-1 text-xs text-slate-700 leading-relaxed font-normal mb-2">
                                    {item.conditions.map((cond, cIdx) => (
                                      <div key={cIdx} className="text-[11px] text-slate-600 font-medium">
                                        {cond}
                                      </div>
                                    ))}
                                  </div>

                                  {/* Record & Patient Counts */}
                                  <div className="text-[11px] text-slate-600 mb-2 font-medium">
                                    共 <span className="text-blue-600 font-bold font-mono text-xs">{item.recordCount.toLocaleString()}</span> 份病历，来源于 <span className="text-blue-600 font-bold font-mono text-xs">{item.patientCount.toLocaleString()}</span> 个患者
                                  </div>

                                  {/* Timestamp */}
                                  <div className="flex items-center gap-1 text-[10px] text-slate-400 mb-3">
                                    <Clock size={12} className="text-slate-300" />
                                    <span>{item.timestamp}</span>
                                  </div>

                                  {/* Action Footer */}
                                  <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                                    <button 
                                      onClick={() => {
                                        setToastMessage(`已生成收藏方案【${item.title}】的共享链接，方便团队协同引用！`);
                                      }}
                                      className="text-xs font-bold text-slate-500 hover:text-blue-600 flex items-center gap-1 transition-colors"
                                    >
                                      <Send size={12} className="text-slate-400" />
                                      <span>分享</span>
                                    </button>

                                    <button 
                                      onClick={() => {
                                        setActivePage('research-search-result');
                                        setResearchSubTab('results');
                                        setToastMessage(`已加载【${item.title}】收藏方案并执行科研检索！`);
                                      }}
                                      className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-all shadow-sm active:scale-95 flex items-center gap-1"
                                    >
                                      <span>科研检索</span>
                                    </button>
                                  </div>
                                </div>
                              );
                            })}
                        </div>
                      </div>
                    )}

                    {/* HELP TAB */}
                    {searchSidebarTab === 'help' && (
                      <div className="space-y-4 text-xs text-slate-600 leading-relaxed p-2">
                        <div className="p-4 bg-blue-50/50 rounded-2xl border border-blue-100 space-y-2">
                          <h4 className="font-black text-slate-800 text-xs flex items-center gap-1.5 text-blue-700">
                            <HelpCircle size={14} /> 检索指南
                          </h4>
                          <p>1. 可以在【检索历史】和【检索收藏】中查看已构建的纳排条件组合及患者基数。</p>
                          <p>2. 数据洞察功能已整合至【患者收藏】模块，可在【患者收藏-数据洞察】中进行多方案横向比对。</p>
                          <p>3. 支持直接点击【重命名】修改收藏方案名称，或点击【分享】生成团队共享链接。</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {activePage === 'approval-center' && (
            <motion.div 
              key="approval-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col bg-[#f0f4f8] overflow-hidden"
            >
              {approvalView === 'dashboard' ? (
                <div className="flex-1 overflow-y-auto w-full">
                  <div className="px-10 pt-10 pb-6 max-w-7xl mx-auto">
                     <div className="flex justify-between items-end mb-8">
                       <div>
                         <h2 className="text-[22px] font-black text-slate-800 mb-1">审批中心</h2>
                         <p className="text-xs text-slate-400 font-bold">管理您的数据申请与审批任务</p>
                       </div>
                       <div className="flex items-center gap-10 text-center">
                         <div>
                           <div className="text-2xl font-black text-blue-600 mb-1">7</div>
                           <div className="text-xs text-slate-400 font-bold">累计申请</div>
                         </div>
                         <div>
                           <div className="text-2xl font-black text-emerald-500 mb-1">6</div>
                           <div className="text-xs text-slate-400 font-bold">已通过</div>
                         </div>
                         <div>
                           <div className="text-2xl font-black text-rose-500 mb-1">0</div>
                           <div className="text-xs text-slate-400 font-bold">已驳回</div>
                         </div>
                       </div>
                     </div>
                     
                     <div className="grid grid-cols-2 gap-6 mb-8">
                       <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col relative overflow-hidden group cursor-pointer" onClick={() => setApprovalView('applications')}>
                           <div className="absolute top-0 right-0 w-80 h-80 bg-blue-50/50 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />
                           <div className="absolute flex gap-[72px] text-slate-100/40 font-mono text-xl -rotate-12 transform scale-[2] top-1/2 left-0 whitespace-nowrap pointer-events-none select-none z-0">
                              <span>test_A 8901</span><span>test_A 8901</span><span>test_A 8901</span>
                           </div>

                           <div className="flex items-start gap-4 mb-10 relative z-10">
                              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center shrink-0">
                                <FileText size={28} className="fill-blue-100" />
                              </div>
                              <div className="pt-2">
                                <h3 className="text-lg font-black text-slate-800 mb-1">我的申请</h3>
                                <p className="text-xs text-slate-500 font-bold">查看您提交的导出申请和权限申请进度</p>
                              </div>
                           </div>
                           
                           <div className="flex items-center justify-between mt-auto relative z-10 w-full border-t border-slate-50 pt-4">
                              <span className="text-blue-600 text-sm font-black flex items-center gap-1 group-hover:gap-2 transition-all">
                                立即进入 <ChevronRight size={16} />
                              </span>
                              <div className="px-4 py-1.5 bg-blue-50 text-blue-600 text-xs font-black rounded-full">
                                0 条进行中
                              </div>
                           </div>
                       </div>

                       <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col relative overflow-hidden group cursor-pointer" onClick={() => setApprovalView('approvals')}>
                           <div className="absolute top-0 right-0 w-80 h-80 bg-amber-50/50 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />
                           <div className="absolute flex gap-[72px] text-slate-100/40 font-mono text-xl -rotate-12 transform scale-[2] -translate-y-12 top-1/2 left-0 whitespace-nowrap pointer-events-none select-none z-0">
                              <span>test_A 8901</span><span>test_A 8901</span><span>test_A 8901</span>
                           </div>
                           <div className="flex items-start gap-4 mb-10 relative z-10">
                              <div className="w-16 h-16 bg-amber-50 text-amber-500 rounded-3xl flex items-center justify-center shrink-0">
                                <ClipboardCheck size={28} className="fill-amber-100" />
                              </div>
                              <div className="pt-2">
                                <h3 className="text-lg font-black text-slate-800 mb-1">我的审批</h3>
                                <p className="text-xs text-slate-500 font-bold">处理来自其他用户的导出和权限审批任务</p>
                              </div>
                           </div>
                           
                           <div className="flex items-center justify-between mt-auto relative z-10 border-t border-slate-50 pt-4 w-full">
                              <span className="text-amber-500 text-sm font-black flex items-center gap-1 group-hover:gap-2 transition-all">
                                立即进入 <ChevronRight size={16} />
                              </span>
                              <div className="px-4 py-1.5 bg-amber-50 text-amber-600 text-xs font-black rounded-full">
                                0 条待处理
                              </div>
                           </div>
                       </div>
                     </div>

                     <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                       <div className="flex items-center justify-between p-5 border-b border-slate-50">
                          <h3 className="text-sm font-black text-slate-800 flex items-center gap-2">
                            <Activity size={18} className="text-blue-600" />
                            您最近的动态
                          </h3>
                          <button className="text-xs text-slate-400 font-bold hover:text-slate-600">查看全部</button>
                       </div>
                       
                       <div className="divide-y divide-slate-50">
                         {[
                           { status: '审批通过' },
                           { status: '待审批' },
                           { status: '审批通过' },
                           { status: '待审批' },
                           { status: '审批通过' },
                         ].map((item, idx) => (
                           <div key={idx} className="flex items-center justify-between p-6 hover:bg-slate-50/50 transition-colors relative overflow-hidden group cursor-pointer">
                               <div className="absolute flex gap-[72px] text-slate-50/80 font-mono text-xl -rotate-12 transform top-1/2 left-0 whitespace-nowrap pointer-events-none select-none z-0">
                                  <span>test_A 8901</span>
                                  <span>test_A 8901</span>
                                  <span>test_A 8901</span>
                                  <span>test_A 8901</span>
                                  <span>test_A 8901</span>
                               </div>
                             <div className="flex items-center gap-6 relative z-10 w-full">
                                <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center shrink-0">
                                  <FileText size={20} className="fill-blue-100" />
                                </div>
                                <div className="flex-1">
                                  <div className="text-sm font-bold text-slate-800 mb-1 whitespace-nowrap">您 提交了 <span className="font-black text-slate-900">数据导出</span></div>
                                  <div className="text-xs text-slate-400 font-medium whitespace-nowrap">通用科研库 · 2026-05-27 {16 - Math.floor(idx/2)}:{18 - (idx*3)}</div>
                                </div>
                                <div className="shrink-0 flex items-center gap-6">
                                  <div className={`px-4 py-1.5 rounded text-xs font-black whitespace-nowrap ${item.status === '审批通过' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-500'}`}>
                                    {item.status}
                                  </div>
                                  <ChevronRight size={18} className="text-slate-200 group-hover:text-slate-400" />
                                </div>
                             </div>
                           </div>
                         ))}
                       </div>
                     </div>
                  </div>
                </div>
              ) : selectedApprovalApplication ? (
                <div className="flex-1 flex flex-col overflow-hidden bg-[#f0f4f8]">
                  {/* Header */}
                  <div className="h-[60px] bg-white border-b border-slate-200 px-6 flex items-center justify-between shrink-0 shadow-sm">
                    <div className="flex items-center gap-4">
                       <button className="text-slate-500 hover:text-slate-800 transition-colors" onClick={() => setSelectedApprovalApplication(null)}>
                         <ArrowLeft size={20} />
                       </button>
                      <span className="text-xl font-black text-slate-800">{selectedApprovalApplication.name}</span>
                    </div>
                    <button className="px-6 py-2 bg-[#2563eb] text-white font-bold rounded shadow-sm hover:bg-blue-700 transition-colors">审批</button>
                  </div>
                  
                  {/* Content */}
                  <div className="p-6 flex-1 overflow-y-auto w-full">
                    <div className="flex gap-6 items-start h-full max-w-[1600px] mx-auto">
                      <div className="flex-1 space-y-6 min-w-0">
                         {/* Search Info */}
                         <div className="bg-white border border-slate-200 rounded p-6 shadow-sm">
                           <h3 className="text-base font-black text-slate-800 mb-6">检索信息</h3>
                           <div className="border border-slate-200 rounded-sm overflow-hidden">
                             <table className="w-full text-xs text-left">
                               <tbody className="divide-y divide-slate-200">
                                 <tr className="bg-white">
                                   <th className="px-4 py-3 bg-[#f8f9fb] border-r border-slate-200 w-32 font-bold text-slate-600">数据集名称</th>
                                   <td className="px-4 py-3 border-r border-slate-200 w-1/3">{selectedApprovalApplication.name}</td>
                                   <th className="px-4 py-3 bg-[#f8f9fb] border-r border-slate-200 w-32 font-bold text-slate-600">业务用途</th>
                                   <td className="px-4 py-3">{selectedApprovalApplication.name}用途</td>
                                 </tr>
                                 <tr className="bg-white">
                                   <th className="px-4 py-3 bg-[#f8f9fb] border-r border-slate-200 font-bold text-slate-600">申请附件</th>
                                   <td className="px-4 py-3 border-r border-slate-200"></td>
                                   <th className="px-4 py-3 bg-[#f8f9fb] border-r border-slate-200 font-bold text-slate-600">数据量</th>
                                   <td className="px-4 py-3">10份病历, 0位患者</td>
                                 </tr>
                                 <tr className="bg-white">
                                   <th className="px-4 py-3 bg-[#f8f9fb] border-r border-slate-200 font-bold text-slate-600">导出人</th>
                                   <td className="px-4 py-3 border-r border-slate-200">test_A</td>
                                   <th className="px-4 py-3 bg-[#f8f9fb] border-r border-slate-200 font-bold text-slate-600">导出时间</th>
                                   <td className="px-4 py-3"></td>
                                 </tr>
                                 <tr className="bg-white">
                                   <th className="px-4 py-3 bg-[#f8f9fb] border-r border-slate-200 font-bold text-slate-600">导出字段</th>
                                   <td className="px-4 py-3 border-r border-slate-200"><button className="text-blue-600 font-bold">查看</button></td>
                                   <th className="px-4 py-3 bg-[#f8f9fb] border-r border-slate-200 font-bold text-slate-600">有效状态</th>
                                   <td className="px-4 py-3 flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div>失效</td>
                                 </tr>
                                 <tr className="bg-white">
                                   <th className="px-4 py-3 bg-[#f8f9fb] border-r border-slate-200 font-bold text-slate-600">失败原因</th>
                                   <td className="px-4 py-3 border-r border-slate-200" colSpan={3}>-</td>
                                 </tr>
                               </tbody>
                             </table>
                           </div>
                         </div>

                         {/* Dataset Preview */}
                         <div className="bg-white border border-slate-200 rounded p-6 shadow-sm overflow-x-auto">
                           <h3 className="text-base font-black text-slate-800 mb-6">数据集预览</h3>
                           <div className="border border-slate-200 overflow-x-auto rounded-sm">
                              <table className="w-max text-xs text-left min-w-full relative">
                                <thead className="bg-[#eef2fa] border-b border-slate-200">
                                  <tr>
                                    <th className="px-4 py-3 font-bold text-slate-700 whitespace-nowrap border-r border-slate-200 bg-[#eef2fa]">就诊类型</th>
                                    <th className="px-4 py-3 font-bold text-slate-700 whitespace-nowrap border-r border-slate-200 bg-[#eef2fa]">就诊科室</th>
                                    <th className="px-4 py-3 font-bold text-slate-700 whitespace-nowrap border-r border-slate-200 bg-[#eef2fa]">就诊时间</th>
                                    <th className="px-4 py-3 font-bold text-slate-700 whitespace-nowrap border-r border-slate-200">rid (调用函数生成)</th>
                                    <th className="px-4 py-3 font-bold text-slate-700 whitespace-nowrap border-r border-slate-200">empi</th>
                                    <th className="px-4 py-3 font-bold text-slate-700 whitespace-nowrap border-r border-slate-200">患者ID</th>
                                    <th className="px-4 py-3 font-bold text-slate-700 whitespace-nowrap border-r border-slate-200">接诊医生</th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 bg-white">
                                  {[
                                    { type: '门诊', dept: '骨科', intime: '2024-02-xx', rid: '68146327738487743...', empi: 'EMPI...', pid: 'P0000...', doc: 'Dr.骨科...' },
                                    { type: '门诊', dept: '骨科', intime: '2024-02-xx', rid: '68146327738487743...', empi: 'EMPI...', pid: 'P0000...', doc: 'Dr.骨科...' },
                                    { type: '门诊', dept: '骨科', intime: '2024-02-xx', rid: '68146327738487743...', empi: 'EMPI...', pid: 'P0000...', doc: 'Dr.骨科...' },
                                    { type: '门诊', dept: '骨科', intime: '2024-02-xx', rid: '68146327738487743...', empi: 'EMPI...', pid: 'P0000...', doc: 'Dr.骨科...' },
                                  ].map((r, i) => (
                                    <tr key={i} className="hover:bg-slate-50/50">
                                      <td className="px-4 py-4 whitespace-nowrap border-r border-slate-100 bg-white group-hover:bg-slate-50/50 font-medium text-slate-600">{r.type}</td>
                                      <td className="px-4 py-4 whitespace-nowrap border-r border-slate-100 bg-white group-hover:bg-slate-50/50 font-medium text-slate-600">{r.dept}</td>
                                      <td className="px-4 py-4 whitespace-nowrap border-r border-slate-100 bg-white group-hover:bg-slate-50/50 font-medium text-slate-600">{r.intime}</td>
                                      <td className="px-4 py-4 whitespace-nowrap border-r border-slate-100 text-slate-500 font-mono text-[11px]">{r.rid}</td>
                                      <td className="px-4 py-4 whitespace-nowrap border-r border-slate-100 text-slate-500 font-mono text-[11px]">{r.empi}</td>
                                      <td className="px-4 py-4 whitespace-nowrap border-r border-slate-100 text-slate-500 font-mono text-[11px]">{r.pid}</td>
                                      <td className="px-4 py-4 whitespace-nowrap text-slate-500">{r.doc}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                           </div>
                         </div>
                      </div>
                      
                      {/* Timeline flow */}
                      <div className="w-[340px] shrink-0 bg-white border border-slate-200 rounded p-6 shadow-sm sticky top-0">
                        <div className="relative border-l-2 border-blue-500 ml-4 space-y-8 pb-4">
                          
                          <div className="relative">
                            <div className="absolute -left-[27px] bg-white p-1 rounded-full text-blue-500 border border-white">
                               <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center shadow">
                                 <User size={16} />
                               </div>
                               <div className="absolute bottom-1 -right-1 bg-white rounded-full text-emerald-500 border border-white">
                                 <CheckCircle2 size={12} className="fill-emerald-500 text-white" />
                               </div>
                            </div>
                            <div className="pl-6 pt-1">
                               <div className="flex items-center justify-between mb-2 mt-1">
                                 <h4 className="font-bold text-slate-800 text-sm">开始</h4>
                                 <span className="text-[10px] text-slate-400 font-mono scale-90 origin-right">2026-05-19 09:57:15</span>
                               </div>
                               <div className="flex bg-blue-50/50 text-blue-600 border border-blue-200 rounded-full px-2 py-1 items-center gap-1.5 w-max">
                                 <User size={12} className="opacity-80" /> <span className="text-xs font-bold">guest1</span>
                               </div>
                            </div>
                          </div>

                          <div className="relative">
                            <div className="absolute -left-[27px] bg-white p-1 rounded-full text-blue-500 border border-white">
                               <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center shadow">
                                 <User size={16} />
                               </div>
                            </div>
                            <div className="pl-6 pt-1">
                               <h4 className="font-bold text-slate-800 text-sm mb-2 mt-1">遗传办公室审批</h4>
                               <div className="flex flex-wrap gap-2">
                                 <div className="flex bg-slate-50 text-slate-500 border border-slate-200 rounded-full px-2 py-1 items-center gap-1.5 text-xs">
                                   <User size={12} className="opacity-70" /> yangliu
                                 </div>
                                 <div className="flex bg-white text-blue-600 border border-blue-200 rounded-full px-2 py-1 items-center gap-1.5 text-xs shadow-sm">
                                   <div className="w-3.5 h-3.5 bg-blue-600 rounded-full text-white flex items-center justify-center text-[8px] font-bold">M</div> MrZhang
                                 </div>
                                 <div className="flex bg-white text-slate-700 border border-slate-200 rounded-full px-2 py-1 items-center gap-1.5 text-xs shadow-sm">
                                   <div className="w-3.5 h-3.5 bg-slate-800 rounded-full text-white flex items-center justify-center text-[8px]"><User size={8} /></div> admin
                                 </div>
                                 <div className="flex bg-white text-slate-700 border border-slate-200 rounded-full px-2 py-1 items-center gap-1.5 text-xs shadow-sm">
                                   <div className="w-3.5 h-3.5 bg-slate-800 rounded-full text-white flex items-center justify-center text-[8px]"><User size={8} /></div> tianhy
                                 </div>
                               </div>
                            </div>
                          </div>

                          <div className="relative">
                            <div className="absolute -left-[27px] bg-white p-1 rounded-full text-blue-500 border border-white">
                               <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center shadow">
                                 <User size={16} />
                               </div>
                            </div>
                            <div className="pl-6 pt-1">
                               <h4 className="font-bold text-slate-800 text-sm mb-2 mt-1">课题PI审批</h4>
                               <div className="flex bg-white text-blue-600 border border-blue-200 rounded-full px-2 py-1 items-center gap-1.5 text-xs shadow-sm w-max">
                                 <div className="w-3.5 h-3.5 bg-blue-600 rounded-full text-white flex items-center justify-center text-[8px] font-bold">a</div> admin
                               </div>
                            </div>
                          </div>

                          <div className="relative">
                            <div className="absolute -left-[27px] bg-white p-1 rounded-full text-blue-500 border border-white">
                               <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center shadow">
                                 <User size={16} />
                               </div>
                            </div>
                            <div className="pl-6 pt-1">
                               <h4 className="font-bold text-slate-800 text-sm mb-2 mt-1">科教科审批</h4>
                               <div className="flex flex-wrap gap-2">
                                 <div className="flex bg-slate-50 text-slate-500 border border-slate-200 rounded-full px-2 py-1 items-center gap-1.5 text-xs">
                                   <User size={12} className="opacity-70" /> yangliu
                                 </div>
                                 <div className="flex bg-white text-blue-600 border border-blue-200 rounded-full px-2 py-1 items-center gap-1.5 text-xs shadow-sm">
                                   <div className="w-3.5 h-3.5 bg-blue-600 rounded-full text-white flex items-center justify-center text-[8px] font-bold">M</div> MrZhang
                                 </div>
                               </div>
                            </div>
                          </div>

                          <div className="relative">
                            <div className="absolute -left-[27px] bg-white p-1 rounded-full text-blue-500 border border-white">
                               <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center shadow">
                                 <User size={16} />
                               </div>
                            </div>
                            <div className="pl-6 pt-1">
                               <h4 className="font-bold text-slate-800 text-sm mb-2 mt-1">信息科审批</h4>
                               <div className="flex bg-white text-slate-700 border border-slate-200 rounded-full px-2 py-1 items-center gap-1.5 text-xs shadow-sm w-max">
                                 <div className="w-3.5 h-3.5 bg-slate-800 rounded-full text-white flex items-center justify-center text-[8px]"><User size={8} /></div> tianhy
                               </div>
                            </div>
                          </div>
                          
                          <div className="relative">
                            <div className="absolute -left-[27px] bg-white p-1 rounded-full text-blue-500 border border-white">
                               <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center shadow">
                                 <Power size={16} />
                               </div>
                            </div>
                            <div className="pl-6 pt-3">
                               <h4 className="font-bold text-slate-800 text-sm">结束</h4>
                            </div>
                          </div>

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : approvalView === 'applications' ? (
                <div className="flex-1 flex flex-col overflow-hidden bg-[#f0f4f8]">
                  {/* Header */}
                  <div className="h-[60px] bg-white border-b border-slate-200 px-6 flex items-center justify-between shrink-0 shadow-sm">
                    <div className="flex items-center gap-4">
                       <button className="text-slate-500 hover:text-slate-800 transition-colors" onClick={() => setApprovalView('dashboard')}>
                         <ArrowLeft size={20} />
                       </button>
                      <span className="text-xl font-black text-slate-800">我的申请</span>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-6 flex-1 overflow-y-auto w-full">
                    <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-6">
                      {/* Actions */}
                      <div className="flex items-center gap-4">
                    <button className="px-6 py-2 bg-slate-100 border border-slate-200 rounded-lg text-xs font-black text-slate-700">权限申请</button>
                    <button className="px-6 py-2 bg-blue-600 border border-blue-600 rounded-lg text-xs font-black text-white">导出申请</button>
                  </div>

                  {/* Filter */}
                  <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <div className="flex items-center gap-2">
                       <span className="text-xs font-black text-slate-500">数据来源:</span>
                       <div className="w-48 px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs text-slate-400 flex items-center justify-between">
                         <span>请选择</span>
                         <ChevronDown size={14} />
                       </div>
                    </div>
                    <div className="flex items-center gap-2">
                       <span className="text-xs font-black text-slate-500">申请内容:</span>
                       <div className="w-48 px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs flex items-center gap-2">
                         <Search size={14} className="text-slate-400" />
                         <span className="text-slate-400">请输入</span>
                       </div>
                    </div>
                    <div className="flex items-center gap-2">
                       <span className="text-xs font-black text-slate-500">申请时间:</span>
                       <div className="w-64 px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs text-slate-400 flex items-center gap-2">
                         <Calendar size={14} />
                         <span>开始时间 - 结束时间</span>
                       </div>
                    </div>
                    <button className="px-6 py-2 bg-white border border-slate-200 rounded-lg text-xs font-black text-slate-700 ml-auto">重置</button>
                    <button className="px-6 py-2 bg-blue-600 border border-blue-600 rounded-lg text-xs font-black text-white">查询</button>
                  </div>

                  {/* Table */}
                  <table className="w-full text-xs text-left">
                    <thead className="bg-[#f8f9fb] border-b border-slate-200">
                      <tr>
                        <th className="px-4 py-3 font-black text-slate-500">序号</th>
                        <th className="px-4 py-3 font-black text-slate-500">科研库</th>
                        <th className="px-4 py-3 font-black text-slate-500">来源</th>
                        <th className="px-4 py-3 font-black text-slate-500">数据集名称</th>
                        <th className="px-4 py-3 font-black text-slate-500">数据量</th>
                        <th className="px-4 py-3 font-black text-slate-500">申请科室</th>
                        <th className="px-4 py-3 font-black text-slate-500">申请人</th>
                        <th className="px-4 py-3 font-black text-slate-500">申请时间</th>
                        <th className="px-4 py-3 font-black text-slate-500">当前审批节点</th>
                        <th className="px-4 py-3 font-black text-slate-500">审批状态</th>
                        <th className="px-4 py-3 font-black text-slate-500">审批意见</th>
                        <th className="px-4 py-3 font-black text-slate-500">操作</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {[
                        { id: 1,库: '通用科研库', 来源: '快速检索', 数据集: 1, 量: '196793份病历, 2位...', 科室: '开发专用3-...', 人: 'test_A', 时间: '2026-05-12 14:33', 节点: '-', 状态: '审批通过', 意见: 1 },
                        { id: 2,库: '通用科研库', 来源: '患者收藏', 数据集: '测试20260402...', 量: '10份病历, 0位患者', 科室: '开发专用3-...', 人: 'test_A', 时间: '2026-04-02 14:52', 节点: '-', 状态: '已撤销', 意见: '-' },
                        { id: 3,库: '通用科研库', 来源: '科研检索', 数据集: 1, 量: '10份病历, 3位患者', 科室: '开发专用3-...', 人: 'test_A', 时间: '2026-03-30 17:23', 节点: '科室主任审核', 状态: '审批中', 意见: '-' },
                        { id: 4,库: '通用科研库', 来源: '患者列表', 数据集: 1, 量: '16份病历, 3位患者', 科室: '开发专用3-...', 人: 'test_A', 时间: '2026-03-11 15:46', 节点: '管理员审核', 状态: '待审批', 意见: '-' },
                        { id: 5,库: '通用科研库', 来源: '快速检索', 数据集: 1, 量: '50份病历, 10位患者', 科室: '开发专用3-...', 人: 'test_A', 时间: '2026-02-15 09:20', 节点: '-', 状态: '审批通过', 意见: '-' },
                      ].map(row => (
                      <tr key={row.id}>
                        <td className="px-4 py-3 border-r border-slate-50">{row.id}</td>
                        <td className="px-4 py-3 border-r border-slate-50">{row.库}</td>
                        <td className="px-4 py-3 border-r border-slate-50">{row.来源}</td>
                        <td className="px-4 py-3 border-r border-slate-50">{row.数据集}</td>
                        <td className="px-4 py-3 border-r border-slate-50">{row.量}</td>
                        <td className="px-4 py-3 border-r border-slate-50">{row.科室}</td>
                        <td className="px-4 py-3 border-r border-slate-50">{row.人}</td>
                        <td className="px-4 py-3 border-r border-slate-50">{row.时间}</td>
                        <td className="px-4 py-3 border-r border-slate-50">{row.节点}</td>
                        <td className={`px-4 py-3 border-r border-slate-50 ${row.状态 === '已撤销' ? 'text-slate-400' : (row.状态 === '待审批' || row.状态 === '审批中' ? 'text-orange-500' : 'text-blue-600')}`}>{row.状态}</td>
                        <td className="px-4 py-3 border-r border-slate-50">{row.意见}</td>
                        <td className="px-4 py-3">
                          <button 
                            className="text-blue-600 font-bold mr-3"
                            onClick={() => setSelectedApprovalApplication({ id: row.id, name: row.数据集.toString().replace('...', '001') })}
                          >
                            申请详情
                          </button>
                          <button className="text-slate-400 font-bold">撤销</button>
                        </td>
                      </tr>
                      ))}
                    </tbody>
                  </table>
                  
                  {/* Pagination */}
                  <div className="flex justify-end gap-2 text-xs font-bold text-slate-500 items-center pt-4">
                    <span>共1页, 4条</span>
                    <span>每页</span>
                    <div className="px-2 py-1 border rounded">50</div>
                    <span>条</span>
                    <div className="w-6 h-6 flex items-center justify-center border rounded">&lt;</div>
                    <div className="w-6 h-6 flex items-center justify-center border rounded bg-blue-600 text-white">1</div>
                    <div className="w-6 h-6 flex items-center justify-center border rounded">&gt;</div>
                  </div>
                  </div>
                </div>
              </div>
              ) : approvalView === 'approvals' ? (
                <div className="flex-1 flex flex-col overflow-hidden bg-[#f0f4f8]">
                    {/* Header */}
                    <div className="h-[60px] bg-white border-b border-slate-200 px-6 flex items-center shrink-0 shadow-sm gap-4">
                        <button className="text-slate-500 hover:text-slate-800 transition-colors" onClick={() => setApprovalView('dashboard')}>
                            <ArrowLeft size={20} />
                        </button>
                        <span className="text-xl font-black text-slate-800">我的审批</span>
                    </div>

                    <div className="flex-1 flex flex-col w-full h-full p-6 overflow-hidden max-w-[1600px] mx-auto">
                        <div className="bg-white rounded border border-slate-200 shadow-sm flex flex-col h-full overflow-hidden">
                            {/* Tabs */}
                            <div className="flex px-4 pt-4 border-b border-slate-200 gap-2 shrink-0 relative bg-slate-50/50">
                                <button
                                    onClick={() => setApprovalTab('permission')}
                                    className={`px-6 py-2.5 text-sm font-bold rounded-t-lg transition-colors ${approvalTab === 'permission' ? 'bg-blue-600 text-white shadow-sm' : 'bg-white text-slate-600 border border-slate-200 border-b-0 hover:bg-slate-50'}`}
                                >
                                    权限审批
                                </button>
                                <button
                                    onClick={() => setApprovalTab('export')}
                                    className={`px-6 py-2.5 text-sm font-bold rounded-t-lg transition-colors ${approvalTab === 'export' ? 'bg-blue-600 text-white shadow-sm' : 'bg-white text-slate-600 border border-slate-200 border-b-0 hover:bg-slate-50'}`}
                                >
                                    导出审批
                                </button>
                                <div className="absolute bottom-0 left-0 right-0 h-px bg-slate-200"></div>
                            </div>
                            
                            {/* Filters */}
                            <div className="p-4 border-b border-slate-200 flex items-center gap-4 shrink-0 flex-wrap">
                                <div className="flex items-center gap-2">
                                    <span className="text-xs text-slate-600 font-bold">数据来源:</span>
                                    <select className="border border-slate-200 rounded px-2 py-1.5 text-xs text-slate-700 w-32 outline-none hover:border-slate-300 transition-colors">
                                        <option>请选择</option>
                                    </select>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs text-slate-600 font-bold">审批状态:</span>
                                    <select className="border border-slate-200 rounded px-2 py-1.5 text-xs text-slate-700 w-32 outline-none hover:border-slate-300 transition-colors">
                                        <option>请选择</option>
                                    </select>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs text-slate-600 font-bold">申请时间:</span>
                                    <div className="border border-slate-200 rounded px-3 py-1.5 text-xs text-slate-400 flex items-center gap-2 w-48 bg-white hover:border-slate-300 transition-colors cursor-pointer">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                                        开始时间 - 结束时间
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 flex-1 min-w-[200px]">
                                    <span className="text-xs text-slate-600 font-bold whitespace-nowrap">关键字:</span>
                                    <div className="border border-slate-200 rounded px-3 py-1.5 flex items-center gap-2 flex-1 bg-white relative hover:border-slate-300 transition-colors focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
                                        <svg className="text-slate-400" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                                        <input type="text" placeholder="检索申请人、科室..." className="text-xs w-full outline-none bg-transparent placeholder-slate-400" />
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 ml-auto shrink-0">
                                    <button className="px-5 py-1.5 border border-slate-300 rounded text-xs font-bold text-slate-700 flex items-center gap-1.5 hover:bg-slate-50 transition-colors">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path></svg>
                                        <span className="translate-y-px">重置</span>
                                    </button>
                                    <button className="px-5 py-1.5 bg-blue-600 text-white rounded text-xs font-bold hover:bg-blue-700 transition-colors shadow-sm">
                                        查询
                                    </button>
                                </div>
                            </div>
                            
                            {/* Table */}
                            <div className="flex-1 overflow-auto bg-white relative">
                                <table className="w-full text-xs text-left min-w-[1200px] border-collapse">
                                    <thead className="bg-[#fafbfc] border-b border-slate-200 sticky top-0 z-10 shadow-sm">
                                        <tr>
                                            <th className="px-4 py-3.5 font-bold text-slate-700 w-12 text-center bg-[#fafbfc]">序号</th>
                                            <th className="px-4 py-3.5 font-bold text-slate-700 bg-[#fafbfc]">科研库</th>
                                            <th className="px-4 py-3.5 font-bold text-slate-700 bg-[#fafbfc]">来源</th>
                                            <th className="px-4 py-3.5 font-bold text-slate-700 w-32 truncate bg-[#fafbfc]">数据集名称</th>
                                            <th className="px-4 py-3.5 font-bold text-slate-700 w-48 bg-[#fafbfc]">数据量</th>
                                            <th className="px-4 py-3.5 font-bold text-slate-700 bg-[#fafbfc]">申请科室</th>
                                            <th className="px-4 py-3.5 font-bold text-slate-700 bg-[#fafbfc]">申请人</th>
                                            <th className="px-4 py-3.5 font-bold text-slate-700 bg-[#fafbfc]">申请时间</th>
                                            <th className="px-4 py-3.5 font-bold text-slate-700 bg-[#fafbfc]">审批状态</th>
                                            <th className="px-4 py-3.5 font-bold text-slate-700 bg-[#fafbfc]">当前节点</th>
                                            <th className="px-4 py-3.5 font-bold text-slate-700 bg-[#fafbfc]">审批意见</th>
                                            <th className="px-4 py-3.5 font-bold text-slate-700 bg-[#fafbfc]">审批时间</th>
                                            <th className="px-4 py-3.5 font-bold text-slate-700 bg-[#fafbfc]">操作</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 bg-white">
                                        {[
                                          {id: 1, db: '通用科研库', source: '患者收藏', name: '2', amount: '54份病历, 4位患者', dept: '医院管理平台级科室', applicant: 'test_B', time: '2026-05-21 17:01', status: '待审批', node: '部门主管审批', opinion: '-', actionTime: '-', actions: ['审批详情', '审批']},
                                          {id: 2, db: '通用科研库', source: '快速检索', name: 'test', amount: '118800份病历, 11409位患者', dept: '开发专用1级(专科科室)', applicant: '吴汝芮', time: '2026-05-21 09:23', status: '审批通过', node: '流程结束', opinion: '-', actionTime: '2026-05-21 09:25:02', actions: ['审批详情']},
                                          {id: 3, db: '通用科研库', source: '患者收藏', name: '套餐导出', amount: '4份病历, 4位患者', dept: '开发专用1级(专科科室)', applicant: '吴汝芮', time: '2026-05-15 16:38', status: '审批通过', node: '流程结束', opinion: '-', actionTime: '2026-05-15 16:40:14', actions: ['审批详情']},
                                          {id: 4, db: '通用科研库', source: '快速检索', name: '测试', amount: '118800份病历, 11409位患者', dept: '开发专用1级(专科科室)', applicant: '吴汝芮', time: '2026-05-15 14:11', status: '审批中', node: '样本主管预审', opinion: '-', actionTime: '-', actions: ['审批详情']},
                                          {id: 5, db: '通用科研库', source: '科研检索', name: '1', amount: '1份病历, 1位患者', dept: '开发专用1级(专科科室)', applicant: '柳结华', time: '2026-05-14 10:17', status: '待审批', node: '部门主管审批', opinion: '-', actionTime: '-', actions: ['审批详情', '审批']},
                                          {id: 6, db: '通用科研库', source: '患者收藏', name: '测试测试测试', amount: '1份病历, 1位患者', dept: '开发专用1级(专科科室)', applicant: '柳结华', time: '2026-05-13 09:44', status: '待审批', node: '部门主管审批', opinion: '-', actionTime: '-', actions: ['审批详情', '审批']},
                                          {id: 7, db: '通用科研库', source: '患者收藏', name: '测试', amount: '1份病历, 1位患者', dept: '开发专用1级(专科科室)', applicant: '柳结华', time: '2026-05-13 09:44', status: '待审批', node: '部门主管审批', opinion: '-', actionTime: '-', actions: ['审批详情', '审批']},
                                          {id: 8, db: '通用科研库', source: '快速检索', name: 'yyyyyy', amount: '391534份病历, 3位患者', dept: '全科室', applicant: '高家勇', time: '2026-05-12 14:40', status: '待审批', node: '部门主管审批', opinion: '-', actionTime: '-', actions: ['审批详情', '审批']},
                                          {id: 9, db: '通用科研库', source: '快速检索', name: 'eyyyyy', amount: '10份病历, 3位患者', dept: '全科室', applicant: '高家勇', time: '2026-05-12 14:40', status: '待审批', node: '部门主管审批', opinion: '-', actionTime: '-', actions: ['审批详情', '审批']},
                                          {id: 10, db: '通用科研库', source: '高级检索', name: 'fff', amount: '10份病历, 10位患者', dept: '全科室', applicant: '高家勇', time: '2026-05-12 14:38', status: '审批通过', node: '流程结束', opinion: '-', actionTime: '2026-05-12 14:38:26', actions: ['审批详情']},
                                          {id: 11, db: '通用科研库', source: '高级检索', name: 'xv', amount: '10份病历, 10位患者', dept: '全科室', applicant: '高家勇', time: '2026-05-12 14:35', status: '审批通过', node: '流程结束', opinion: "a's'd", actionTime: '2026-05-12 14:36:13', actions: ['审批详情']},
                                          {id: 12, db: '通用科研库', source: '快速检索', name: '1', amount: '196793份病历, 2位患者', dept: '开发专用3-2级', applicant: 'test_A', time: '2026-05-12 14:33', status: '审批通过', node: '流程结束', opinion: '1', actionTime: '2026-05-12 14:33:41', actions: ['审批详情']},
                                        ].map((row, i) => (
                                          <tr key={i} className="hover:bg-slate-50/70 transition-colors group">
                                            <td className="px-4 py-4 text-center text-slate-800">{row.id}</td>
                                            <td className="px-4 py-4 text-slate-800 font-bold">{row.db}</td>
                                            <td className="px-4 py-4 text-slate-800 font-bold">{row.source}</td>
                                            <td className="px-4 py-4 text-slate-800 truncate max-w-[120px]" title={row.name}>{row.name}</td>
                                            <td className="px-4 py-4 text-slate-600">{row.amount}</td>
                                            <td className="px-4 py-4 text-slate-800 font-medium">{row.dept}</td>
                                            <td className="px-4 py-4 text-slate-800 font-bold">{row.applicant}</td>
                                            <td className="px-4 py-4 text-slate-600 whitespace-pre-wrap font-mono relative">
                                                <div className="absolute top-1/2 -translate-y-1/2">
                                                    <div>{row.time.split(' ')[0]}</div>
                                                    <div>{row.time.split(' ')[1]}</div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 text-slate-800 font-medium">{row.status}</td>
                                            <td className="px-4 py-4 text-slate-800 font-medium">{row.node}</td>
                                            <td className="px-4 py-4 text-slate-600">{row.opinion}</td>
                                            <td className="px-4 py-4 text-slate-600 whitespace-pre-wrap font-mono relative">
                                                {row.actionTime !== '-' ? (
                                                <div className="absolute top-1/2 -translate-y-1/2">
                                                    <div>{row.actionTime.split(' ')[0]}</div>
                                                    <div>{row.actionTime.split(' ')[1]}</div>
                                                </div>
                                                ) : '-'}
                                            </td>
                                            <td className="px-4 py-4">
                                                <div className="flex items-center gap-3">
                                                    <button 
                                                        className="text-blue-600 font-bold hover:text-blue-700 transition-colors"
                                                        onClick={() => setSelectedApprovalApplication({ id: row.id, name: row.name })}
                                                    >
                                                        审批详情
                                                    </button>
                                                    {row.actions.includes('审批') ? (
                                                        <button 
                                                            className="text-blue-600 font-bold hover:text-blue-700 transition-colors"
                                                            onClick={row.status === '待审批' ? () => {
                                                                setSelectedApprovalApplication({ id: row.id, name: row.name });
                                                            } : undefined}
                                                        >审批</button>
                                                    ) : (
                                                        <span className="text-slate-300 font-bold cursor-not-allowed">审批</span>
                                                    )}
                                                </div>
                                            </td>
                                          </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            
                            {/* Pagination Bottom */}
                            <div className="p-4 border-t border-slate-200 bg-white flex items-center justify-between shrink-0">
                                <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                                    <span>共1页, 12条 每页</span>
                                    <div className="relative">
                                        <select className="border border-slate-200 rounded px-2 py-1 pr-6 font-mono outline-none appearance-none bg-transparent relative z-10 w-14">
                                            <option>50</option>
                                        </select>
                                        <svg className="absolute right-1.5 top-1.5 text-slate-400 z-0 pointer-events-none" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                                    </div>
                                    <span>条</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button className="w-7 h-7 flex items-center justify-center border border-slate-200 rounded text-slate-400 hover:bg-slate-50 transition-colors bg-white">&lt;</button>
                                    <button className="w-7 h-7 flex items-center justify-center border-none rounded bg-blue-600 text-white font-bold shadow-sm">1</button>
                                    <button className="w-7 h-7 flex items-center justify-center border border-slate-200 rounded text-slate-400 hover:bg-slate-50 transition-colors bg-white">&gt;</button>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
              ) : null}
            </motion.div>
          )}

          {activePage === 'research-search-result' && (
            <motion.div 
              key="research-search-result"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col bg-[#f5f8ff] overflow-hidden"
            >
              {/* Top Navigation Bar */}
              <div className="h-[52px] bg-white border-b px-6 flex items-center justify-between shrink-0 z-20">
                <div className="flex items-center gap-[52px] h-full">
                  <button 
                    onClick={() => setActivePage('search')}
                    className="flex items-center gap-2 text-slate-800 font-bold"
                  >
                    <ArrowLeft size={18} />
                    <span className="text-base font-black">检索结果</span>
                  </button>
                  <div className="flex h-full gap-10">
                    {[
                      { label: '检索结果', id: 'results' },
                      { label: '检索概览', id: 'overview' },
                      { label: '结果分析', id: 'analysis' },
                    ].map((tab) => (
                      <button 
                        key={tab.id}
                        onClick={() => setResearchSubTab(tab.id as any)}
                        className={`h-full relative px-1 text-[13px] font-black transition-colors ${
                          researchSubTab === tab.id
                            ? 'text-blue-600 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[3px] after:bg-blue-600' 
                            : 'text-slate-400 hover:text-slate-600'
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-4 text-[11px] text-slate-400 font-medium">
                   <div className="flex items-center gap-1">
                      <span>符合搜索条件共</span>
                      <span className="text-blue-500 font-bold">194</span>
                      <span>份病历，占总病历数</span>
                      <span className="text-blue-500 font-bold">100 %</span>
                   </div>
                   <span className="text-slate-200 ml-1 mr-1">；</span>
                   <div className="flex items-center gap-1">
                      <span>共</span>
                      <span className="text-blue-500 font-bold">99</span>
                      <span>个患者，占患者总数</span>
                      <span className="text-blue-500 font-bold">100 %</span>
                   </div>
                   <button className="flex items-center gap-1.5 text-blue-500 font-bold ml-6 group">
                      <SearchIcon size={14} className="group-hover:scale-110 transition-transform" /> 
                      <span className="hover:underline">查看检索条件</span>
                   </button>
                </div>
              </div>

              <div className="flex-1 flex overflow-hidden">
                {/* Left Side: Filter Sidebar */}
                <div className="w-[180px] bg-white border-r border-slate-100 flex flex-col shrink-0 overflow-y-auto dataset-scroll">
                   {[
                     '数据来源', '就诊年龄', '性别', '病历类型', '诊断名称', 
                     '药品名称', '检查项目名称', '检验项目名称', '手术名称'
                   ].map((label) => {
                     const isExpanded = expandedFilters.includes(label);
                     return (
                       <div key={label} className="border-b border-slate-50">
                          <div 
                             onClick={() => {
                                setExpandedFilters(prev => 
                                   prev.includes(label) ? prev.filter(f => f !== label) : [...prev, label]
                                );
                             }}
                             className="py-2.5 px-4 flex items-center justify-between cursor-pointer hover:bg-slate-50 group"
                          >
                             <span className="text-[11px] font-bold text-slate-700 group-hover:text-blue-600 transition-colors uppercase tracking-wider">{label}</span>
                             <span className="text-slate-300 group-hover:text-blue-400 transition-colors">
                                {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                             </span>
                          </div>
                          {isExpanded && (
                            <div className="px-4 pb-4 space-y-2.5">
                               <div className="relative">
                                  <SearchIcon size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                                  <input 
                                    type="text" 
                                    placeholder="请输入关键字进行检索" 
                                    className="w-full pl-8 pr-3 py-1 bg-slate-50 border border-slate-100 rounded text-[10px] outline-none focus:border-blue-200 transition-all" 
                                  />
                               </div>
                               <div className="space-y-2 max-h-[220px] overflow-y-auto dataset-scroll pr-1">
                                  {(label === '诊断名称' ? [
                                    { label: '肺炎', count: 18368 },
                                    { label: '上呼吸道感染', count: 16245 },
                                    { label: '支气管炎', count: 12450 },
                                    { label: '冠心病', count: 10234 },
                                    { label: '高血压', count: 9845 },
                                    { label: '糖尿病', count: 8752 },
                                  ] : label === '性别' ? [
                                    { label: '男', count: 102450 },
                                    { label: '女', count: 91084 },
                                    { label: '未知', count: 8 },
                                  ] : label === '数据来源' ? [
                                    { label: '门诊病历', count: 156245 },
                                    { label: '住院病历', count: 32410 },
                                    { label: '急诊病历', count: 2887 },
                                  ] : label === '检查项目名称' ? [
                                    { label: '胸部CT', count: 12540 },
                                    { label: '心电图', count: 10234 },
                                    { label: 'B超', count: 9845 },
                                    { label: '核磁共振', count: 4567 },
                                  ] : [
                                    { label: '示例选项 A', count: 1200 },
                                    { label: '示例选项 B', count: 800 },
                                  ]).map((item) => (
                                    <div key={item.label} className="flex items-center justify-between group cursor-pointer">
                                       <div className="flex items-center gap-2">
                                          <input type="checkbox" className="w-3 h-3 border-slate-200 rounded text-blue-600 focus:ring-0" />
                                          <span className="text-[10px] text-slate-600 group-hover:text-blue-600 truncate max-w-[80px] font-medium">{item.label}</span>
                                       </div>
                                       <span className="text-[9px] text-slate-300 group-hover:text-slate-400">{item.count}</span>
                                    </div>
                                  ))}
                               </div>
                            </div>
                          )}
                       </div>
                     )
                   })}
                </div>

                {/* Right Side: Tab Content */}
                <div className="flex-1 flex flex-col overflow-hidden">
                  {researchSubTab === 'results' && (
                    <>
                      {/* Sub Tabs for Results Grouping */}
                      {enableControlMatch && (
                        <div className="bg-white border-b border-slate-100 flex px-6 items-end shrink-0 gap-4 pt-2">
                          <button 
                            onClick={() => setResultsGroupTab('case')}
                            className={`px-6 py-3 text-[13px] font-bold border-b-2 flex flex-col items-start gap-1 transition-all ${resultsGroupTab === 'case' ? 'border-blue-600 text-blue-600 bg-blue-50/30 rounded-t-lg' : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50 rounded-t-lg'}`}
                          >
                             <div className="flex items-center gap-2">
                                <Shield size={14} />
                                <span>病例组 (Case)</span>
                                <span className={`ml-2 px-1.5 py-0.5 rounded-full text-[10px] ${resultsGroupTab === 'case' ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-500'}`}>194</span>
                             </div>
                             <span className="text-[10px] font-normal text-slate-400">符合检索条件的干预/源定患者</span>
                          </button>
                          <button 
                            onClick={() => setResultsGroupTab('control')}
                            className={`px-6 py-3 text-[13px] font-bold border-b-2 flex flex-col items-start gap-1 transition-all ${resultsGroupTab === 'control' ? 'border-emerald-600 text-emerald-600 bg-emerald-50/30 rounded-t-lg' : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50 rounded-t-lg'}`}
                          >
                             <div className="flex items-center gap-2">
                                <Users size={14} />
                                <span>对照组 (Control)</span>
                                <span className={`ml-2 px-1.5 py-0.5 rounded-full text-[10px] ${resultsGroupTab === 'control' ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-500'}`}>194</span>
                             </div>
                             <span className="text-[10px] font-normal text-slate-400">基于设定的匹配规则(PSM等)选出的对照患者</span>
                          </button>
                        </div>
                      )}

                      {/* Action Bar */}
                      <div className="h-12 bg-slate-50/50 border-b px-6 flex items-center justify-between shrink-0 hover:bg-slate-50 transition-colors">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 text-[11px] text-slate-500">
                               <input type="checkbox" className="w-[14px] h-[14px] border-slate-300 rounded-[2px] text-blue-600 focus:ring-0 cursor-pointer" />
                               <span className="cursor-pointer hover:text-slate-700">全选本页</span>
                            </div>
                            <div className="h-4 w-[1px] bg-slate-200" />
                            <div className="text-[11px] text-slate-500 font-medium whitespace-nowrap">
                               当前已选择 <span className="text-blue-600 font-black px-1 text-xs">0</span> 份病历
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex bg-white p-0.5 rounded border border-slate-200 shadow-sm">
                               <button className="p-1 px-2 text-white bg-blue-600 rounded shadow-sm"><Grid size={14} /></button>
                               <button className="p-1 px-2 text-slate-400 hover:text-slate-600 rounded transition-all"><List size={14} /></button>
                            </div>
                            <div className="h-4 w-[1px] bg-slate-200" />
                            <div className="flex items-center gap-2">
                                <button
                                  onClick={() => setResearchSubTab('analysis')}
                                  className="flex items-center gap-1.5 bg-indigo-50 text-indigo-600 border border-indigo-200 px-4 py-1.5 rounded-[4px] text-[11px] font-bold hover:bg-indigo-100 transition-all shadow-sm"
                                >
                                  <BarChart3 size={14} strokeWidth={2.5} /> 统计分析
                                </button>
                                <button 
                                  onClick={() => setIsAddFavoriteModalOpen(true)}
                                  className="flex items-center gap-1.5 bg-white text-slate-600 border border-slate-200 px-3 py-1.5 rounded-[4px] text-[11px] font-medium hover:bg-slate-50 hover:text-blue-600 transition-all shadow-sm"
                                >
                                  <Star size={13} /> 设为患者收藏
                                </button>
                                <button 
                                  onClick={() => setIsAddToProjectModalOpen(true)}
                                  className="flex items-center gap-1.5 bg-blue-600 text-white px-4 py-1.5 rounded-[4px] text-[11px] font-bold hover:bg-blue-700 shadow-sm shadow-blue-600/20 active:scale-95 transition-all"
                                >
                                  <Plus size={14} strokeWidth={3} /> 加入科研项目
                                </button>
                            </div>
                        </div>
                      </div>

                      <div className="flex-1 overflow-y-auto dataset-scroll bg-white">
                        {(resultsGroupTab === 'case' ? [
                          { name: '裴**', id: '0000853388', type: '门诊', age: '55岁', date: '2024-06-19', diag: '食管癌', dept: '消化内科', typeColor: 'text-blue-500 border-blue-200 bg-blue-50/30' },
                          { name: '叶**', id: '0000853387', type: '门诊', age: '54岁', date: '2024-06-18', diag: '食管癌', dept: '消化内科', typeColor: 'text-blue-500 border-blue-200 bg-blue-50/30' },
                          { name: '苏**', id: '0000853386', type: '住院', age: '53岁', date: '2024-06-17', diag: '食管癌', dept: '消化内科', typeColor: 'text-emerald-500 border-emerald-200 bg-emerald-50/30' },
                          { name: '温**', id: '0000853385', type: '住院', age: '52岁', date: '2024-06-16', diag: '食管癌', dept: '消化内科', typeColor: 'text-emerald-500 border-emerald-200 bg-emerald-50/30' },
                          { name: '沈**', id: '0000853384', type: '门诊', age: '51岁', date: '2024-06-15', diag: '食管癌', dept: '胸外科', typeColor: 'text-blue-500 border-blue-200 bg-blue-50/30' },
                          { name: '江**', id: '0000853383', type: '住院', age: '50岁', date: '2024-06-14', diag: '食管癌', dept: '消化内科', typeColor: 'text-emerald-500 border-emerald-200 bg-emerald-50/30' },
                        ] : [
                          { name: '张**', id: '0000862101', type: '住院', age: '56岁', date: '2024-06-20', diag: '食管癌', dept: '胸外科', typeColor: 'text-emerald-500 border-emerald-200 bg-emerald-50/30', matchReason: '精准匹配; 无新辅助' },
                          { name: '王**', id: '0000862102', type: '住院', age: '53岁', date: '2024-06-21', diag: '食管癌', dept: '胸外科', typeColor: 'text-emerald-500 border-emerald-200 bg-emerald-50/30', matchReason: '精准匹配; 无新辅助' },
                          { name: '李**', id: '0000862103', type: '住院', age: '52岁', date: '2024-06-22', diag: '食管癌', dept: '胸外科', typeColor: 'text-emerald-500 border-emerald-200 bg-emerald-50/30', matchReason: '精准匹配; 无新辅助' },
                          { name: '赵**', id: '0000862104', type: '门诊', age: '49岁', date: '2024-06-11', diag: '食管癌', dept: '胸外科', typeColor: 'text-blue-500 border-blue-200 bg-blue-50/30', matchReason: '精准匹配; 无新辅助' },
                          { name: '周**', id: '0000862105', type: '门诊', age: '51岁', date: '2024-06-08', diag: '食管癌', dept: '胸外科', typeColor: 'text-blue-500 border-blue-200 bg-blue-50/30', matchReason: '精准匹配; 无新辅助' },
                          { name: '钱**', id: '0000862106', type: '住院', age: '50岁', date: '2024-06-07', diag: '食管癌', dept: '胸外科', typeColor: 'text-emerald-500 border-emerald-200 bg-emerald-50/30', matchReason: '精准匹配; 无新辅助' },
                        ]).map((row, idx) => (
                          <div key={idx} className="bg-white border-b border-slate-50 p-2.5 px-6 flex items-center gap-4 hover:bg-slate-50 transition-colors group relative">
                             <input type="checkbox" className="w-[14px] h-[14px] border-slate-300 rounded-[2px] text-blue-600 focus:ring-0" />
                             <div className="shrink-0 flex items-center gap-2 ml-2 min-w-[70px]">
                                <div className="w-6 h-6 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 group-hover:bg-blue-500 group-hover:text-white transition-all">
                                   <User size={14} />
                                </div>
                                <span className="text-[13px] font-medium text-slate-700">{row.name}</span>
                             </div>
                             
                             <div className="flex-1 flex items-center min-w-0">
                                <span className={`px-1.5 py-0.5 rounded-[2px] text-[10px] font-medium border mr-3 ${row.typeColor}`}>{row.type}</span>
                                <span className="text-[12px] font-mono font-medium text-slate-600 w-[100px]">{row.id}</span>
                                
                                <div className={`flex-1 grid ${resultsGroupTab === 'control' ? 'grid-cols-6' : 'grid-cols-5'} gap-4`}>
                                   <div className="flex items-center gap-1 text-[11px] text-slate-500">
                                      <span className="shrink-0 text-slate-400">就诊年龄:</span>
                                      <span className="font-medium text-slate-700">{row.age}</span>
                                   </div>
                                   <div className="flex items-center gap-1 text-[11px] text-slate-500 whitespace-nowrap">
                                      <span className="shrink-0 text-slate-400">就诊日期:</span>
                                      <span className="font-medium text-slate-700">{row.date}</span>
                                   </div>
                                   <div className="flex items-center gap-1 text-[11px] text-slate-500">
                                      <span className="shrink-0 text-slate-400">就诊类型:</span>
                                      <span className="font-medium text-slate-700">{row.type}</span>
                                   </div>
                                   <div className="flex items-center gap-1 text-[11px] text-slate-500 truncate">
                                      <span className="shrink-0 text-slate-400">诊断名:</span>
                                      <span className="font-medium text-slate-700 truncate">{row.diag}</span>
                                   </div>
                                   <div className="flex items-center gap-1 text-[11px] text-slate-500 truncate">
                                      <span className="shrink-0 text-slate-400">就诊科室:</span>
                                      <span className="font-medium text-slate-700 truncate">{row.dept}</span>
                                   </div>
                                   {'matchReason' in row && row.matchReason && (
                                     <div className="flex items-center gap-1 text-[11px] text-emerald-600 truncate bg-emerald-50 px-2 rounded-full border border-emerald-100">
                                        <span className="font-medium truncate">{row.matchReason as string}</span>
                                     </div>
                                   )}
                                </div>

                                <div className="flex items-center gap-4 shrink-0 px-2 ml-4">
                                  <button className="text-[11px] text-blue-500 font-medium hover:underline">展开更多</button>
                                  <button className="text-[11px] text-blue-500 font-medium hover:underline">查看详情 &gt;</button>
                                </div>
                             </div>
                          </div>
                        ))}
                        
                        {/* Pagination Bar */}
                        <div className="flex items-center justify-end gap-6 pt-10 pb-6 px-10">
                           <div className="flex items-center gap-4 text-[11px] text-slate-500">
                              <span>共20页，194条</span>
                              <div className="flex items-center gap-1">
                                 <span>每页</span>
                                 <div className="flex items-center gap-1 px-1.5 py-0.5 border border-slate-200 rounded text-slate-700 cursor-pointer hover:bg-slate-50 group">
                                    <span className="font-bold">10</span>
                                    <ChevronDown size={12} className="text-slate-300 group-hover:text-slate-500" />
                                 </div>
                                 <span>条</span>
                              </div>
                           </div>
                           <div className="flex items-center gap-1">
                              <button className="w-6 h-6 flex items-center justify-center border border-slate-100 rounded text-slate-300 hover:text-blue-500 group transition-colors">
                                 <ChevronLeft size={16} />
                              </button>
                              <button className="w-6 h-6 flex items-center justify-center bg-blue-600 text-white rounded font-medium text-xs">1</button>
                              {[2,3,4,5,6].map(p => (
                                <button key={p} className="w-6 h-6 flex items-center justify-center text-slate-500 text-xs hover:border hover:border-slate-200 rounded">{p}</button>
                              ))}
                              <span className="px-1 text-slate-300 text-[10px]">...</span>
                              <button className="w-6 h-6 flex items-center justify-center text-slate-500 text-xs hover:border hover:border-slate-200 rounded">20</button>
                              <button className="w-6 h-6 flex items-center justify-center border border-slate-100 rounded text-slate-300 hover:text-blue-500 group transition-colors">
                                 <ChevronRight size={16} />
                              </button>
                           </div>
                        </div>
                      </div>
                    </>
                  )}

                    {researchSubTab === 'overview' && (
                      <div className="p-8 space-y-8 max-w-7xl mx-auto">
                         <div className="grid grid-cols-3 gap-6">
                           <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm transition-all hover:shadow-xl hover:shadow-blue-500/5">
                              <div className="flex items-center gap-3 mb-4">
                                 <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                                    <Activity size={20} />
                                 </div>
                                 <h5 className="text-sm font-black text-slate-800">关键指标概览</h5>
                              </div>
                              <div className="space-y-4">
                                 <div className="flex items-center justify-between">
                                    <span className="text-xs text-slate-400 font-bold uppercase tracking-widest">平均年龄</span>
                                    <span className="text-lg font-black text-slate-800">42.5 <span className="text-xs font-normal">岁</span></span>
                                 </div>
                                 <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                    <div className="w-1/2 h-full bg-blue-500 rounded-full" />
                                 </div>
                                 <div className="grid grid-cols-2 gap-4">
                                    <div className="p-3 bg-slate-50 rounded-2xl">
                                       <span className="text-[10px] text-slate-400 font-black block mb-1">男性占比</span>
                                       <span className="text-sm font-black text-slate-700">62.4%</span>
                                    </div>
                                    <div className="p-3 bg-slate-50 rounded-2xl">
                                       <span className="text-[10px] text-slate-400 font-black block mb-1">女性占比</span>
                                       <span className="text-sm font-black text-slate-700">37.6%</span>
                                    </div>
                                 </div>
                              </div>
                           </div>
                           
                           <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm transition-all hover:shadow-xl hover:shadow-blue-500/5 col-span-2">
                             <div className="flex items-center justify-between mb-6">
                                <h5 className="text-sm font-black text-slate-800 flex items-center gap-2">数据质量统计 <Info size={14} className="text-slate-300" /></h5>
                                <div className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">整体填充率: 86.4%</div>
                             </div>
                             <div className="space-y-4">
                                {[
                                  { label: 'ALT (丙氨酸氨基转移酶)', fill: 94.2, valid: 1162, missing: 72 },
                                  { label: 'AST (天门冬氨酸氨基转移酶)', fill: 92.8, valid: 1145, missing: 89 },
                                  { label: 'HBsAg (乙肝表面抗原)', fill: 88.5, valid: 1092, missing: 142 },
                                  { label: 'HCV-RNA (丙肝病毒载量)', fill: 76.1, valid: 939, missing: 295 },
                                ].map((stat, i) => (
                                  <div key={i} className="flex items-center gap-6 group">
                                     <div className="w-48 text-[11px] font-bold text-slate-500 truncate group-hover:text-blue-600 transition-colors">{stat.label}</div>
                                     <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-blue-500 rounded-full transition-all group-hover:bg-blue-600" style={{ width: `${stat.fill}%` }} />
                                     </div>
                                     <div className="flex items-center gap-6 w-56 justify-end">
                                        <div className="flex flex-col items-end">
                                           <span className="text-[9px] text-slate-400 font-bold">有效/缺失</span>
                                           <span className="text-[11px] font-black text-slate-700">{stat.valid} <span className="text-slate-300">/</span> {stat.missing}</span>
                                        </div>
                                        <div className="w-12 text-right">
                                           <span className="text-[11px] font-black text-blue-600">{stat.fill}%</span>
                                        </div>
                                     </div>
                                  </div>
                                ))}
                             </div>
                           </div>
                         </div>

                         {/* Metric Statistics Detail Row */}
                         <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                            <div className="p-6 border-b border-slate-50 flex items-center justify-between">
                               <h5 className="text-sm font-black text-slate-800">变量统计口径详情</h5>
                               <div className="flex gap-4">
                                  <div className="relative">
                                    <SearchIcon size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                    <input type="text" placeholder="搜索变量..." className="pl-9 pr-4 py-1.5 border border-slate-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-blue-100 w-48" />
                                  </div>
                                  <button className="flex items-center gap-1.5 text-xs font-black text-slate-400 hover:text-blue-600 transition-colors">
                                     <Download size={14} /> 导出统计报表
                                  </button>
                               </div>
                            </div>
                            <div className="overflow-x-auto overflow-y-visible">
                               <table className="w-full text-left">
                                  <thead className="bg-slate-50/50 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">
                                     <tr>
                                        <th className="px-6 py-4">变量名称</th>
                                        <th className="px-6 py-4">变量类型</th>
                                        <th className="px-6 py-4">填充率</th>
                                        <th className="px-6 py-4">有效值数量</th>
                                        <th className="px-6 py-4">缺失值数量</th>
                                        <th className="px-6 py-4">最小值</th>
                                        <th className="px-6 py-4">P25</th>
                                        <th className="px-6 py-4">P50 (中位数)</th>
                                        <th className="px-6 py-4">P75</th>
                                        <th className="px-6 py-4">最大值</th>
                                     </tr>
                                  </thead>
                                  <tbody className="text-[11px] font-bold text-slate-600 divide-y divide-slate-50">
                                     {[
                                       { name: 'ALT', type: '数值型', fill: '94.2%', valid: 1162, missing: 72, min: 5, p25: 18, p50: 32, p75: 56, max: 840 },
                                       { name: 'AST', type: '数值型', fill: '92.8%', valid: 1145, missing: 89, min: 8, p25: 22, p50: 38, p75: 64, max: 720 },
                                       { name: '体重', type: '数值型', fill: '90.5%', valid: 1116, missing: 118, min: 42, p25: 58, p50: 68, p75: 78, max: 115 },
                                       { name: '身高', type: '数值型', fill: '90.5%', valid: 1116, missing: 118, min: 145, p25: 162, p50: 170, p75: 176, max: 194 },
                                       { name: 'BMI指数', type: '数值型', fill: '90.0%', valid: 1110, missing: 124, min: 16.2, p25: 21.4, p50: 23.8, p75: 26.2, max: 38.5 },
                                     ].map((row, i) => (
                                       <tr key={i} className="hover:bg-blue-50/30 transition-colors">
                                          <td className="px-6 py-4 text-slate-800 font-black">{row.name}</td>
                                          <td className="px-6 py-4">{row.type}</td>
                                          <td className="px-6 py-4 text-blue-600">{row.fill}</td>
                                          <td className="px-6 py-4">{row.valid}</td>
                                          <td className="px-6 py-4">{row.missing}</td>
                                          <td className="px-6 py-4">{row.min}</td>
                                          <td className="px-6 py-4">{row.p25}</td>
                                          <td className="px-6 py-4">{row.p50}</td>
                                          <td className="px-6 py-4">{row.p75}</td>
                                          <td className="px-6 py-4">{row.max}</td>
                                       </tr>
                                     ))}
                                  </tbody>
                               </table>
                            </div>
                            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-center">
                               <button className="text-[10px] font-black text-slate-400 hover:text-blue-600 flex items-center gap-1 uppercase tracking-widest">查看全部 24 个数值型变量 <ChevronDown size={14} /></button>
                            </div>
                         </div>
                      </div>
                    )}

                    {researchSubTab === 'analysis' && (
                      <div className="flex-1 flex flex-col bg-[#f5f8ff] overflow-y-auto dataset-scroll">
                        {/* Sub Header Bar for Analysis */}
                        <div className="bg-white border-b border-slate-200 px-6 py-2.5 flex items-center justify-between shrink-0 sticky top-0 z-10 shadow-xs">
                          <div className="flex items-center gap-2">
                            <button 
                              onClick={() => setAnalysisSubTab('portrait')}
                              className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${
                                analysisSubTab === 'portrait' 
                                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20' 
                                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                              }`}
                            >
                              人群画像
                            </button>
                            <button 
                              onClick={() => setAnalysisSubTab('metrics')}
                              className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${
                                analysisSubTab === 'metrics' 
                                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20' 
                                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                              }`}
                            >
                              指标探索
                            </button>
                          </div>

                          <div className="flex items-center gap-4">
                            {analysisSubTab === 'portrait' ? (
                              <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                                <span>符合检索条件共</span>
                                <span className="text-blue-600 font-bold">391620</span>
                                <span>份病历，占总病历数</span>
                                <span className="text-blue-600 font-bold">100 %</span>
                                <span className="text-slate-300 mx-1">；</span>
                                <span>共</span>
                                <span className="text-blue-600 font-bold">12707</span>
                                <span>个患者，占患者总数</span>
                                <span className="text-blue-600 font-bold">100 %</span>
                                <button className="ml-3 flex items-center gap-1 text-blue-600 font-bold hover:underline">
                                  <SearchIcon size={12} /> 查看检索条件
                                </button>
                              </div>
                            ) : (
                              <button 
                                onClick={() => setIsAddMetricModalOpen(true)}
                                className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold px-4 py-1.5 rounded-lg text-xs shadow-sm transition-all"
                              >
                                <Plus size={14} strokeWidth={2.5} /> 添加分析指标
                              </button>
                            )}
                          </div>
                        </div>

                        {/* View 1: 人群画像 (Portrait) */}
                        {analysisSubTab === 'portrait' && (
                          <div className="p-6 space-y-6">
                            {/* Top Row: 3 Overview Cards + Settings Card */}
                            <div className="grid grid-cols-12 gap-4">
                              {/* Card 1: 检索条件 */}
                              <div className="col-span-5 bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex flex-col">
                                <div className="text-xs font-bold text-slate-700 mb-2 flex items-center gap-1.5">
                                  <FileText size={15} className="text-blue-600" />
                                  <span>检索条件</span>
                                </div>
                                <div className="flex-1 bg-slate-50/80 border border-slate-100 rounded-xl p-3 text-xs text-slate-600 font-medium space-y-1.5 leading-relaxed overflow-y-auto max-h-[95px] dataset-scroll">
                                  <div>纳入条件1: 院区:全院; 就诊类型:;</div>
                                  <div>纳入条件2: 同一次就诊;</div>
                                  <div>纳入基线事件:</div>
                                  <div>纳入其他条件1:</div>
                                  <div className="text-slate-400">(排除病历)排除条件1: 同一次就诊;</div>
                                </div>
                              </div>

                              {/* Card 2: 病历总数 */}
                              <div className="col-span-3 bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex items-center justify-between">
                                <div className="space-y-1">
                                  <span className="text-xs font-bold text-slate-500">病历总数</span>
                                  <div className="text-2xl font-black text-slate-800 tracking-tight">391,620</div>
                                </div>
                                <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex items-center justify-center text-amber-500 shrink-0">
                                  <Folder size={24} />
                                </div>
                              </div>

                              {/* Card 3: 患者(个) */}
                              <div className="col-span-3 bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex items-center justify-between">
                                <div className="space-y-1">
                                  <span className="text-xs font-bold text-slate-500">患者(个)</span>
                                  <div className="text-2xl font-black text-slate-800 tracking-tight">12,707</div>
                                </div>
                                <div className="w-12 h-12 bg-blue-500/10 border border-blue-500/20 rounded-2xl flex items-center justify-center text-blue-600 shrink-0">
                                  <Users size={24} />
                                </div>
                              </div>

                              {/* Card 4: Settings Button & Decor */}
                              <div className="col-span-1 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-3 shadow-xs flex flex-col items-center justify-between text-white relative overflow-hidden group">
                                <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-white/10 rounded-full blur-xl group-hover:scale-150 transition-transform" />
                                <div className="text-[10px] font-bold text-blue-100 uppercase tracking-wider">设置</div>
                                <button className="w-9 h-9 bg-white/20 hover:bg-white/30 rounded-xl flex items-center justify-center text-white backdrop-blur-xs transition-all relative z-10 active:scale-95">
                                  <Settings size={18} />
                                </button>
                              </div>
                            </div>

                            {/* Middle Row: 3 Charts (病历类型分布 / 性别分布 / 年龄分布) */}
                            <div className="grid grid-cols-3 gap-5">
                              {/* Chart 1: 病历类型分布 */}
                              <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col">
                                <h4 className="text-xs font-bold text-slate-700 mb-3 flex items-center justify-between">
                                  <span>病历类型分布</span>
                                  <Info size={13} className="text-slate-300" />
                                </h4>
                                <div className="h-[210px] relative flex items-center justify-center">
                                  <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                      <Pie
                                        data={[
                                          { name: '门诊', value: 234776, percentage: '59.95%', fill: '#2563eb' },
                                          { name: '住院', value: 97865, percentage: '24.99%', fill: '#06b6d4' },
                                          { name: '急诊', value: 58938, percentage: '15.05%', fill: '#f97316' },
                                          { name: '外院门诊', value: 39, percentage: '0.01%', fill: '#8b5cf6' },
                                          { name: '外院', value: 2, percentage: '<0.01%', fill: '#ec4899' },
                                        ]}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={55}
                                        outerRadius={78}
                                        paddingAngle={3}
                                        dataKey="value"
                                      />
                                      <RechartsTooltip contentStyle={{ fontSize: '12px', borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                                    </PieChart>
                                  </ResponsiveContainer>
                                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                    <span className="text-base font-black text-slate-800">391620</span>
                                    <span className="text-[10px] text-slate-400 font-bold">总数</span>
                                  </div>
                                </div>
                                <div className="flex items-center justify-between text-[10px] text-slate-500 font-medium pt-2 border-t border-slate-100">
                                  <div className="flex items-center gap-3 flex-wrap">
                                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#2563eb]" /> 门诊 (59.95%)</span>
                                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#f97316]" /> 急诊 (15.05%)</span>
                                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#06b6d4]" /> 住院 (24.99%)</span>
                                  </div>
                                  <div className="flex items-center gap-1 text-slate-400 cursor-pointer hover:text-slate-600">
                                    <span>◄</span> <span>1/2</span> <span>►</span>
                                  </div>
                                </div>
                              </div>

                              {/* Chart 2: 性别分布 */}
                              <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col">
                                <h4 className="text-xs font-bold text-slate-700 mb-3 flex items-center justify-between">
                                  <span>性别分布</span>
                                  <Info size={13} className="text-slate-300" />
                                </h4>
                                <div className="h-[210px] relative flex items-center justify-center">
                                  <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                      <Pie
                                        data={[
                                          { name: '男', value: 6388, percentage: '50.27%', fill: '#10b981' },
                                          { name: '女', value: 6319, percentage: '49.73%', fill: '#84cc16' },
                                        ]}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={55}
                                        outerRadius={78}
                                        paddingAngle={4}
                                        dataKey="value"
                                      />
                                      <RechartsTooltip contentStyle={{ fontSize: '12px', borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                                    </PieChart>
                                  </ResponsiveContainer>
                                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                    <span className="text-base font-black text-slate-800">12707</span>
                                    <span className="text-[10px] text-slate-400 font-bold">总数</span>
                                  </div>
                                </div>
                                <div className="flex items-center justify-center gap-6 text-[11px] text-slate-600 font-bold pt-2 border-t border-slate-100">
                                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#10b981]" /> 男 (50.27%)</span>
                                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#84cc16]" /> 女 (49.73%)</span>
                                </div>
                              </div>

                              {/* Chart 3: 年龄分布 / 就诊年龄分布 */}
                              <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col">
                                <h4 className="text-xs font-bold text-slate-700 mb-3 flex items-center justify-between">
                                  <span className="flex items-center gap-1">就诊年龄分布 <Info size={13} className="text-slate-300" /></span>
                                </h4>
                                <div className="h-[210px]">
                                  <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={[
                                      { age: '0-9', count: 120 },
                                      { age: '10-19', count: 280 },
                                      { age: '20-29', count: 2100 },
                                      { age: '30-39', count: 2450 },
                                      { age: '40-49', count: 2300 },
                                      { age: '50-59', count: 2200 },
                                      { age: '60-69', count: 2150 },
                                      { age: '70-79', count: 1800 },
                                      { age: '80-89', count: 980 },
                                      { age: '90-99', count: 210 },
                                      { age: '100及以上', count: 15 }
                                    ]} margin={{ top: 10, right: 5, left: -20, bottom: 0 }}>
                                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                      <XAxis dataKey="age" axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#64748b' }} interval={0} />
                                      <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#64748b' }} />
                                      <RechartsTooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ fontSize: '11px', borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                                      <Bar dataKey="count" name="患者数" fill="#2563eb" radius={[3, 3, 0, 0]} maxBarSize={22} />
                                    </BarChart>
                                  </ResponsiveContainer>
                                </div>
                              </div>
                            </div>

                            {/* Bottom Row: 2 Charts (就诊科室分布 / 就诊时间分布) */}
                            <div className="grid grid-cols-2 gap-5">
                              {/* 就诊科室分布 */}
                              <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col">
                                <h4 className="text-xs font-bold text-slate-700 mb-4 flex items-center justify-between">
                                  <span>就诊科室分布</span>
                                  <Info size={13} className="text-slate-300" />
                                </h4>
                                <div className="h-[220px]">
                                  <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={[
                                      { dept: '消化内科', count: 28500 },
                                      { dept: '胸外科', count: 24200 },
                                      { dept: '肿瘤内科', count: 19800 },
                                      { dept: '普通外科', count: 16500 },
                                      { dept: '急诊科', count: 12400 },
                                      { dept: '心血管内科', count: 9800 },
                                      { dept: '呼吸与危重症', count: 8600 },
                                      { dept: '放射治疗科', count: 7200 }
                                    ]} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                      <XAxis dataKey="dept" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} />
                                      <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} />
                                      <RechartsTooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ fontSize: '11px', borderRadius: '8px', border: 'none' }} />
                                      <Bar dataKey="count" name="就诊人次" fill="#2563eb" radius={[4, 4, 0, 0]} maxBarSize={32} />
                                    </BarChart>
                                  </ResponsiveContainer>
                                </div>
                              </div>

                              {/* 就诊时间分布 */}
                              <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col">
                                <div className="flex items-center justify-between mb-4">
                                  <h4 className="text-xs font-bold text-slate-700 flex items-center gap-1">
                                    <span>就诊时间分布</span>
                                    <Info size={13} className="text-slate-300" />
                                  </h4>
                                  <div className="flex items-center gap-3">
                                    <div className="flex bg-slate-100 p-0.5 rounded-lg border border-slate-200/60 text-[11px] font-bold">
                                      <button 
                                        onClick={() => setAnalysisTimeGranularity('year')}
                                        className={`px-2.5 py-0.5 rounded-md transition-all ${analysisTimeGranularity === 'year' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-500'}`}
                                      >
                                        年
                                      </button>
                                      <button 
                                        onClick={() => setAnalysisTimeGranularity('month')}
                                        className={`px-2.5 py-0.5 rounded-md transition-all ${analysisTimeGranularity === 'month' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-500'}`}
                                      >
                                        月
                                      </button>
                                    </div>
                                    <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-lg text-xs font-medium text-slate-600">
                                      <Calendar size={13} className="text-slate-400" />
                                      <span>2025-09 至 2026-08</span>
                                    </div>
                                  </div>
                                </div>

                                <div className="h-[220px]">
                                  <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={[
                                      { date: '2025-09', count: 12400 },
                                      { date: '2025-10', count: 13800 },
                                      { date: '2025-11', count: 15200 },
                                      { date: '2025-12', count: 14100 },
                                      { date: '2026-01', count: 11900 },
                                      { date: '2026-02', count: 10500 },
                                      { date: '2026-03', count: 16800 },
                                      { date: '2026-04', count: 15900 },
                                      { date: '2026-05', count: 16200 },
                                      { date: '2026-06', count: 17100 },
                                      { date: '2026-07', count: 16500 },
                                      { date: '2026-08', count: 14800 },
                                    ]} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                      <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#64748b' }} />
                                      <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} />
                                      <RechartsTooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ fontSize: '11px', borderRadius: '8px', border: 'none' }} />
                                      <Bar dataKey="count" name="月就诊人次" fill="#2563eb" radius={[4, 4, 0, 0]} maxBarSize={24} />
                                    </BarChart>
                                  </ResponsiveContainer>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* View 2: 指标探索 (Metrics Exploration) */}
                        {analysisSubTab === 'metrics' && (
                          <div className="p-6 space-y-6">
                            {analysisMetricItems.map((metric) => (
                              <div key={metric.id} className="bg-white rounded-2xl border border-slate-200/80 shadow-xs flex overflow-hidden">
                                {/* Left Side: Property Overview Panel */}
                                <div className="w-[320px] bg-slate-50/60 border-r border-slate-100 p-5 flex flex-col justify-between shrink-0">
                                  <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                      <div className="flex items-center gap-2">
                                        <h3 className="text-base font-black text-slate-800">{metric.name}</h3>
                                        <span className="px-2 py-0.5 bg-blue-50 text-blue-600 border border-blue-100 text-[10px] font-bold rounded">
                                          {metric.type}
                                        </span>
                                      </div>
                                      <span className="text-xs font-bold text-emerald-600">
                                        填充率：{metric.fillRate}
                                      </span>
                                    </div>

                                    {/* 2x3 Grid for Summary Metrics */}
                                    <div className="grid grid-cols-2 gap-2 text-xs">
                                      <div className="bg-white p-2.5 rounded-xl border border-slate-200/60 shadow-2xs">
                                        <span className="text-[10px] text-slate-400 font-bold block mb-0.5">有效值数量</span>
                                        <span className="font-bold text-slate-800">{metric.validCount}</span>
                                      </div>
                                      <div className="bg-white p-2.5 rounded-xl border border-slate-200/60 shadow-2xs">
                                        <span className="text-[10px] text-slate-400 font-bold block mb-0.5">缺失值数量</span>
                                        <span className="font-bold text-slate-800">{metric.missingCount}</span>
                                      </div>
                                      <div className="bg-white p-2.5 rounded-xl border border-slate-200/60 shadow-2xs">
                                        <span className="text-[10px] text-slate-400 font-bold block mb-0.5">均值 ± 标准差</span>
                                        <span className="font-bold text-slate-800 truncate block">{metric.meanStd}</span>
                                      </div>
                                      <div className="bg-white p-2.5 rounded-xl border border-slate-200/60 shadow-2xs">
                                        <span className="text-[10px] text-slate-400 font-bold block mb-0.5">中位数</span>
                                        <span className="font-bold text-slate-800">{metric.median}</span>
                                      </div>
                                      <div className="bg-white p-2.5 rounded-xl border border-slate-200/60 shadow-2xs">
                                        <span className="text-[10px] text-slate-400 font-bold block mb-0.5">最小值</span>
                                        <span className="font-bold text-slate-800">{metric.min}</span>
                                      </div>
                                      <div className="bg-white p-2.5 rounded-xl border border-slate-200/60 shadow-2xs">
                                        <span className="text-[10px] text-slate-400 font-bold block mb-0.5">最大值</span>
                                        <span className="font-bold text-slate-800">{metric.max}</span>
                                      </div>
                                    </div>
                                  </div>

                                  <button 
                                    onClick={() => {
                                      setAnalysisMetricItems(prev => prev.filter(item => item.id !== metric.id));
                                    }}
                                    className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-bold rounded-xl transition-colors mt-4 text-center"
                                  >
                                    移除指标
                                  </button>
                                </div>

                                {/* Right Side: Chart or Table View */}
                                <div className="flex-1 p-5 flex flex-col justify-between min-w-0">
                                  <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg border border-slate-200/60">
                                      <button 
                                        onClick={() => {
                                          setAnalysisMetricItems(prev => prev.map(item => item.id === metric.id ? { ...item, viewMode: 'chart' } : item));
                                        }}
                                        className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${metric.viewMode === 'chart' ? 'bg-white text-blue-600 shadow-2xs' : 'text-slate-500'}`}
                                      >
                                        图表
                                      </button>
                                      <button 
                                        onClick={() => {
                                          setAnalysisMetricItems(prev => prev.map(item => item.id === metric.id ? { ...item, viewMode: 'table' } : item));
                                        }}
                                        className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${metric.viewMode === 'table' ? 'bg-white text-blue-600 shadow-2xs' : 'text-slate-500'}`}
                                      >
                                        表格
                                      </button>
                                    </div>

                                    <div className="flex items-center gap-1">
                                      <button className="p-1.5 rounded-lg bg-blue-600 text-white shadow-2xs">
                                        <BarChart3 size={15} />
                                      </button>
                                      <button className="p-1.5 rounded-lg bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors">
                                        <Grid size={15} />
                                      </button>
                                      <button className="p-1.5 rounded-lg bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors">
                                        <Activity size={15} />
                                      </button>
                                    </div>
                                  </div>

                                  {metric.viewMode === 'chart' ? (
                                    <div className="h-[220px] w-full">
                                      <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={metric.chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} />
                                          <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} />
                                          <RechartsTooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ fontSize: '11px', borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                                          <Bar dataKey="value" name="频数/分布" fill="#2563eb" radius={[3, 3, 0, 0]} maxBarSize={32} />
                                        </BarChart>
                                      </ResponsiveContainer>
                                    </div>
                                  ) : (
                                    <div className="overflow-x-auto h-[220px] border border-slate-100 rounded-xl">
                                      <table className="w-full text-left text-xs">
                                        <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-100">
                                          <tr>
                                            <th className="px-4 py-2.5">区间/分组</th>
                                            <th className="px-4 py-2.5">样本数量 (频数)</th>
                                            <th className="px-4 py-2.5">占比 (%)</th>
                                          </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                                          {metric.chartData.map((row, idx) => (
                                            <tr key={idx} className="hover:bg-slate-50">
                                              <td className="px-4 py-2 font-mono">{row.name}</td>
                                              <td className="px-4 py-2 font-mono font-bold">{row.value}</td>
                                              <td className="px-4 py-2 text-blue-600 font-mono">
                                                {((row.value / (metric.chartData.reduce((acc, c) => acc + c.value, 0) || 1)) * 100).toFixed(2)}%
                                              </td>
                                            </tr>
                                          ))}
                                        </tbody>
                                      </table>
                                    </div>
                                  )}
                                </div>
                              </div>
                            ))}

                            {analysisMetricItems.length === 0 && (
                              <div className="p-12 text-center bg-white rounded-2xl border border-dashed border-slate-300">
                                <Activity size={36} className="mx-auto text-slate-300 mb-3" />
                                <h4 className="text-sm font-bold text-slate-700">暂无已选指标</h4>
                                <p className="text-xs text-slate-400 mt-1 mb-4">点击右上角“添加分析指标”按钮选择需要探索分析的连续型或离散型指标</p>
                                <button 
                                  onClick={() => setIsAddMetricModalOpen(true)}
                                  className="px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                  添加分析指标
                                </button>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

          {activePage === 'favorites' && (
            <motion.div 
              key="favorites"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex-1 flex flex-col bg-[#f0f2f5] min-h-screen"
            >
              {!selectedFavoriteItem ? (
                <>
                  {/* Patient Favorites Header Navigation Bar */}
                  <div className="bg-white px-6 py-3 flex items-center justify-between border-b border-slate-200 shadow-xs">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center bg-slate-100 p-1 rounded-xl gap-1 border border-slate-200/80">
                        <button 
                          onClick={() => {
                            setSelectedFavoriteItem(null);
                            setFavoriteTab('list');
                          }}
                          className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                            favoriteTab === 'list' 
                              ? 'bg-white text-blue-600 shadow-xs font-black' 
                              : 'text-slate-600 hover:text-slate-900'
                          }`}
                        >
                          <FolderHeart size={15} />
                          <span>患者收藏</span>
                        </button>
                        <button 
                          onClick={() => {
                            setSelectedFavoriteItem(null);
                            setFavoriteTab('venn');
                          }}
                          className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                            favoriteTab === 'venn' 
                              ? 'bg-white text-blue-600 shadow-xs font-black' 
                              : 'text-slate-600 hover:text-slate-900'
                          }`}
                        >
                          <LucidePieChart size={15} />
                          <span>韦恩图</span>
                        </button>
                        <button 
                          onClick={() => {
                            setSelectedFavoriteItem(null);
                            setFavoriteTab('insight');
                          }}
                          className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                            favoriteTab === 'insight' 
                              ? 'bg-white text-blue-600 shadow-xs font-black' 
                              : 'text-slate-600 hover:text-slate-900'
                          }`}
                        >
                          <BarChart3 size={15} />
                          <span>数据洞察</span>
                        </button>
                      </div>

                      {favoriteTab === 'list' && (
                        <div className="flex items-center gap-2">
                          <input 
                            type="text" 
                            placeholder="请输入关键词搜索收藏项目" 
                            className="px-3.5 py-1.5 bg-white border border-slate-300 rounded-lg text-xs focus:outline-none focus:border-blue-500 w-60 shadow-xs"
                          />
                          <button className="px-4 py-1.5 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-lg text-xs font-bold text-slate-700 transition-colors">
                            搜索
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => setIsAddFavoriteModalOpen(true)}
                        className="px-4 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-bold flex items-center gap-1 hover:bg-blue-700 transition-colors shadow-sm"
                      >
                        <Plus size={15} className="text-white" /> 新增患者收藏
                      </button>
                    </div>
                  </div>

                  {/* TAB 1: Patient Favorites Cards Grid */}
                  {favoriteTab === 'list' && (
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {FAVORITE_PROJECTS.map((project) => {
                          const isCheckedForInsight = selectedFavoriteProjectsForInsight.includes(project.id);

                          return (
                            <div 
                              key={project.id} 
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedFavoriteItem(project);
                              }}
                              className={`bg-white rounded-xl border shadow-sm overflow-hidden flex flex-col group relative cursor-pointer transition-all ${
                                isCheckedForInsight ? 'border-blue-500 ring-2 ring-blue-500/20 bg-blue-50/10' : 'border-slate-200 hover:border-blue-300'
                              }`}
                            >
                              {/* Header with Checkbox, icon and settings */}
                              <div className="p-3 pb-2 flex items-start justify-between">
                                <div className="flex items-center gap-2">
                                  <input 
                                    type="checkbox"
                                    checked={isCheckedForInsight}
                                    onChange={(e) => {
                                      e.stopPropagation();
                                      if (isCheckedForInsight) {
                                        setSelectedFavoriteProjectsForInsight(selectedFavoriteProjectsForInsight.filter(id => id !== project.id));
                                      } else {
                                        setSelectedFavoriteProjectsForInsight([...selectedFavoriteProjectsForInsight, project.id]);
                                      }
                                    }}
                                    onClick={(e) => e.stopPropagation()}
                                    className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500 cursor-pointer"
                                    title="勾选此项参与数据洞察多收藏比对"
                                  />
                                  <div className="w-6 h-6 bg-[#7c4dff] rounded flex items-center justify-center text-white">
                                    <Plus size={14} className="rotate-45" />
                                  </div>
                                </div>
                                <div className="flex items-center gap-1.5">
                                  <button 
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setSelectedFavoriteItem(null);
                                      if (!selectedFavoriteProjectsForInsight.includes(project.id)) {
                                        setSelectedFavoriteProjectsForInsight([...selectedFavoriteProjectsForInsight, project.id]);
                                      }
                                      setFavoriteTab('insight');
                                    }}
                                    className="px-2 py-0.5 rounded bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-[11px] font-bold border border-indigo-200/80 flex items-center gap-1 cursor-pointer transition-all shadow-2xs"
                                    title="将此收藏带入数据洞察质量评估页面"
                                  >
                                    <BarChart3 size={12} />
                                    <span>数据洞察</span>
                                  </button>
                                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full border ${
                                    project.qualityScore >= 90
                                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                      : project.qualityScore >= 80
                                      ? 'bg-blue-50 text-blue-700 border-blue-200'
                                      : 'bg-amber-50 text-amber-700 border-amber-200'
                                  }`}>
                                    质量: {project.qualityScore}
                                  </span>
                                  <button 
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setSelectedProjectForSubscription(project);
                                      setShowSubscriptionSettings(true);
                                    }}
                                    className="text-slate-400 hover:text-blue-600 text-[11px] font-medium cursor-pointer ml-0.5"
                                  >
                                    订阅
                                  </button>
                                  <span className="text-slate-200">|</span>
                                  <button 
                                    onClick={(e) => e.stopPropagation()}
                                    className="text-slate-400 hover:text-slate-600 cursor-pointer"
                                  >
                                    <MoreHorizontal size={14} />
                                  </button>
                                </div>
                              </div>

                              {/* Title */}
                              <div className="px-3 pb-3">
                                <h3 className="text-[14px] font-bold text-slate-800 line-clamp-1 leading-tight" title={project.title}>
                                  {project.title}
                                </h3>
                              </div>

                              {/* Stats Grid */}
                              <div className="px-3 pb-3">
                                <div className="bg-[#f8fafc] rounded-md p-2.5 grid grid-cols-2 gap-3">
                                  <div className="px-1 border-r border-slate-200 flex items-center gap-2.5">
                                    <div className="w-7 h-7 rounded-full bg-[#ecf2ff] flex items-center justify-center text-blue-500">
                                       <User size={15} />
                                    </div>
                                    <div>
                                      <div className="text-[10px] text-slate-500 font-medium whitespace-nowrap">患者数</div>
                                      <div className="text-sm font-bold text-slate-800">
                                        {project.patientCount} <span className="text-orange-500 text-xs">+{project.patientNew}</span>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="px-1 flex items-center gap-2.5">
                                    <div className="w-7 h-7 rounded-full bg-[#ecf2ff] flex items-center justify-center text-blue-500">
                                       <FileText size={15} />
                                    </div>
                                    <div>
                                      <div className="text-[10px] text-slate-500 font-medium whitespace-nowrap">病历数</div>
                                      <div className="text-sm font-bold text-slate-800">
                                        {project.recordCount} <span className="text-orange-500 text-xs">+{project.recordNew}</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Footer Info */}
                              <div className="px-3 pb-3 mt-auto flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-50 pt-2">
                                <div className="flex items-center gap-1">
                                  <span>更新:</span>
                                  <span className="text-slate-600 font-medium">{project.updateFrequency}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <span>时间:</span>
                                  <span className="text-slate-600 font-medium">{project.updateTime}</span>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Sticky Bottom Action Bar for Multi-Select Data Insight */}
                      {selectedFavoriteProjectsForInsight.length > 0 && (
                        <div className="sticky bottom-4 mx-4 my-2 p-4 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl shadow-xl border border-slate-700/60 flex items-center justify-between z-20">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center text-blue-400 font-bold border border-blue-500/30">
                              <BarChart3 size={20} />
                            </div>
                            <div>
                              <div className="text-xs font-bold text-slate-100 flex items-center gap-2">
                                <span>已选择 <strong className="text-blue-400 text-sm font-mono font-black">{selectedFavoriteProjectsForInsight.length}</strong> 项患者收藏</span>
                                <span className="px-2 py-0.5 rounded-full text-[10px] bg-blue-500/20 text-blue-300 border border-blue-400/30 font-normal">多收藏数据质量对比</span>
                              </div>
                              <div className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">
                                包含: {FAVORITE_PROJECTS.filter(p => selectedFavoriteProjectsForInsight.includes(p.id)).map(p => p.title).join('、')}
                              </div>
                            </div>
                          </div>
                          <button 
                            onClick={() => setFavoriteTab('insight')}
                            className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-xl text-xs transition-all shadow-md shadow-blue-500/30 flex items-center gap-2 cursor-pointer active:scale-95"
                          >
                            <Sparkles size={16} />
                            <span>开启数据洞察与数据质量评估</span>
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  {/* TAB 2: Venn Diagram View */}
                  {favoriteTab === 'venn' && (
                    <div className="p-6 space-y-6 flex-1 overflow-y-auto">
                      {/* Venn Header Card */}
                      <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-11 h-11 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
                            <LucidePieChart size={22} />
                          </div>
                          <div>
                            <div className="flex items-center gap-3">
                              <h3 className="text-base font-black text-slate-800">患者收藏 - 韦恩图交叉集合分析</h3>
                              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-50 text-purple-600 border border-purple-100">队列交集分析</span>
                            </div>
                            <p className="text-xs text-slate-500 mt-1">
                              选择 2~3 个患者收藏项目进行人群重叠分析，直观展示交集/并集患者基数，支持一键将交集患者提取为新项目。
                            </p>
                          </div>
                        </div>
                        <button 
                          onClick={() => setToastMessage("已成功将选中交集的 98 位患者提取为【交集衍生新队列】！")}
                          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl text-xs transition-all shadow-md shadow-purple-500/20 flex items-center gap-1.5"
                        >
                          <Plus size={15} />
                          <span>提取选中交集为新收藏</span>
                        </button>
                      </div>

                      {/* Cohort Checkbox Selector & Visual Venn Canvas */}
                      <div className="grid grid-cols-12 gap-6">
                        {/* Left Column: Select Cohorts */}
                        <div className="col-span-4 bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm space-y-4">
                          <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-purple-600" />
                            选择对比患者收藏队列 (最多3项)
                          </h4>
                          <div className="space-y-3">
                            {[
                              { id: 'fav_1', name: '肝癌患者丙肝抗体相关指标分析', color: '#3b82f6', count: 1842 },
                              { id: 'fav_2', name: '食管癌术后复发风险队列', color: '#10b981', count: 1210 },
                              { id: 'fav_3', name: '肺癌免疫治疗随访队列', color: '#f59e0b', count: 875 },
                              { id: 'fav_4', name: '结直肠癌靶向用药监控库', color: '#8b5cf6', count: 640 },
                            ].map((item, idx) => (
                              <label key={item.id} className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl flex items-center justify-between cursor-pointer hover:bg-slate-100 transition-colors">
                                <div className="flex items-center gap-2.5">
                                  <input type="checkbox" defaultChecked={idx < 3} className="w-4 h-4 text-purple-600 rounded border-slate-300 focus:ring-purple-500" />
                                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                                  <span className="text-xs font-bold text-slate-800">{item.name}</span>
                                </div>
                                <span className="text-[11px] font-mono font-bold text-slate-500">{item.count} 人</span>
                              </label>
                            ))}
                          </div>
                        </div>

                        {/* Right Column: Venn Diagram Visualization */}
                        <div className="col-span-8 bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm flex flex-col items-center justify-center relative min-h-[300px]">
                          <div className="text-xs font-bold text-slate-400 mb-2">3 队列人群交集 Venn Diagram</div>
                          
                          <div className="relative w-[340px] h-[220px] flex items-center justify-center select-none">
                            {/* Circle A */}
                            <div className="absolute left-6 top-4 w-44 h-44 rounded-full bg-blue-500/20 border-2 border-blue-500 flex items-start justify-start p-4 text-blue-700 font-black text-xs shadow-inner">
                              <span>A: 肝癌队列</span>
                            </div>
                            {/* Circle B */}
                            <div className="absolute right-6 top-4 w-44 h-44 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-start justify-end p-4 text-emerald-700 font-black text-xs shadow-inner">
                              <span>B: 食管癌队列</span>
                            </div>
                            {/* Circle C */}
                            <div className="absolute bottom-1 w-44 h-44 rounded-full bg-amber-500/20 border-2 border-amber-500 flex items-end justify-center p-4 text-amber-700 font-black text-xs shadow-inner">
                              <span>C: 肺癌队列</span>
                            </div>

                            {/* Counts */}
                            <div className="absolute top-12 left-14 font-mono font-black text-blue-700 text-xs">1,180</div>
                            <div className="absolute top-12 right-14 font-mono font-black text-emerald-700 text-xs">764</div>
                            <div className="absolute bottom-5 font-mono font-black text-amber-700 text-xs">462</div>
                            <div className="absolute top-16 font-mono font-black text-indigo-800 text-[11px] bg-white/80 px-1.5 py-0.5 rounded shadow-xs">A∩B: 342</div>
                            <div className="absolute bottom-12 left-20 font-mono font-black text-teal-800 text-[11px] bg-white/80 px-1.5 py-0.5 rounded shadow-xs">A∩C: 215</div>
                            <div className="absolute bottom-12 right-20 font-mono font-black text-amber-800 text-[11px] bg-white/80 px-1.5 py-0.5 rounded shadow-xs">B∩C: 189</div>
                            <div className="absolute top-24 font-mono font-black text-purple-900 text-xs bg-purple-100 border border-purple-300 px-2 py-0.5 rounded-full shadow-md animate-pulse">
                              A∩B∩C: 98 人
                            </div>
                          </div>

                          <div className="mt-4 flex items-center gap-6 text-xs text-slate-600 font-bold">
                            <div className="flex items-center gap-1.5">
                              <span className="w-3 h-3 rounded-full bg-blue-500" />
                              <span>A 独有: 1,180 人</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <span className="w-3 h-3 rounded-full bg-emerald-500" />
                              <span>B 独有: 764 人</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <span className="w-3 h-3 rounded-full bg-amber-500" />
                              <span>C 独有: 462 人</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-purple-700 font-black">
                              <span className="w-3 h-3 rounded-full bg-purple-600" />
                              <span>三者共同交集: 98 人</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Intersection Patient Details Table */}
                      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
                        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                          <h4 className="text-xs font-black text-slate-800 flex items-center gap-2">
                            <User size={16} className="text-purple-600" />
                            <span>交集人群名册 (A∩B∩C 共 98 位患者)</span>
                          </h4>
                          <div className="flex items-center gap-2">
                            <button className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-50">
                              导出表格
                            </button>
                          </div>
                        </div>
                        <div className="overflow-x-auto">
                          <table className="w-full text-left text-xs">
                            <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-100 text-[10px] uppercase">
                              <tr>
                                <th className="px-4 py-3">患者编号</th>
                                <th className="px-4 py-3">姓名</th>
                                <th className="px-4 py-3">性别 / 年龄</th>
                                <th className="px-4 py-3">匹配队列标签</th>
                                <th className="px-4 py-3">最新就诊日期</th>
                                <th className="px-4 py-3">操作</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                              {[
                                { id: 'P009812', name: '智*', sex: '男', age: '62', tags: ['肝癌队列', '食管癌队列', '肺癌队列'], date: '2026-07-12' },
                                { id: 'P009813', name: '靖*', sex: '女', age: '58', tags: ['肝癌队列', '食管癌队列', '肺癌队列'], date: '2026-07-15' },
                                { id: 'P009814', name: '卓*', sex: '男', age: '71', tags: ['肝癌队列', '食管癌队列', '肺癌队列'], date: '2026-07-20' },
                                { id: 'P009815', name: '雷*', sex: '女', age: '65', tags: ['肝癌队列', '食管癌队列', '肺癌队列'], date: '2026-07-28' },
                              ].map((row, idx) => (
                                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                                  <td className="px-4 py-3 font-mono font-bold text-blue-600">{row.id}</td>
                                  <td className="px-4 py-3 font-bold text-slate-800">{row.name}</td>
                                  <td className="px-4 py-3">{row.sex} / {row.age}岁</td>
                                  <td className="px-4 py-3">
                                    <div className="flex gap-1">
                                      {row.tags.map(t => (
                                        <span key={t} className="px-1.5 py-0.5 rounded bg-purple-50 text-purple-700 border border-purple-100 text-[10px] font-bold">
                                          {t}
                                        </span>
                                      ))}
                                    </div>
                                  </td>
                                  <td className="px-4 py-3 text-slate-500 font-mono">{row.date}</td>
                                  <td className="px-4 py-3">
                                    <button className="text-blue-600 hover:underline font-bold">全息视图</button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 3: Data Insight Console */}
                  {favoriteTab === 'insight' && (() => {
                    const selectedProjects = FAVORITE_PROJECTS.filter(p => selectedFavoriteProjectsForInsight.includes(p.id));
                    const activeProjects = selectedProjects.length > 0 ? selectedProjects : FAVORITE_PROJECTS.slice(0, 3);
                    const topQualityProject = [...activeProjects].sort((a, b) => b.qualityScore - a.qualityScore)[0];

                    // Get all selected metrics from METRIC_LIBRARY_DATA
                    const selectedFields = METRIC_LIBRARY_DATA.flatMap(cat => 
                      cat.fields.map(f => ({ ...f, category: cat.category }))
                    ).filter(f => selectedMetricIds.includes(f.id));

                    // Default benchmark core metrics shown in table if list is short
                    const coreBenchmarkFields = [
                      { id: 'bm_1', category: '患者人口学信息', name: '民族', scores: ['100%', '100%', '100%'], status: 'excel' },
                      { id: 'bm_2', category: '患者人口学信息', name: 'ABO血型', scores: ['98.5%', '97.2%', '99.1%'], status: 'excel' },
                      { id: 'bm_3', category: '就诊记录', name: '离院方式', scores: ['100%', '100%', '100%'], status: 'excel' },
                      { id: 'bm_4', category: '就诊记录', name: '出院日期', scores: ['100%', '100%', '100%'], status: 'excel' },
                      { id: 'bm_5', category: '就诊记录', name: '转归情况', scores: ['100%', '100%', '100%'], status: 'excel' },
                      { id: 'bm_6', category: '就诊记录', name: '住院总费用 (元)', scores: ['99.2%', '98.8%', '99.5%'], status: 'excel' },
                      { id: 'bm_7', category: '就诊记录', name: '总住院天数', scores: ['100%', '99.1%', '100%'], status: 'excel' },
                      { id: 'bm_8', category: '既往病史', name: '脑卒中病史', scores: ['92.4%', '88.5%', '94.0%'], status: 'warn' },
                      { id: 'bm_9', category: '既往病史', name: '脑卒中病程 (年)', scores: ['85.0%', '79.2%', '88.1%'], status: 'warn' },
                      { id: 'bm_10', category: '检验-血常规', name: '血红蛋白 (Hb)', scores: ['96.8%', '95.4%', '97.2%'], status: 'excel' },
                    ];

                    const displayFields = selectedFields.length > 0 
                      ? selectedFields.map((f, i) => ({
                          id: f.id,
                          category: f.category,
                          name: f.name,
                          scores: f.scores || ['98.0%', '95.5%', '97.0%'],
                          status: f.status || 'excel'
                        }))
                      : coreBenchmarkFields;

                    return (
                      <div className="flex-1 overflow-y-auto bg-slate-50 p-6 space-y-6 dataset-scroll">
                        {/* Interactive Selector Bar for Favorite Projects */}
                        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Sparkles size={16} className="text-indigo-600" />
                              <h4 className="text-xs font-black uppercase text-slate-700 tracking-wider">选择参与比对分析的患者收藏分组（最多选 5 项）</h4>
                            </div>
                            <div className="flex items-center gap-2 text-xs">
                              <button 
                                onClick={() => {
                                  setSelectedFavoriteProjectsForInsight(FAVORITE_PROJECTS.slice(0, 5).map(p => p.id));
                                  setToastMessage("已选中前 5 项患者收藏参与对比分析");
                                }}
                                className="text-indigo-600 hover:underline font-bold cursor-pointer"
                              >
                                全选(前5项)
                              </button>
                              <span className="text-slate-300">|</span>
                              <button 
                                onClick={() => setSelectedFavoriteProjectsForInsight([FAVORITE_PROJECTS[0].id])}
                                className="text-slate-500 hover:underline cursor-pointer"
                              >
                                重置
                              </button>
                              <span className="text-slate-400 font-medium ml-2">已勾选 <strong className="text-indigo-600 font-bold">{selectedFavoriteProjectsForInsight.length}</strong> / 5 项 (共 {FAVORITE_PROJECTS.length} 项)</span>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2.5">
                            {FAVORITE_PROJECTS.map((project, pIdx) => {
                              const isSelected = selectedFavoriteProjectsForInsight.includes(project.id);
                              const tagColors = [
                                'bg-blue-50 text-blue-900 border-blue-300 ring-blue-400/30',
                                'bg-cyan-50 text-cyan-900 border-cyan-300 ring-cyan-400/30',
                                'bg-amber-50 text-amber-900 border-amber-300 ring-amber-400/30',
                                'bg-indigo-50 text-indigo-900 border-indigo-300 ring-indigo-400/30',
                                'bg-emerald-50 text-emerald-900 border-emerald-300 ring-emerald-400/30',
                              ];
                              return (
                                <div
                                  key={project.id}
                                  className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-2 border transition-all ${
                                    isSelected 
                                      ? `${tagColors[pIdx % 5]} shadow-2xs ring-1` 
                                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                                  }`}
                                >
                                  <input 
                                    type="checkbox"
                                    checked={isSelected}
                                    onChange={() => {
                                      if (isSelected) {
                                        if (selectedFavoriteProjectsForInsight.length > 1) {
                                          setSelectedFavoriteProjectsForInsight(selectedFavoriteProjectsForInsight.filter(id => id !== project.id));
                                        } else {
                                          setToastMessage("请至少保留一个患者收藏进行数据洞察分析");
                                        }
                                      } else {
                                        if (selectedFavoriteProjectsForInsight.length >= 5) {
                                          setToastMessage("对比分析最多只能同时选择 5 个患者收藏");
                                        } else {
                                          setSelectedFavoriteProjectsForInsight([...selectedFavoriteProjectsForInsight, project.id]);
                                        }
                                      }
                                    }}
                                    className="w-3.5 h-3.5 text-blue-600 rounded border-slate-300 cursor-pointer"
                                    title="勾选或取消勾选比对分析"
                                  />
                                  <button
                                    onClick={() => {
                                      setSelectedFavoriteItem(project);
                                      setFavoriteTab('list');
                                    }}
                                    className="hover:underline hover:text-indigo-600 font-bold cursor-pointer text-left truncate max-w-[200px]"
                                    title="点击进入该患者收藏详情列表"
                                  >
                                    {project.title}
                                  </button>
                                  <span className={`text-[10px] px-1.5 py-0.2 rounded font-black ${
                                    project.qualityScore >= 90 
                                      ? 'bg-emerald-100 text-emerald-800' 
                                      : project.qualityScore >= 80 
                                      ? 'bg-blue-100 text-blue-800' 
                                      : 'bg-amber-100 text-amber-800'
                                  }`}>
                                    {project.qualityScore}分
                                  </span>
                                  <button
                                    onClick={() => {
                                      setSelectedFavoriteItem(project);
                                      setFavoriteTab('list');
                                    }}
                                    className="p-1 hover:bg-slate-200/60 rounded text-slate-400 hover:text-indigo-600 transition-colors cursor-pointer ml-0.5"
                                    title="进入该患者收藏列表"
                                  >
                                    <ExternalLink size={12} />
                                  </button>
                                </div>
                              );
                            })}
                          </div>
                        </div>



                        {/* SECTION 1: Overview, Outcome Data & Discharge Outcome Cards (Row 1) */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                          {/* Card 1: 概览 */}
                          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm flex flex-col justify-between">
                            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
                              <div className="flex items-center gap-2">
                                <span className="w-1.5 h-4 bg-blue-600 rounded-full inline-block" />
                                <h3 className="text-sm font-black text-slate-800">概览</h3>
                              </div>
                              <span className="text-[10px] text-slate-400 font-bold">横向基础体量</span>
                            </div>

                            <div className="grid grid-cols-2 gap-4 my-auto py-2">
                              <div className="space-y-2">
                                <div className="text-xs font-bold text-slate-500 border-b border-slate-100 pb-1">患者总数</div>
                                {activeProjects.map((p, pIdx) => {
                                  const colors = ['text-blue-600 bg-blue-600', 'text-cyan-600 bg-cyan-500', 'text-amber-500 bg-amber-500'];
                                  const [textCol, bgCol] = colors[pIdx % 3].split(' ');
                                  return (
                                    <div key={p.id} className="flex items-center justify-between pr-2">
                                      <span className="text-[11px] text-slate-500 truncate max-w-[80px]">{p.title.slice(0, 4)}...</span>
                                      <div className="flex items-center gap-1.5 font-mono font-black text-xs">
                                        <span className={`w-1.5 h-3 rounded-full ${bgCol}`} />
                                        <span className={textCol}>{p.patientCount}人</span>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>

                              <div className="space-y-2 border-l border-slate-100 pl-4">
                                <div className="text-xs font-bold text-slate-500 border-b border-slate-100 pb-1">病例总数</div>
                                {activeProjects.map((p, pIdx) => {
                                  const colors = ['text-blue-600 bg-blue-600', 'text-cyan-600 bg-cyan-500', 'text-amber-500 bg-amber-500'];
                                  const [textCol, bgCol] = colors[pIdx % 3].split(' ');
                                  return (
                                    <div key={p.id} className="flex items-center justify-between pr-1">
                                      <span className="text-[11px] text-slate-500 truncate max-w-[80px]">{p.title.slice(0, 4)}...</span>
                                      <div className="flex items-center gap-1.5 font-mono font-black text-xs">
                                        <span className={`w-1.5 h-3 rounded-full ${bgCol}`} />
                                        <span className={textCol}>{p.recordCount}份</span>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>

                            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
                              <span>已对比 <strong className="text-slate-700 font-bold">{activeProjects.length}</strong> 个收藏分组</span>
                              <span>包含多记录匹配</span>
                            </div>
                          </div>

                          {/* Card 2: 转归情况记录 */}
                          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm flex flex-col justify-between">
                            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
                              <div className="flex items-center gap-2">
                                <span className="w-1.5 h-4 bg-cyan-500 rounded-full inline-block" />
                                <h3 className="text-sm font-black text-slate-800">转归情况记录</h3>
                              </div>
                              <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full">100% 数据完备</span>
                            </div>

                            <div className="space-y-3 my-auto">
                              {activeProjects.map((p, pIdx) => {
                                const bgColors = ['bg-blue-600', 'bg-cyan-500', 'bg-amber-500'];
                                const textColors = ['text-blue-600', 'text-cyan-600', 'text-amber-600'];
                                return (
                                  <div key={p.id} className="space-y-1">
                                    <div className="flex justify-between text-xs font-bold">
                                      <span className="text-slate-600 truncate max-w-[170px]">{p.title}</span>
                                      <span className={`font-mono font-black ${textColors[pIdx % 3]}`}>{p.recordCount} 份</span>
                                    </div>
                                    <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden flex">
                                      <div 
                                        className={`h-full rounded-full ${bgColors[pIdx % 3]}`} 
                                        style={{ width: `${Math.min(100, Math.round((p.recordCount / 3228) * 100))}%` }} 
                                      />
                                    </div>
                                  </div>
                                );
                              })}
                            </div>

                            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
                              <span>核心分类: 医嘱离院/转院/社区/死亡</span>
                              <span className="text-slate-500">缺失率: 0%</span>
                            </div>
                          </div>

                          {/* Card 3: 转归流向分布 (Radar Chart) */}
                          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm flex flex-col justify-between">
                            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-2">
                              <div className="flex items-center gap-2">
                                <span className="w-1.5 h-4 bg-amber-500 rounded-full inline-block" />
                                <h3 className="text-sm font-black text-slate-800">转归流向分布</h3>
                              </div>
                              <span className="text-[10px] text-slate-400 font-bold">多维归转雷达</span>
                            </div>

                            <div className="h-[140px] flex items-center justify-center">
                              <ResponsiveContainer width="100%" height="100%">
                                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={[
                                  { subject: '医嘱离院', A: 84, B: 53, C: 100 },
                                  { subject: '医嘱转院', A: 12, B: 15, C: 0 },
                                  { subject: '社区卫生', A: 15, B: 20, C: 0 },
                                  { subject: '非医嘱', A: 3, B: 8, C: 0 },
                                  { subject: '死亡', A: 2, B: 5, C: 0 },
                                  { subject: '其他', A: 10, B: 11, C: 0 },
                                  { subject: '无记录', A: 16, B: 25, C: 0 },
                                ]}>
                                  <PolarGrid stroke="#e2e8f0" />
                                  <PolarAngleAxis dataKey="subject" tick={{ fontSize: 9, fill: '#64748b' }} />
                                  <Radar name={activeProjects[0]?.title || 'Group 1'} dataKey="A" stroke="#2563eb" fill="#3b82f6" fillOpacity={0.25} />
                                  {activeProjects[1] && <Radar name={activeProjects[1]?.title || 'Group 2'} dataKey="B" stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.2} />}
                                  {activeProjects[2] && <Radar name={activeProjects[2]?.title || 'Group 3'} dataKey="C" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.2} />}
                                </RadarChart>
                              </ResponsiveContainer>
                            </div>

                            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
                              <span className="flex items-center gap-1.5">
                                <span className="inline-block w-2 h-2 rounded-full bg-blue-600" /> G1:84% 离院
                                <span className="inline-block w-2 h-2 rounded-full bg-cyan-500" /> G2:53% 离院
                                <span className="inline-block w-2 h-2 rounded-full bg-amber-500" /> G3:100% 离院
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* SECTION 2: Indicators Fill Rate Matrix (Full Width) */}
                        <div className="w-full bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden flex flex-col">
                          {/* Matrix Header */}
                          <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex flex-col md:flex-row md:items-center justify-between gap-3">
                            <div>
                              <h3 className="text-sm font-black text-slate-800 flex items-center gap-2">
                                <span className="w-1.5 h-4 bg-indigo-600 rounded-full inline-block" />
                                关注指标填充率对比矩阵
                              </h3>
                            </div>

                            <button 
                              onClick={() => {
                                setTempSelectedMetricIds([...selectedMetricIds]);
                                setIsObservedMetricsModalOpen(true);
                              }}
                              className="px-3.5 py-1.5 bg-white text-blue-600 border border-blue-500 hover:bg-blue-50 rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all shadow-2xs shrink-0 self-start md:self-auto"
                            >
                              <Settings size={14} />
                              <span>设置关注指标 ({displayFields.length})</span>
                            </button>
                          </div>

                          {/* Selected Metric Category Pills */}
                          <div className="px-5 py-2.5 bg-slate-50/30 border-b border-slate-100 flex items-center gap-2 overflow-x-auto">
                            <span className="text-xs font-bold text-slate-500 shrink-0">关注指标:</span>
                            <div className="flex flex-wrap gap-1.5">
                              {displayFields.map((field, idx) => (
                                <span 
                                  key={field.id || idx}
                                  className="px-2.5 py-0.5 bg-white border border-blue-300 text-blue-700 rounded-md text-[11px] font-bold shadow-2xs"
                                >
                                  {field.name}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Table */}
                          <div className="overflow-x-auto">
                            <table className="w-full text-left text-xs">
                              <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-100 uppercase text-[10px] tracking-wider">
                                <tr>
                                  <th className="px-5 py-3.5 w-64 min-w-[200px] text-slate-700">关注指标名称</th>
                                  {activeProjects.map((p, pIdx) => {
                                    const headerCols = ['text-blue-700', 'text-cyan-700', 'text-amber-700'];
                                    return (
                                      <th key={p.id} className="px-5 py-3.5 min-w-[200px] max-w-[320px]">
                                        <div className={`font-bold truncate ${headerCols[pIdx % 3]}`} title={p.title}>
                                          {p.title.length > 12 ? p.title.slice(0, 12) + '...' : p.title}
                                        </div>
                                        <div className="text-[10px] text-slate-400 font-normal">({p.recordCount}例)</div>
                                      </th>
                                    );
                                  })}
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                                {displayFields.map((field, idx) => (
                                  <tr key={field.id || idx} className="hover:bg-slate-50/80 transition-colors">
                                    <td className="px-5 py-3.5">
                                      <div className="font-bold text-slate-800">{field.name}</div>
                                      <div className="text-[10px] text-slate-400">{field.category}</div>
                                    </td>
                                    {activeProjects.map((p, pIdx) => {
                                      const scoreStr = field.scores[pIdx % field.scores.length] || '100%';
                                      const scoreNum = parseFloat(scoreStr);
                                      return (
                                        <td key={p.id} className="px-5 py-3.5">
                                          <div className="space-y-1.5 max-w-[280px]">
                                            <div className="flex items-center justify-between text-[11px] font-mono font-bold">
                                              <span className="text-slate-500 font-normal">{Math.round(p.recordCount * (scoreNum / 100))} / {p.recordCount}例</span>
                                              <span className={scoreNum >= 95 ? 'text-emerald-600 font-black' : scoreNum >= 85 ? 'text-blue-600 font-black' : 'text-amber-600 font-black'}>
                                                {scoreStr}
                                              </span>
                                            </div>
                                            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200/60">
                                              <div 
                                                className={`h-full rounded-full transition-all duration-300 ${
                                                  scoreNum >= 95 ? 'bg-emerald-500' : scoreNum >= 85 ? 'bg-blue-500' : 'bg-amber-500'
                                                }`}
                                                style={{ width: scoreStr }}
                                              />
                                            </div>
                                          </div>
                                        </td>
                                      );
                                    })}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>

                        {/* ★ SECTION 3: DYNAMIC FOCUS METRIC DISTRIBUTIONS (图表展示所有设置的关注指标，支持多图响应布局) */}
                        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-5">
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                            <div>
                              <h3 className="text-base font-black text-slate-800 flex items-center gap-2">
                                <span className="w-2 h-4 bg-blue-600 rounded-full inline-block" />
                                关注指标 - 分组数值分布与异质性统计看板
                              </h3>
                            </div>
                            <div className="flex items-center gap-2 text-xs font-bold">
                              <span className="text-slate-400">对比分组:</span>
                              {activeProjects.map((p, idx) => {
                                const badgeCols = ['bg-blue-100 text-blue-800', 'bg-cyan-100 text-cyan-800', 'bg-amber-100 text-amber-800'];
                                return (
                                  <span key={p.id} className={`px-2.5 py-1 rounded-md text-[10px] font-bold ${badgeCols[idx % 3]}`}>
                                    {p.title.length > 8 ? p.title.slice(0, 8) + '...' : p.title}
                                  </span>
                                );
                              })}
                            </div>
                          </div>

                          {/* Multi-chart Grid Layout for Focus Metrics - Synchronized 100% with displayFields */}
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                            {displayFields.map((field, fIdx) => {
                              return (
                                <div key={field.id || fIdx} className="bg-slate-50/80 rounded-xl p-4 border border-slate-200/70 space-y-3 shadow-2xs">
                                  <div className="flex items-center justify-between border-b border-slate-200/60 pb-2">
                                    <span className="text-xs font-black text-slate-800 flex items-center gap-1.5 truncate max-w-[210px]" title={field.name}>
                                      <Activity size={14} className="text-blue-600 shrink-0" />
                                      {fIdx + 1}. {field.name}
                                    </span>
                                    <span className="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded font-bold shrink-0">{field.category}</span>
                                  </div>
                                  <div className="h-[160px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                      <BarChart data={activeProjects.map((p, pIdx) => {
                                        const scoreStr = field.scores[pIdx % field.scores.length] || '95%';
                                        const scoreNum = parseFloat(scoreStr);
                                        return {
                                          group: p.title.length > 8 ? p.title.slice(0, 8) + '...' : p.title,
                                          填充率: scoreNum,
                                          有效例数: Math.round(p.recordCount * (scoreNum / 100))
                                        };
                                      })} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                        <XAxis dataKey="group" axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#64748b' }} />
                                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#64748b' }} unit="%" domain={[0, 100]} />
                                        <RechartsTooltip contentStyle={{ fontSize: '11px', borderRadius: '8px' }} />
                                        <Bar dataKey="填充率" name="数据填充率(%)" fill="#2563eb" radius={[4, 4, 0, 0]} />
                                      </BarChart>
                                    </ResponsiveContainer>
                                  </div>
                                  <div className="text-[10px] text-slate-500 text-center font-medium flex items-center justify-between px-1">
                                    <span>多组完备率均值: <strong className="text-blue-600 font-mono font-bold">
                                      {(field.scores.reduce((acc, s) => acc + parseFloat(s), 0) / field.scores.length).toFixed(1)}%
                                    </strong></span>
                                    <span className="text-emerald-600 font-bold">满足多中心分析</span>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>


                      </div>
                    );
                  })()}
                </>
              ) : (
                <div className="flex-1 flex flex-col bg-white overflow-hidden relative">
                  {/* Detailed View Header */}
                  <div className="px-6 py-3.5 flex items-center justify-between border-b border-slate-100 bg-white">
                    <div className="flex items-center gap-4">
                      <button 
                        onClick={() => setSelectedFavoriteItem(null)}
                        className="p-1 hover:bg-slate-50 rounded-full transition-colors text-blue-600"
                      >
                         <ArrowLeft size={18} />
                      </button>
                      <h2 className="text-sm font-black text-slate-800 max-w-[600px] truncate">
                        {selectedFavoriteItem.id === '3' || selectedFavoriteItem.id === '6' ? '肝癌患者丙肝抗体相关指标分析' : selectedFavoriteItem.title}
                      </h2>
                    </div>
                    <div className="flex items-center gap-4 text-[10px] text-slate-400 font-bold">
                       <div className="flex items-center gap-1">
                          <span>共</span>
                          <span className="text-blue-600 font-black">95</span>
                          <span>个患者,当日新增</span>
                          <span className="text-blue-600 font-black">0</span>
                          <span>;</span>
                          <span className="text-blue-600 font-black">176</span>
                          <span>份病历,当日新增</span>
                          <span className="text-blue-600 font-black">0</span>
                       </div>
                    </div>
                  </div>

                  {/* Sub-tabs Selection */}
                  <div className="px-6 bg-white border-b border-slate-50 flex items-center gap-4">
                     <button className="py-2.5 px-4 bg-blue-600 text-white rounded-t-sm text-[11px] font-black shadow-sm relative z-10">患者列表</button>
                     <button className="py-2.5 px-4 text-slate-400 hover:text-slate-700 text-[11px] font-bold transition-colors">可视化</button>
                  </div>

                  {/* Toolbar */}
                  
                  {/* Status Tabs */}
                  <div className="px-6 py-2 bg-slate-50/50 border-b border-slate-100 flex items-center gap-6">
                     {['已入组', '待审核'].map(status => {
                        const count = favoritePatients.filter(p => {
                           if (status === '待审核') return p.status === '待审核' || p.status === '已拒绝';
                           return p.status === status;
                        }).length;
                        return (
                           <button
                              key={status}
                              onClick={() => { setPatientStatusFilter(status); setSelectedPatients([]); }}
                              className={`text-[11px] font-bold py-1 border-b-2 transition-all ${
                                 patientStatusFilter === status 
                                 ? 'border-blue-600 text-blue-600' 
                                 : 'border-transparent text-slate-500 hover:text-slate-700'
                              }`}
                           >
                              {status}
                              <span className="ml-1.5 opacity-50 text-[10px]">
                                 ({count})
                              </span>
                           </button>
                        );
                     })}
                     

                  </div>
<div className="px-6 py-3 flex items-center justify-between bg-white shrink-0 border-b border-slate-50 relative z-10">
                    <div className="flex items-center gap-3">
                       <label className="flex items-center gap-2 text-[10px] text-slate-600 border border-slate-100 bg-white px-3 py-1.5 rounded-sm cursor-pointer hover:bg-slate-50 shadow-[0_1px_2px_rgba(0,0,0,0.02)] transition-all">
                          <input type="checkbox" className="w-3.5 h-3.5 border-slate-300 rounded-[2px] text-blue-600 focus:ring-0" />
                          <span className="font-bold">全选所有页</span>
                       </label>
                       <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-100 rounded-sm text-[10px] text-slate-600 font-bold hover:bg-slate-50 shadow-[0_1px_2px_rgba(0,0,0,0.02)] transition-all">
                          <Filter size={13} className="text-slate-400" />
                          <span>数据筛选</span>
                       </button>
                       {patientStatusFilter === '已入组' && (
                         <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-100 rounded-sm text-[10px] text-slate-600 font-bold hover:bg-slate-50 shadow-[0_1px_2px_rgba(0,0,0,0.02)] transition-all cursor-pointer">
                            <span>研究维度：患者</span>
                         </div>
                       )}
                    </div>
                    <div className="flex items-center gap-2">
                       {selectedPatients.length > 0 && <span className="text-[10px] text-slate-500 font-bold mr-2">已选 {selectedPatients.length} 项</span>}
                       {patientStatusFilter === '待审核' ? (
                         <>
                           <button 
                             onClick={() => handleBatchPatientAudit('通过')}
                             disabled={selectedPatients.length === 0}
                             className={`px-4 py-1.5 rounded-sm text-[10px] font-black shadow-sm transition-all ${
                               selectedPatients.length > 0
                                 ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                                 : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                             }`}
                           >
                              审核通过
                           </button>
                           <button 
                             onClick={() => handleBatchPatientAudit('拒绝')}
                             disabled={selectedPatients.length === 0}
                             className={`px-4 py-1.5 rounded-sm text-[10px] font-black shadow-sm transition-all ${
                               selectedPatients.length > 0
                                 ? 'bg-rose-500 text-white hover:bg-rose-600'
                                 : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                             }`}
                           >
                              审核拒绝
                           </button>
                         </>
                       ) : (
                         <>
                           <button 
                             onClick={() => setIsTagModalOpen(true)}
                             disabled={selectedPatients.length === 0}
                             className={`px-4 py-1.5 border rounded-sm text-[10px] font-black transition-all cursor-pointer ${
                               selectedPatients.length > 0
                                 ? 'border-blue-600 text-blue-600 bg-white hover:bg-blue-50'
                                 : 'border-slate-300 text-slate-400 bg-slate-50 cursor-not-allowed opacity-50'
                             }`}
                           >
                              打标签
                           </button>
                           <button className="px-4 py-1.5 border border-blue-600 text-blue-600 bg-white rounded-sm text-[10px] font-black hover:bg-blue-50 transition-all cursor-pointer">
                              设置观测指标
                           </button>
                           <button className="flex items-center gap-1.5 px-4 py-1.5 bg-blue-600 text-white rounded-sm text-[10px] font-black hover:bg-blue-700 shadow-sm transition-all cursor-pointer">
                              <span>批量操作</span>
                              <ChevronDown size={13} />
                           </button>
                           <button className="flex items-center gap-1.5 px-4 py-1.5 bg-blue-600 text-white rounded-sm text-[10px] font-black hover:bg-blue-700 shadow-sm transition-all cursor-pointer">
                              <Share2 size={13} />
                              <span>导出</span>
                              <ChevronDown size={13} />
                           </button>
                         </>
                       )}
                    </div>
                  </div>

                  {/* Side Toggle Button */}
                  <button className="absolute left-[-2px] top-1/2 -translate-y-1/2 w-6 h-12 bg-white border border-slate-200 rounded-r-lg shadow-sm z-50 flex items-center justify-center text-slate-400 hover:text-blue-600 transition-all">
                     <ChevronLeft size={16} />
                  </button>

                  <div className="flex-1 overflow-auto bg-[#f8fafc] p-6 selection:bg-blue-100 relative">
                    {/* Repeated Watermark Background */}
                    <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03] overflow-hidden select-none" style={{ 
                      backgroundImage: 'radial-gradient(circle, transparent 20%, #f8fafc 20%, #f8fafc 80%, transparent 80%, transparent), radial-gradient(circle, transparent 20%, #f8fafc 20%, #f8fafc 80%, transparent 80%, transparent)',
                      backgroundSize: '300px 150px',
                    }}>
                       {Array.from({ length: 40 }).map((_, i) => (
                         <div key={i} className="absolute text-[14px] font-bold text-slate-900 whitespace-nowrap transform -rotate-25" style={{
                           left: `${(i % 5) * 20 + (Math.floor(i / 5) % 2) * 10}%`,
                           top: `${Math.floor(i / 5) * 15}%`,
                         }}>
                           科研演示03 4333
                         </div>
                       ))}
                    </div>

                    <div className="bg-white rounded-sm border border-slate-200 shadow-xl overflow-hidden relative z-10 h-full flex flex-col">
                       <div className="overflow-x-auto flex-1">
                         <table className="w-full text-left border-collapse min-w-[2000px]">
                           <thead>
                             <tr className="bg-[#f8fafc] border-b border-slate-200">
                               <th className="py-3 px-4 w-12 text-center border-r border-slate-100 sticky left-0 bg-[#f8fafc] z-20 shadow-[1px_0_0_0_#f1f5f9]">
                                  <input 
                                    type="checkbox" 
                                    className="w-3.5 h-3.5 border-slate-300 rounded-[2px] text-blue-600 focus:ring-0" 
                                    checked={
                                       favoritePatients.filter(matchesFilter).length > 0 &&
                                       selectedPatients.length === favoritePatients.filter(matchesFilter).length
                                    }
                                    onChange={(e) => {
                                       if (e.target.checked) {
                                          setSelectedPatients(favoritePatients.filter(matchesFilter).map(p => p.id));
                                       } else {
                                          setSelectedPatients([]);
                                       }
                                    }}
                                  />
                               </th>
                               <th className="py-3 px-4 text-[10px] font-black text-slate-400 w-16 border-r border-slate-100 text-center uppercase">序号</th>
                               {patientStatusFilter === '已入组' && (
                                 <>
                                   <th className="py-3 px-4 text-[10px] font-black text-slate-400 border-r border-slate-100 uppercase min-w-[160px]">患者标签</th>
                                   <th className="py-3 px-4 text-[10px] font-black text-slate-400 border-r border-slate-100 uppercase min-w-[100px]">分组</th>
                                 </>
                               )}
                               <th className="py-3 px-4 text-[10px] font-black text-slate-400 w-64 border-r border-slate-100 uppercase">数据填充率</th>
                               {[
                                 { label: '患者就诊编号', rate: '100%' },
                                 { label: '患者就诊流水号', rate: '100%' },
                                 { label: '患者姓名', rate: '100%' },
                                 { label: '就诊年龄', rate: '100%' },
                                 { label: '单核细胞绝对值 (10...', rate: '47.6%' },
                                 { label: '平均血红蛋白浓度 (g...', rate: '47.6%' },
                                 { label: '有无肝衰竭', rate: '100%' },
                                 { label: '活化部分凝血活酶时...', rate: '45.15%' },
                                 { label: '患者来源', rate: null },
                                 { label: '创建', rate: null }
                               ].map((col, idx) => (
                                 <th key={idx} className="py-3 px-4 text-[10px] font-black text-slate-400 border-r border-slate-100 uppercase min-w-[140px]">
                                   <div className="flex flex-col gap-1">
                                      <div className="flex items-center justify-between">
                                         <span>{col.label}</span>
                                         <div className="flex flex-col opacity-30">
                                            <ChevronUp size={10} className="-mb-0.5" />
                                            <ChevronDown size={10} className="-mt-0.5" />
                                         </div>
                                      </div>
                                      {col.rate && (
                                        <div className="w-full h-4 bg-[#f1f5f9] rounded-sm flex items-center justify-center relative overflow-hidden">
                                           <div 
                                              className="absolute inset-y-0 left-0 bg-blue-600 transition-all duration-700" 
                                              style={{ width: col.rate }} 
                                           />
                                           <span className="text-[8px] z-10 font-black" style={{ color: parseFloat(col.rate) > 50 ? 'white' : '#64748b' }}>
                                              {col.rate}
                                           </span>
                                        </div>
                                      )}
                                   </div>
                                 </th>
                               ))}
                               <th className="py-3 px-4 text-[10px] font-black text-slate-400 text-center uppercase min-w-[120px]">操作</th>
                             </tr>
                           </thead>
                           <tbody className="divide-y divide-slate-50">
                             {favoritePatients
                               .filter(matchesFilter)
                               .map((item, idx) => (
                               <tr key={item.id} className="hover:bg-slate-50/50 transition-colors bg-white">
                                 <td className="py-2.5 px-4 w-12 text-center border-r border-slate-50 sticky left-0 bg-white group-hover:bg-slate-50/50 z-10 shadow-[1px_0_0_0_#f8fafc]">
                                    <input 
                                       type="checkbox" 
                                       className="w-3.5 h-3.5 border-slate-300 rounded-[2px] text-blue-600 focus:ring-0" 
                                       checked={selectedPatients.includes(item.id)}
                                       onChange={(e) => {
                                          if (e.target.checked) setSelectedPatients(prev => [...prev, item.id]);
                                          else setSelectedPatients(prev => prev.filter(id => id !== item.id));
                                       }}
                                    />
                                 </td>
                                 <td className="py-2.5 px-4 text-[10px] text-slate-400 text-center border-r border-slate-50 font-bold">{idx + 1}</td>
                                 {patientStatusFilter === '已入组' && (
                                    <>
                                       <td className="py-2.5 px-4 border-r border-slate-50 min-w-[160px]">
                                          <div className="flex flex-wrap gap-1 items-center">
                                             {item.tags && item.tags.length > 0 && item.tags.map(tag => (
                                                <span key={tag} className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-[2px] bg-indigo-50 border border-indigo-100 text-indigo-600 text-[8px] font-bold group">
                                                   <span>{tag}</span>
                                                   <button onClick={(e) => { e.stopPropagation(); handleRemoveTag(item.id, tag); }} className="text-indigo-300 hover:text-indigo-600 hover:bg-indigo-300/30 rounded-[1px] transition-colors flex items-center justify-center pt-px">
                                                      <X size={8} />
                                                   </button>
                                                </span>
                                             ))}
                                          </div>
                                       </td>
                                       <td className="py-2.5 px-4 text-[10px] text-slate-600 font-bold border-r border-slate-50">{item.group || '默认组'}</td>
                                    </>
                                 )}
                                 <td className="py-2.5 px-4 border-r border-slate-50">
                                    <div className="flex items-center gap-2">
                                       <div className="flex-1 h-1.5 bg-blue-100 rounded-full overflow-hidden">
                                          <div className="h-full bg-blue-600" style={{ width: '100%' }} />
                                       </div>
                                       <span className="text-[10px] text-slate-800 font-black min-w-[30px]">100%</span>
                                    </div>
                                 </td>
                                 <td className="py-2.5 px-4 text-[10px] text-slate-600 font-bold border-r border-slate-50">{item.enc}</td>
                                 <td className="py-2.5 px-4 text-[10px] text-slate-600 font-bold border-r border-slate-50">{item.slip}</td>
                                 <td className="py-2.5 px-4 text-[10px] text-slate-800 font-black border-r border-slate-50">
                                    <div className="flex flex-col gap-1 items-start">
                                       <span>{item.name}</span>
                                    </div>
                                 </td>
                                 <td className="py-2.5 px-4 text-[10px] text-slate-500 border-r border-slate-50 font-bold">{item.age}</td>
                                 <td className="py-2.5 px-4 text-[10px] text-slate-500 border-r border-slate-50 font-bold">{item.val1}</td>
                                 <td className="py-2.5 px-4 text-[10px] text-slate-500 border-r border-slate-50 font-bold">{item.val2}</td>
                                 <td className="py-2.5 px-4 text-[10px] text-slate-500 border-r border-slate-50 font-bold">{item.failure}</td>
                                 <td className="py-2.5 px-4 text-[10px] text-slate-500 border-r border-slate-50 font-bold">{item.time}</td>
                                 <td className="py-2.5 px-4 text-[10px] text-slate-500 border-r border-slate-50 font-bold">{item.source}</td>
                                 <td className="py-2.5 px-4 text-[10px] text-slate-500 border-r border-slate-50 font-bold">{item.date}</td>
                                 <td className="py-2.5 px-4 text-[10px] text-center space-x-2">
                                    {item.status !== '已入组' && (
                                       <>
                                          <button onClick={() => handlePatientAudit(item.id, '通过')} className="text-emerald-600 hover:text-emerald-800 font-black">{item.status === '已拒绝' ? '改通过' : '通过'}</button>
                                          {item.status !== '已拒绝' && (
                                             <button onClick={() => handlePatientAudit(item.id, '拒绝')} className="text-amber-600 hover:text-amber-800 font-black">拒绝</button>
                                          )}
                                       </>
                                    )}
                                    {item.status === '已入组' && (
                                       <button className="text-slate-400 hover:text-slate-600 font-bold cursor-not-allowed">已入组</button>
                                    )}
                                    <button className="text-blue-600 hover:text-blue-800 font-black border-l border-slate-200 pl-2 ml-2">详情</button>
                                 </td>
                               </tr>
                             ))}
                           </tbody>
                         </table>
                       </div>
                    </div>

                    {/* Pagination Bar */}
                    <div className="mt-6 flex items-center justify-end gap-6 text-[10px] text-slate-400 font-bold">
                       <span className="tracking-tighter">共4页, 176条 每页</span>
                       <div className="flex items-center gap-1.5 px-2 py-1 bg-white border border-slate-200 rounded-sm cursor-pointer hover:border-blue-400 transition-all text-slate-700">
                          <span className="font-black">50</span>
                          <ChevronDown size={11} className="text-slate-400" />
                       </div>
                       <span className="tracking-tighter">条</span>
                       <div className="flex items-center gap-1.5 px-4">
                          <button className="p-1 hover:bg-white border border-slate-100 rounded-sm text-slate-200 cursor-not-allowed transition-colors bg-slate-50">
                             <ChevronLeft size={16} />
                          </button>
                          {[1, 2, 3, 4].map(p => (
                            <div key={p} className={`w-6 h-6 flex items-center justify-center rounded-sm font-black text-[10px] transition-all cursor-pointer ${p === 1 ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:bg-slate-100'}`}>
                              {p}
                            </div>
                          ))}
                          <button className="p-1 hover:bg-white border border-slate-100 rounded-sm text-slate-400 transition-colors bg-white">
                             <ChevronRight size={16} />
                          </button>
                       </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* Audit Deny Modal */}
          <AnimatePresence>
            {isAuditDenyModalOpen && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-[200] flex items-center justify-center p-4"
              >
                <motion.div 
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  className="bg-white rounded-lg shadow-xl border border-slate-200 w-full max-w-sm overflow-hidden flex flex-col"
                >
                  <div className="p-6 flex flex-col items-center text-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-rose-50 flex items-center justify-center text-rose-500">
                      <AlertCircle size={24} />
                    </div>
                    <div className="flex flex-col gap-1">
                      <h3 className="text-sm font-black text-slate-800">确认审核拒绝</h3>
                      <p className="text-[11px] text-slate-500 font-bold leading-relaxed px-4">
                        确认要审核拒绝？执行拒绝后该数据不会入组，且将删除该就诊记录。
                      </p>
                    </div>
                  </div>
                  <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center gap-3">
                    <button 
                      onClick={() => setIsAuditDenyModalOpen(false)}
                      className="flex-1 py-2 text-xs font-bold text-slate-600 hover:bg-slate-200/50 rounded transition-colors"
                    >
                      取消
                    </button>
                    <button 
                      onClick={confirmAuditDeny}
                      className="flex-1 py-2 text-xs font-black bg-rose-500 text-white rounded shadow-sm hover:bg-rose-600 transition-all focus:ring-2 focus:ring-rose-500/20"
                    >
                      确认拒绝
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}

            {/* Add Favorite Drawer */}
            {isAddFavoriteModalOpen && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-slate-900/40 backdrop-blur-[2px] z-[300] flex justify-end"
              >
                <motion.div 
                  initial={{ x: '100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '100%' }}
                  transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                  className="bg-white shadow-2xl w-full max-w-[640px] h-full flex flex-col relative overflow-hidden"
                >
                  {/* Watermark effect */}
                  <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.03] rotate-[-15deg] scale-150">
                    {Array.from({ length: 20 }).map((_, i) => (
                      <div key={i} className="flex gap-20 whitespace-nowrap py-10 font-black text-4xl">
                        {Array.from({ length: 10 }).map((_, j) => (
                          <span key={j}>test_A 8901</span>
                        ))}
                      </div>
                    ))}
                  </div>

                  {/* Header */}
                  <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 relative z-10 bg-white/80 backdrop-blur-md">
                    <h2 className="text-base font-black text-slate-800">新增患者收藏</h2>
                    <button 
                      onClick={() => setIsAddFavoriteModalOpen(false)}
                      className="p-1 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      <X size={20} />
                    </button>
                  </div>

                  {/* Content */}
                  <div className="flex-1 overflow-y-auto p-8 space-y-6 relative z-10">
                    {/* Name Field */}
                    <div className="flex gap-4">
                      <label className="w-12 pt-2 text-sm font-bold text-slate-600 flex justify-end gap-1">
                        <span className="text-rose-500">*</span>名称
                      </label>
                      <div className="flex-1">
                        <input 
                          type="text" 
                          placeholder="请输入名称" 
                          value={newFavoriteTitle}
                          onChange={(e) => setNewFavoriteTitle(e.target.value)}
                          className="w-full px-3 py-2 bg-white border border-slate-300 rounded focus:outline-none focus:border-blue-500 text-sm placeholder:text-slate-300"
                        />
                      </div>
                    </div>

                    {/* Intro Field */}
                    <div className="flex gap-4">
                      <label className="w-12 pt-2 text-sm font-bold text-slate-600 flex justify-end">
                        简介
                      </label>
                      <div className="flex-1 relative">
                        <textarea 
                          placeholder="请输入简介" 
                          value={newFavoriteIntro}
                          onChange={(e) => setNewFavoriteIntro(e.target.value.slice(0, 200))}
                          className="w-full h-32 px-3 py-2 bg-white border border-slate-300 rounded focus:outline-none focus:border-blue-500 text-sm resize-none placeholder:text-slate-300"
                        />
                        <div className="absolute bottom-2 right-3 text-[10px] text-slate-400 font-bold">
                          {newFavoriteIntro.length} / 200
                        </div>
                      </div>
                    </div>

                    {/* Entry Audit Switch */}
                    <div className="flex gap-4">
                      <label className="w-12 pt-1 text-sm font-bold text-slate-600 flex justify-end">
                        入组审核
                      </label>
                      <div className="flex-1 flex items-center">
                        <button 
                          onClick={() => setIsEntryAuditEnabled(!isEntryAuditEnabled)}
                          className={`relative inline-flex h-5 w-10 items-center rounded-full transition-colors focus:outline-none ${
                            isEntryAuditEnabled ? 'bg-blue-600' : 'bg-slate-200'
                          }`}
                        >
                          <span
                            className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
                              isEntryAuditEnabled ? 'translate-x-5.5' : 'translate-x-1'
                            }`}
                          />
                        </button>
                        <span className="ml-2 text-xs font-bold text-slate-400">
                          {isEntryAuditEnabled ? '开启' : '关闭'}
                        </span>
                      </div>
                    </div>

                    {/* Entry Auditor Field */}
                    {isEntryAuditEnabled && (
                      <div className="flex gap-4">
                        <label className="w-12 pt-1 text-sm font-bold text-slate-600 flex justify-end">
                          审核人
                        </label>
                        <div className="flex-1 space-y-3 relative">
                          <button 
                            onClick={() => setIsAuditorSelectorOpen(!isAuditorSelectorOpen)}
                            className="px-4 py-1 border border-slate-300 rounded text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors flex items-center gap-1"
                          >
                            添加审核人 <ChevronDown size={14} className={`transition-transform ${isAuditorSelectorOpen ? 'rotate-180' : ''}`} />
                          </button>
                          
                          {isAuditorSelectorOpen && (
                            <div className="absolute top-8 left-0 z-20 w-48 bg-white border border-slate-200 shadow-lg rounded py-1 max-h-48 overflow-y-auto">
                              {availableUsers.map(user => {
                                const isSelected = newFavoriteAuditors.some(a => a.id === user.id);
                                return (
                                  <button
                                    key={user.id}
                                    onClick={() => handleToggleAuditor(user)}
                                    className="w-full text-left px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors flex items-center justify-between"
                                  >
                                    <span>{user.name}</span>
                                    {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />}
                                  </button>
                                );
                              })}
                            </div>
                          )}

                          <div className="flex flex-wrap gap-2">
                            {newFavoriteAuditors.map(auditor => (
                              <div key={auditor.id} className="flex items-center gap-2 px-2 py-1 bg-slate-50 border border-slate-200 rounded">
                                <span className="text-xs font-bold text-slate-700">{auditor.name}</span>
                                <button 
                                  onClick={() => handleRemoveAuditor(auditor.id)}
                                  className="text-slate-400 hover:text-rose-500 transition-colors"
                                >
                                  <X size={12} />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Members Field */}
                    <div className="flex gap-4">
                      <label className="w-12 pt-1 text-sm font-bold text-slate-600 flex justify-end">
                        成员
                      </label>
                      <div className="flex-1 space-y-4">
                        <button className="px-4 py-1 border border-slate-300 rounded text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors">
                          添加成员
                        </button>

                        <div className="border border-slate-200 rounded overflow-hidden">
                          <table className="w-full text-xs">
                            <thead className="bg-[#f8f9fb]">
                              <tr className="border-b border-slate-200">
                                <th className="px-4 py-2 font-black text-slate-500 text-center border-r border-slate-200">成员</th>
                                <th className="px-4 py-2 font-black text-slate-500 text-center">权限</th>
                              </tr>
                            </thead>
                            <tbody className="bg-white">
                              {newFavoriteMembers.map((member, idx) => (
                                <tr key={member.id} className="border-b last:border-0 border-slate-200">
                                  <td className="px-4 py-3 border-r border-slate-200">
                                    <div className="flex items-center justify-between">
                                      <span className="text-slate-700 font-bold">{member.name}</span>
                                      <button 
                                        className="text-rose-400 hover:text-rose-600 p-1 hover:bg-rose-50 rounded transition-colors"
                                        title="删除成员"
                                      >
                                        <Trash2 size={14} />
                                      </button>
                                    </div>
                                  </td>
                                  <td className="px-4 py-3">
                                    <div className="flex flex-col gap-2 justify-center">
                                      <label className="flex items-center gap-1.5 cursor-pointer group">
                                        <input 
                                          type="checkbox" 
                                          checked={member.permissions.includes('details')}
                                          readOnly
                                          className="w-3.5 h-3.5 rounded border-slate-300 text-blue-600 focus:ring-0 focus:ring-offset-0"
                                        />
                                        <span className="text-slate-600 font-bold group-hover:text-blue-600 transition-colors">查看详情</span>
                                      </label>
                                      <label className="flex items-center gap-1.5 cursor-pointer group">
                                        <input 
                                          type="checkbox" 
                                          checked={member.permissions.includes('export')}
                                          readOnly
                                          className="w-3.5 h-3.5 rounded border-slate-300 text-blue-600 focus:ring-0 focus:ring-offset-0"
                                        />
                                        <span className="text-slate-600 font-bold group-hover:text-blue-600 transition-colors">导出</span>
                                      </label>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-100 bg-white relative z-10 mt-auto">
                    <button 
                      onClick={() => setIsAddFavoriteModalOpen(false)}
                      className="px-6 py-1.5 border border-slate-300 rounded text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors"
                    >
                      取消
                    </button>
                    <button 
                      onClick={() => {
                        setIsAddFavoriteModalOpen(false);
                      }}
                      className="px-6 py-1.5 bg-blue-600 text-white rounded text-sm font-black hover:bg-blue-700 transition-colors shadow-sm"
                    >
                      确定
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Insight Queue Subscription Modal - 图1 UI 规范 */}
          <AnimatePresence>
            {isInsightSubscriptionModalOpen && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-[200] flex items-center justify-center p-4"
              >
                <motion.div 
                  initial={{ scale: 0.96, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.96, opacity: 0 }}
                  className="bg-white rounded-xl shadow-2xl border border-slate-200/80 w-full max-w-5xl h-[88vh] flex flex-col overflow-hidden text-slate-800"
                >
                  {/* Modal Header */}
                  <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-white shrink-0">
                    <h3 className="text-base font-black text-slate-900">订阅设置</h3>
                    <button 
                      onClick={() => setIsInsightSubscriptionModalOpen(false)}
                      className="text-slate-400 hover:text-slate-600 p-1 rounded hover:bg-slate-100 transition-colors"
                    >
                      <X size={20} />
                    </button>
                  </div>

                  {/* Modal Body */}
                  <div className="flex-1 overflow-y-auto p-6 space-y-5">
                    {/* Title with Patient Favorite Dropdown Single Select */}
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-black text-slate-500 whitespace-nowrap">目标患者收藏:</span>
                      <select 
                        value={selectedSubscriptionTarget}
                        onChange={(e) => setSelectedSubscriptionTarget(e.target.value)}
                        className="text-xl font-black text-slate-900 bg-white border border-slate-300 rounded-lg px-3.5 py-1.5 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all cursor-pointer min-w-[360px]"
                      >
                        <option value="肝炎&肝癌">肝炎&肝癌</option>
                        <option value="【对比主视角方案】食管癌术后复发风险队列 (精简主方案)">【对比主视角方案】食管癌术后复发风险队列 (精简主方案)</option>
                        <option value="胃癌免疫治疗受试队列 (420例患者 / 485份病历)">胃癌免疫治疗受试队列 (420例患者 / 485份病历)</option>
                        <option value="导出测试 (0例患者 / 0份病历)">导出测试 (0例患者 / 0份病历)</option>
                        <option value="1 (12,914例患者 / 391,533份病历)">1 (12,914例患者 / 391,533份病历)</option>
                        <option value="1111 (904例患者 / 875份病历)">1111 (904例患者 / 875份病历)</option>
                      </select>
                    </div>

                    {/* Subscription Controls Grid */}
                    <div className="space-y-3 text-xs font-bold text-slate-600 pt-1">
                      {/* Row 1: Status, Date, Exec Freq */}
                      <div className="flex items-center gap-8 flex-wrap">
                        <div className="flex items-center gap-2">
                          <span>订阅状态:</span>
                          <button 
                            onClick={() => setSubStatus(!subStatus)}
                            className={`relative inline-flex h-5 w-10 items-center rounded-full transition-colors focus:outline-none ${
                              subStatus ? 'bg-blue-600' : 'bg-slate-300'
                            }`}
                          >
                            <span
                              className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
                                subStatus ? 'translate-x-5.5' : 'translate-x-1'
                              }`}
                            />
                          </button>
                          <span className={subStatus ? 'text-blue-600 font-bold' : 'text-slate-400 font-bold'}>
                            {subStatus ? '开' : '关'}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <span>起止时间:</span>
                          <div className="flex items-center gap-1.5 border border-slate-300 bg-white rounded-lg px-2.5 py-1 text-slate-800 font-medium">
                            <Calendar size={14} className="text-slate-400" />
                            <input 
                              type="text" 
                              value={subStartDate} 
                              onChange={(e) => setSubStartDate(e.target.value)}
                              className="w-20 bg-transparent text-center focus:outline-none" 
                            />
                            <span className="text-slate-400">至</span>
                            <input 
                              type="text" 
                              value={subEndDate} 
                              onChange={(e) => setSubEndDate(e.target.value)}
                              className="w-20 bg-transparent text-center focus:outline-none" 
                            />
                            <ChevronDown size={14} className="text-slate-400" />
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <span>执行频率:</span>
                          <select 
                            value={subExecFreq}
                            onChange={(e) => setSubExecFreq(e.target.value)}
                            className="border border-slate-300 bg-white rounded-lg px-3 py-1 font-medium text-slate-800 focus:outline-none focus:border-blue-500"
                          >
                            <option>每天</option>
                            <option>每周一</option>
                            <option>每月1号</option>
                            <option>实时触发</option>
                          </select>
                        </div>
                      </div>

                      {/* Row 2: Target & Float Ratio */}
                      <div className="flex items-center gap-8 flex-wrap">
                        <div className="flex items-center gap-2">
                          <span>入组目标:</span>
                          <select 
                            value={subGoalType}
                            onChange={(e) => setSubGoalType(e.target.value)}
                            className="border border-slate-300 bg-white rounded-lg px-2.5 py-1 font-medium text-slate-800 focus:outline-none"
                          >
                            <option>病历数</option>
                            <option>患者数</option>
                          </select>
                          <input 
                            type="text" 
                            value={subGoalCount}
                            onChange={(e) => setSubGoalCount(e.target.value)}
                            className="w-16 border border-slate-300 bg-white rounded-lg px-2 py-1 text-center font-medium text-slate-800 focus:outline-none"
                          />
                        </div>

                        <div className="flex items-center gap-2">
                          <span>浮动比例:</span>
                          <select 
                            value={subFloatRatio}
                            onChange={(e) => setSubFloatRatio(e.target.value)}
                            className="border border-slate-300 bg-white rounded-lg px-3 py-1 font-medium text-slate-800 focus:outline-none min-w-[150px]"
                          >
                            <option>请选择浮动比例</option>
                            <option>5%</option>
                            <option>10%</option>
                            <option>15%</option>
                            <option>20%</option>
                            <option>不限</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Subscription Conditions Summary Box */}
                    <div className="p-4 bg-blue-50/50 border border-blue-100/90 rounded-xl space-y-2 text-xs font-medium text-slate-700">
                      <div className="flex items-center gap-2 text-blue-800 font-black mb-1">
                        <span className="w-2 h-2 rounded-full bg-blue-600" />
                        <span>订阅条件</span>
                      </div>
                      <p className="leading-relaxed">
                        <strong className="text-slate-800 font-bold">纳入条件1:</strong> 院区: <span className="text-blue-600 font-bold">全院</span>; 就诊类型: <span className="text-slate-500">undefined</span>;
                      </p>
                      <p className="leading-relaxed">
                        <strong className="text-slate-800 font-bold">纳入条件2:</strong> 同一次就诊: 诊断信息/原始诊断名称 包含 <span className="text-blue-600 font-bold">肝炎</span>;
                      </p>
                      <p className="leading-relaxed">
                        <strong className="text-slate-800 font-bold">纳入基线事件:</strong> 同一次就诊: <span className="bg-blue-600 text-white text-[10px] px-1.5 py-0.5 rounded font-bold">首次</span> 就诊信息/就诊日期 不为空;
                      </p>
                      <p className="leading-relaxed">
                        <strong className="text-slate-800 font-bold">纳入其他事件1:</strong> 同一次就诊: <span className="bg-blue-600 text-white text-[10px] px-1.5 py-0.5 rounded font-bold">总次数 ≥ 3</span> 生化/乳酸 不为空;
                      </p>
                      <p className="leading-relaxed">
                        <strong className="text-slate-800 font-bold">排除条件1:</strong> 同一次就诊;
                      </p>
                    </div>

                    {/* Inclusion / Exclusion Tabs and Action Button */}
                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
                        <button 
                          onClick={() => setSubConditionTab('inclusion')}
                          className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                            subConditionTab === 'inclusion' 
                              ? 'bg-white text-blue-600 shadow-xs' 
                              : 'text-slate-500 hover:text-slate-800'
                          }`}
                        >
                          纳入标准
                        </button>
                        <button 
                          onClick={() => setSubConditionTab('exclusion')}
                          className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                            subConditionTab === 'exclusion' 
                              ? 'bg-white text-blue-600 shadow-xs' 
                              : 'text-slate-500 hover:text-slate-800'
                          }`}
                        >
                          排除标准
                        </button>
                      </div>

                      <button 
                        onClick={() => setToastMessage("已成功引用当前检索收藏条件！")}
                        className="flex items-center gap-1.5 px-3.5 py-1.5 bg-blue-50 text-blue-600 border border-blue-200/80 rounded-xl text-xs font-bold hover:bg-blue-100 transition-colors"
                      >
                        <FileText size={14} />
                        <span>引用检索收藏条件</span>
                      </button>
                    </div>

                    {/* Filter Conditions Visual Builder Block */}
                    <div className="p-5 bg-slate-50/80 rounded-2xl border border-slate-200/80 space-y-4">
                      <div className="flex items-center justify-between">
                        <button 
                          onClick={() => setToastMessage("扩展纳入条件框已添加")}
                          className="flex items-center gap-1.5 px-4 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-bold hover:bg-blue-700 shadow-xs transition-all"
                        >
                          <Plus size={14} />
                          <span>纳入条件</span>
                        </button>

                        <div className="flex items-center gap-3 text-slate-500 text-xs bg-white border border-slate-200 rounded-lg px-2.5 py-1">
                          <button onClick={() => setSubConditionCanvasZoom(prev => Math.max(50, prev - 10))} className="hover:text-slate-800 font-bold">-</button>
                          <span className="font-bold text-slate-700 min-w-[36px] text-center">{subConditionCanvasZoom}%</span>
                          <button onClick={() => setSubConditionCanvasZoom(prev => Math.min(150, prev + 10))} className="hover:text-slate-800 font-bold">+</button>
                          <span className="text-slate-300">|</span>
                          <Grid size={14} className="hover:text-slate-800 cursor-pointer" />
                        </div>
                      </div>

                      {/* Condition Builder Card Item */}
                      <div className="bg-white rounded-xl border border-slate-200/90 p-4 flex items-center gap-3 flex-wrap shadow-2xs">
                        <span className="text-xs font-black text-slate-800">纳入条件1</span>
                        <select className="border border-slate-200 rounded px-2.5 py-1 text-xs font-bold text-slate-700 bg-slate-50 outline-none focus:bg-white focus:border-blue-500">
                          <option>全院</option>
                          <option>东院区</option>
                          <option>西院区</option>
                        </select>
                        <select className="border border-slate-200 rounded px-2.5 py-1 text-xs font-bold text-slate-700 bg-slate-50 outline-none focus:bg-white focus:border-blue-500">
                          <option>0</option>
                          <option>1</option>
                          <option>2</option>
                        </select>
                        <select className="border border-slate-200 rounded px-2.5 py-1 text-xs font-bold text-slate-700 bg-slate-50 outline-none focus:bg-white focus:border-blue-500">
                          <option>就诊科室</option>
                          <option>消化内科</option>
                          <option>胸外科</option>
                          <option>肿瘤科</option>
                        </select>
                        <div className="flex items-center gap-1.5 border border-slate-200 rounded px-2.5 py-1 text-xs bg-slate-50">
                          <Calendar size={13} className="text-slate-400" />
                          <span className="text-slate-400">选择日期</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Modal Footer */}
                  <div className="px-6 py-3.5 border-t border-slate-200 bg-white flex items-center justify-end gap-3 shrink-0">
                    <button 
                      onClick={() => setIsInsightSubscriptionModalOpen(false)}
                      className="px-6 py-2 border border-slate-300 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors"
                    >
                      取消
                    </button>
                    <button 
                      onClick={() => {
                        setToastMessage(`已成功保存【${selectedSubscriptionTarget}】的订阅设置！`);
                        setIsInsightSubscriptionModalOpen(false);
                      }}
                      className="px-6 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition-all shadow-md shadow-blue-500/20 active:scale-95"
                    >
                      保存设置
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {isTagModalOpen && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-[200] flex items-center justify-center p-4"
              >
                <motion.div 
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  className="bg-white rounded-lg shadow-xl border border-slate-200 w-full max-w-md overflow-hidden flex flex-col"
                >
                  <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                    <div className="flex flex-col">
                      <h3 className="text-sm font-black text-slate-800">打标签</h3>
                      <p className="text-[10px] text-slate-400 font-bold mt-0.5">为选中的 {selectedPatients.length} 位患者添加标签</p>
                    </div>
                    <button onClick={() => setIsTagModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                      <X size={18} />
                    </button>
                  </div>
                  <div className="p-6 flex flex-col gap-5">
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                          <label className="text-[11px] font-bold text-slate-700">待选标签 (可多选)</label>
                          <button 
                            onClick={() => {
                              setIsManagingTags(!isManagingTags);
                              setIsAddingNewTag(false);
                              setEditingTagIndex(null);
                            }}
                            className="text-[10px] font-bold text-blue-600 hover:text-blue-700"
                          >
                            {isManagingTags ? '完成管理' : '管理标签'}
                          </button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {availableTags.map((t, idx) => {
                            const isSelected = selectedTagsInModal.includes(t);

                            return (
                              <div key={idx} className="flex items-center gap-1">
                                {isManagingTags ? (
                                  <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 rounded px-2 py-1">
                                    {editingTagIndex === idx ? (
                                      <div className="flex items-center gap-1">
                                        <input 
                                          autoFocus
                                          value={editingTagValue}
                                          onChange={(e) => setEditingTagValue(e.target.value)}
                                          onBlur={() => {
                                            if (editingTagValue.trim() && editingTagValue !== t) {
                                              const newTags = [...availableTags];
                                              newTags[idx] = editingTagValue.trim();
                                              setAvailableTags(newTags);
                                            }
                                            setEditingTagIndex(null);
                                          }}
                                          onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                              if (editingTagValue.trim() && editingTagValue !== t) {
                                                const newTags = [...availableTags];
                                                newTags[idx] = editingTagValue.trim();
                                                setAvailableTags(newTags);
                                              }
                                              setEditingTagIndex(null);
                                            }
                                          }}
                                          className="w-20 text-[10px] font-bold outline-none bg-white border border-blue-200 px-1 rounded"
                                        />
                                        <button onClick={() => setEditingTagIndex(null)} className="text-emerald-500"><Check size={12} /></button>
                                      </div>
                                    ) : (
                                      <>
                                        <span className="text-[10px] font-bold text-slate-600">{t}</span>
                                        <button 
                                          onClick={() => {
                                            setEditingTagIndex(idx);
                                            setEditingTagValue(t);
                                          }}
                                          className="text-slate-400 hover:text-blue-600"
                                        >
                                          <Pencil size={10} />
                                        </button>
                                        <button 
                                          onClick={() => setAvailableTags(availableTags.filter((_, i) => i !== idx))}
                                          className="text-slate-400 hover:text-rose-500"
                                        >
                                          <Trash2 size={10} />
                                        </button>
                                      </>
                                    )}
                                  </div>
                                ) : (
                                  <button 
                                    onClick={() => {
                                      if (isSelected) {
                                        setSelectedTagsInModal(selectedTagsInModal.filter(tag => tag !== t));
                                      } else {
                                        setSelectedTagsInModal([...selectedTagsInModal, t]);
                                      }
                                    }}
                                    className={`px-2 py-1 border rounded text-[10px] font-bold transition-all ${
                                      isSelected
                                        ? 'bg-blue-600 border-blue-600 text-white shadow-sm'
                                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600'
                                    }`}
                                  >
                                    {t}
                                  </button>
                                )}
                              </div>
                            );
                          })}
                          
                          {/* Inline Add Interaction */}
                          {isAddingNewTag ? (
                            <div className="flex items-center gap-1">
                               <input 
                                  autoFocus
                                  type="text"
                                  className="w-24 px-2 py-1 border border-blue-400 rounded text-[10px] font-bold outline-none placeholder:text-slate-300"
                                  placeholder="标签名称"
                                  value={newTagName}
                                  onChange={(e) => setNewTagName(e.target.value)}
                                  onBlur={() => {
                                     if (newTagName.trim() && !availableTags.includes(newTagName.trim())) {
                                        setAvailableTags([...availableTags, newTagName.trim()]);
                                        setSelectedTagsInModal([...selectedTagsInModal, newTagName.trim()]);
                                     }
                                     setIsAddingNewTag(false);
                                     setNewTagName('');
                                  }}
                                  onKeyDown={(e) => {
                                     if (e.key === 'Enter') {
                                        if (newTagName.trim() && !availableTags.includes(newTagName.trim())) {
                                           setAvailableTags([...availableTags, newTagName.trim()]);
                                           setSelectedTagsInModal([...selectedTagsInModal, newTagName.trim()]);
                                        }
                                        setIsAddingNewTag(false);
                                        setNewTagName('');
                                     }
                                  }}
                               />
                            </div>
                          ) : (
                            <button 
                              onClick={() => setIsAddingNewTag(true)}
                              className="px-2 py-1 border border-dashed border-slate-300 rounded text-[10px] font-bold text-slate-400 hover:text-blue-600 hover:border-blue-300 flex items-center gap-1 transition-colors"
                            >
                              <Plus size={10} />
                              <span>添加</span>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-3">
                    <button 
                      onClick={() => {
                         setIsTagModalOpen(false);
                         setSelectedTagsInModal([]);
                      }}
                      className="px-4 py-1.5 text-xs font-bold text-slate-600 hover:bg-slate-200/50 rounded transition-colors"
                    >
                      取消
                    </button>
                    <button 
                      onClick={handleApplyTagsToSelected}
                      disabled={selectedTagsInModal.length === 0}
                      className={`px-4 py-1.5 text-xs font-black rounded shadow-sm transition-all ${
                        selectedTagsInModal.length > 0 
                          ? 'bg-blue-600 text-white hover:bg-blue-700' 
                          : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                      }`}
                    >
                      确认添加
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Add Metric Modal */}
          <AnimatePresence>
            {isAddMetricModalOpen && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs"
              >
                <motion.div 
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-slate-100"
                >
                  <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                    <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                      <Plus size={16} className="text-blue-600" />
                      <span>添加分析指标</span>
                    </h3>
                    <button 
                      onClick={() => setIsAddMetricModalOpen(false)}
                      className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
                    >
                      <X size={16} />
                    </button>
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-600">选择指标名称</label>
                      <select 
                        value={selectedMetricToAdd}
                        onChange={(e) => setSelectedMetricToAdd(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs font-medium outline-none focus:border-blue-500 bg-white"
                      >
                        <option value="住院天数">住院天数 (连续型)</option>
                        <option value="住院总费用">住院总费用 (连续型)</option>
                        <option value="ALT(丙氨酸氨基转移酶)">ALT (丙氨酸氨基转移酶)</option>
                        <option value="AST(天门冬氨酸氨基转移酶)">AST (天门冬氨酸氨基转移酶)</option>
                        <option value="WBC(白细胞计数)">WBC (白细胞计数)</option>
                        <option value="收缩压">收缩压 (mmHg)</option>
                        <option value="舒张压">舒张压 (mmHg)</option>
                      </select>
                    </div>
                    <div className="p-3 bg-blue-50/50 rounded-xl border border-blue-100 text-[11px] text-blue-700 leading-relaxed">
                      💡 提示：系统将全量检索并计算所选指标在当前人群队列中的有效值、缺失值、均值及极值统计分布图。
                    </div>
                  </div>
                  <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-3">
                    <button 
                      onClick={() => setIsAddMetricModalOpen(false)}
                      className="px-4 py-1.5 text-xs font-bold text-slate-600 hover:bg-slate-200/50 rounded-lg transition-colors"
                    >
                      取消
                    </button>
                    <button 
                      onClick={() => {
                        const newId = 'm_' + Date.now();
                        const newItem = {
                          id: newId,
                          name: selectedMetricToAdd,
                          type: '连续型',
                          fillRate: '98.5%',
                          validCount: '12510',
                          missingCount: '197',
                          meanStd: '14.8 ± 6.2',
                          median: '12',
                          min: '1',
                          max: '120',
                          chartType: 'bar',
                          viewMode: 'chart' as const,
                          chartData: [
                            { name: '[0, 5)', value: 1200 },
                            { name: '[5, 10)', value: 4500 },
                            { name: '[10, 15)', value: 5200 },
                            { name: '[15, 20)', value: 1100 },
                            { name: '[20, 30)', value: 510 }
                          ]
                        };
                        setAnalysisMetricItems(prev => [newItem, ...prev]);
                        setIsAddMetricModalOpen(false);
                      }}
                      className="px-4 py-1.5 text-xs font-bold rounded-lg bg-blue-600 text-white hover:bg-blue-700 shadow-sm transition-all"
                    >
                      确认添加
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {activePage === 'form-builder' && (
            <motion.div 
              key="form-builder"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex bg-[#f0f2f5] overflow-hidden h-screen"
            >
              {/* Center Canvas */}
              <div className="flex-1 flex flex-col overflow-hidden">
                {/* Canvas Toolbar */}
                <div className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0">
                  <div className="flex items-center gap-4">
                    <button onClick={() => setActivePage('data-center')} className="p-2 hover:bg-slate-100 rounded-full text-slate-400">
                      <ArrowLeft size={20} />
                    </button>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-4 bg-indigo-600 rounded-full"></div>
                      <span className="font-black text-slate-800">测试</span>
                      <span className="text-[10px] text-slate-400 ml-2">最近更新时间：2026-03-30 14:18</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => setIsAiFormModalOpen(true)}
                      className="px-3 py-1.5 border border-indigo-200 text-indigo-600 bg-indigo-50 text-[10px] font-bold rounded flex items-center gap-1.5 hover:bg-indigo-100 transition-colors shadow-sm"
                    >
                      <Sparkles size={12} fill="currentColor" /> CRF表单模板
                    </button>
                    <button 
                      onClick={() => setIsStandardDataSetModalOpen(true)}
                      className="px-3 py-1.5 border border-emerald-200 text-emerald-600 bg-emerald-50 text-[10px] font-bold rounded flex items-center gap-1.5 hover:bg-emerald-100 transition-colors shadow-sm"
                    >
                      <Database size={12} /> 标准数据集指标
                    </button>
                    <div className="w-[1px] h-4 bg-slate-200 mx-1"></div>
                    <button className="px-3 py-1.5 border border-slate-200 text-slate-600 text-[10px] font-bold rounded hover:bg-slate-50">另存模板</button>
                    <button className="px-3 py-1.5 border border-slate-200 text-slate-600 text-[10px] font-bold rounded hover:bg-slate-50">引用模板</button>
                    <button 
                      onClick={() => setIsBuilderUsageModalOpen(true)}
                      className="px-3 py-1.5 border border-slate-200 text-slate-600 text-[10px] font-bold rounded hover:bg-slate-50"
                    >
                      设置表单属性
                    </button>
                    <button 
                      onClick={() => {
                        const newForm = {
                          id: 'f' + (projectForms.length + 1),
                          name: builderFormName,
                          permission: '个人',
                          configurator: 'nvnanying11',
                          configTime: new Date().toLocaleString('zh-CN', { hour12: false }).replace(/\//g, '-'),
                          enabled: true,
                          verifyLevel: 'high',
                          qrValue: window.location.origin + '?mode=patient&form=f' + (projectForms.length + 1),
                          usage: builderUsage,
                          folderId: builderFolderId
                        };
                        setProjectForms([...projectForms, newForm]);
                        setActivePage('data-center');
                      }}
                      className="px-4 py-1.5 bg-indigo-50 text-indigo-600 text-[10px] font-bold rounded hover:bg-indigo-100"
                    >
                      保存
                    </button>
                    <button className="px-4 py-1.5 bg-indigo-600 text-white text-[10px] font-bold rounded shadow-lg shadow-indigo-100 hover:bg-indigo-700">预览</button>
                  </div>
                </div>

                {/* Canvas Area */}
                <div className="flex-1 overflow-y-auto p-8 flex justify-center">
                  <div className="w-full max-w-4xl bg-white shadow-sm min-h-[1000px] p-10 space-y-6">
                    {/* Field: 报告编号 */}
                    <div className="group relative border border-dashed border-slate-200 p-4 rounded hover:border-indigo-400 transition-all">
                      <div className="flex items-center">
                        <label className="w-32 text-xs font-bold text-slate-700">报告编号</label>
                        <div className="flex-1 h-8 bg-slate-50 border border-slate-100 rounded"></div>
                      </div>
                    </div>

                    {/* Field: 姓名 */}
                    <div className="group relative border border-dashed border-slate-200 p-4 rounded hover:border-indigo-400 transition-all">
                      <div className="flex items-center">
                        <label className="w-32 text-xs font-bold text-slate-700">姓名</label>
                        <div className="flex-1 h-8 bg-slate-50 border border-slate-100 rounded"></div>
                      </div>
                    </div>

                    {/* Field: 性别 */}
                    <div className="group relative border border-dashed border-slate-200 p-4 rounded hover:border-indigo-400 transition-all">
                      <div className="flex items-center">
                        <label className="w-32 text-xs font-bold text-slate-700">性别</label>
                        <div className="flex-1 h-8 bg-slate-50 border border-slate-100 rounded"></div>
                      </div>
                    </div>

                    {/* Field: 表格表单 */}
                    <div className="group relative border border-dashed border-indigo-400 p-4 rounded bg-indigo-50/5">
                      <div className="flex">
                        <label className="w-32 text-xs font-bold text-slate-700">表格表单</label>
                        <div className="flex-1 grid grid-cols-3 gap-0 border border-slate-200 rounded overflow-hidden">
                          <div className="border-r border-slate-200 p-3 bg-slate-50 text-[10px] font-bold text-slate-500">致病/可能致病突变位点</div>
                          <div className="border-r border-slate-200 p-3 bg-slate-50 text-[10px] font-bold text-slate-500">物理位点</div>
                          <div className="p-3 bg-slate-50 text-[10px] font-bold text-slate-500">突变比例</div>
                          <div className="border-r border-t border-slate-200 p-6 text-[10px] text-slate-300 text-center italic">拖拽右侧列表中的组件到此处</div>
                          <div className="border-r border-t border-slate-200 p-6 text-[10px] text-slate-300 text-center italic">拖拽右侧列表中的组件到此处</div>
                          <div className="border-t border-slate-200 p-6 text-[10px] text-slate-300 text-center italic">拖拽右侧列表中的组件到此处</div>
                        </div>
                      </div>
                    </div>

                    {/* Field: 子表单 */}
                    <div className="group relative border border-dashed border-slate-200 p-4 rounded hover:border-indigo-400 transition-all">
                      <div className="flex">
                        <label className="w-32 text-xs font-bold text-slate-700">子表单</label>
                        <div className="flex-1 space-y-2">
                          <div className="p-3 border border-slate-200 rounded bg-slate-50 text-[10px] font-bold text-slate-500">致病/可能致病突变</div>
                          <div className="p-3 border border-slate-200 rounded bg-slate-50 text-[10px] font-bold text-slate-500">物理位点</div>
                          <div className="p-3 border border-slate-200 rounded bg-slate-50 text-[10px] font-bold text-slate-500">突变比例</div>
                          <div className="p-3 border border-slate-200 rounded bg-slate-50 text-[10px] font-bold text-slate-500">突变致病性</div>
                        </div>
                      </div>
                    </div>

                    {/* Field: 上传 */}
                    <div className="group relative border-2 border-indigo-600 p-4 rounded bg-white">
                      <div className="absolute -left-0.5 -top-0.5 bg-indigo-600 text-white p-1 rounded-tl rounded-br">
                        <Layout size={12} />
                      </div>
                      <div className="flex">
                        <label className="w-32 text-xs font-bold text-slate-700">上传</label>
                        <div className="flex-1">
                          <div className="w-32 h-32 border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center text-slate-300 hover:border-indigo-300 hover:text-indigo-400 transition-all cursor-pointer">
                            <Upload size={24} />
                          </div>
                        </div>
                      </div>
                      <div className="absolute right-2 bottom-2 flex gap-1">
                        <div className="p-1 bg-indigo-600 text-white rounded cursor-pointer"><Copy size={12} /></div>
                        <div className="p-1 bg-red-500 text-white rounded cursor-pointer"><Trash2 size={12} /></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Sidebar: Widgets & Config */}
              <div className="w-80 bg-white border-l border-slate-200 flex flex-col overflow-hidden">
                {/* Widget List */}
                <div className="flex-1 flex flex-col overflow-hidden border-b border-slate-200">
                  <div className="p-4 border-b border-slate-100 flex items-center gap-2">
                    <div className="w-1 h-4 bg-indigo-600 rounded-full"></div>
                    <h3 className="text-sm font-black text-slate-800">控件列表</h3>
                  </div>
                  <div className="flex-1 overflow-y-auto p-4 space-y-6">
                    {/* Basic Widgets */}
                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-xs font-black text-slate-800">基础组件</span>
                        <ChevronUp size={14} className="text-slate-400" />
                      </div>
                      <div className="grid grid-cols-4 gap-2">
                        {[
                          { icon: Type, label: '输入框' },
                          { icon: List, label: '多行输入框' },
                          { icon: Hash, label: '计数器' },
                          { icon: CheckSquare, label: '单选框' },
                          { icon: Grid, label: '多选框' },
                          { icon: ChevronDownIcon, label: '选择器' },
                          { icon: Activity, label: '开关' },
                          { icon: Calendar, label: '日期' },
                          { icon: Calendar, label: '日期区间' },
                          { icon: Upload, label: '上传' }
                        ].map((w, i) => (
                          <div key={i} className="flex flex-col items-center gap-2 p-2 border border-slate-100 rounded hover:border-indigo-200 hover:bg-indigo-50/30 cursor-move transition-all group">
                            <w.icon size={18} className="text-slate-400 group-hover:text-indigo-600" />
                            <span className="text-[9px] text-slate-500 font-medium">{w.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Sub-form Widgets */}
                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-xs font-black text-slate-800">子表单组件</span>
                        <ChevronUp size={14} className="text-slate-400" />
                      </div>
                      <div className="grid grid-cols-4 gap-2">
                        {[
                          { icon: Columns, label: '子表单' },
                          { icon: Layout, label: '分组' },
                          { icon: Grid, label: '表格表单' }
                        ].map((w, i) => (
                          <div key={i} className="flex flex-col items-center gap-2 p-2 border border-slate-100 rounded hover:border-indigo-200 hover:bg-indigo-50/30 cursor-move transition-all group">
                            <w.icon size={18} className="text-slate-400 group-hover:text-indigo-600" />
                            <span className="text-[9px] text-slate-500 font-medium">{w.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Auxiliary Widgets */}
                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-xs font-black text-slate-800">辅助组件</span>
                        <ChevronUp size={14} className="text-slate-400" />
                      </div>
                      <div className="grid grid-cols-4 gap-2">
                        {[
                          { icon: Info, label: '提示' },
                          { icon: TextIcon, label: '文字' },
                          { icon: Minus, label: '分割线' }
                        ].map((w, i) => (
                          <div key={i} className="flex flex-col items-center gap-2 p-2 border border-slate-100 rounded hover:border-indigo-200 hover:bg-indigo-50/30 cursor-move transition-all group">
                            <w.icon size={18} className="text-slate-400 group-hover:text-indigo-600" />
                            <span className="text-[9px] text-slate-500 font-medium">{w.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Matrix Widgets */}
                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-xs font-black text-slate-800">矩阵</span>
                        <ChevronUp size={14} className="text-slate-400" />
                      </div>
                      <div className="grid grid-cols-4 gap-2">
                        {[
                          { icon: CheckSquare, label: '矩阵单选' },
                          { icon: Grid, label: '矩阵多选' }
                        ].map((w, i) => (
                          <div key={i} className="flex flex-col items-center gap-2 p-2 border border-slate-100 rounded hover:border-indigo-200 hover:bg-indigo-50/30 cursor-move transition-all group">
                            <w.icon size={18} className="text-slate-400 group-hover:text-indigo-600" />
                            <span className="text-[9px] text-slate-500 font-medium">{w.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Config Panel */}
                <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-slate-50/30">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-1 h-4 bg-indigo-600 rounded-full"></div>
                    <h3 className="text-sm font-black text-slate-800">表单及组件配置</h3>
                  </div>

                  <div className="p-4 bg-white border border-slate-100 rounded-2xl space-y-4 shadow-sm">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-500">表单名称</label>
                      <input 
                        type="text" 
                        value={builderFormName} 
                        onChange={e => setBuilderFormName(e.target.value)}
                        className="w-full px-3 py-1.5 bg-slate-50 border border-slate-100 rounded text-xs outline-none focus:border-indigo-400" 
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-500">标签的位置</label>
                      <div className="flex gap-4">
                        {['左对齐', '右对齐', '顶部'].map((pos, i) => (
                          <label key={i} className="flex items-center gap-1.5 cursor-pointer">
                            <div className={`w-3 h-3 rounded-full border-2 flex items-center justify-center ${i === 1 ? 'border-indigo-600' : 'border-slate-300'}`}>
                              {i === 1 && <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full"></div>}
                            </div>
                            <span className="text-[10px] text-slate-600">{pos}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-500">表单的尺寸</label>
                      <div className="flex gap-4">
                        {['大', '默认', '小'].map((size, i) => (
                          <label key={i} className="flex items-center gap-1.5 cursor-pointer">
                            <div className={`w-3 h-3 rounded-full border-2 flex items-center justify-center ${i === 1 ? 'border-indigo-600' : 'border-slate-300'}`}>
                              {i === 1 && <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full"></div>}
                            </div>
                            <span className="text-[10px] text-slate-600">{size}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-500">标签的宽度</label>
                      <div className="flex items-center gap-2">
                        <input type="number" value="125" className="w-20 px-3 py-1.5 bg-slate-50 border border-slate-100 rounded text-xs outline-none focus:border-indigo-400" />
                        <span className="text-[10px] text-slate-400">px</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-white border border-slate-100 rounded-2xl space-y-4 shadow-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-slate-500">组件类型</span>
                      <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 text-[9px] font-bold rounded">上传</span>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-500">编号</label>
                      <input type="text" value="ref_Frd5mncte2g7bcc" className="w-full px-3 py-1.5 bg-slate-50 border border-slate-100 rounded text-xs outline-none focus:border-indigo-400" />
                    </div>
                    <div className="pt-2 border-t border-slate-100">
                      <p className="text-[10px] font-bold text-slate-400 text-center mb-4">基础配置</p>
                      <div className="space-y-3">
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold text-slate-500">字段 ID</label>
                          <input type="text" value="F4h1mncte2g7bac" className="w-full px-3 py-1.5 bg-slate-50 border border-slate-100 rounded text-xs outline-none focus:border-indigo-400" />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold text-slate-500">字段名称</label>
                          <input type="text" value="上传" className="w-full px-3 py-1.5 bg-slate-50 border border-slate-100 rounded text-xs outline-none focus:border-indigo-400" />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold text-slate-500">提示信息</label>
                          <input type="text" placeholder="请输入" className="w-full px-3 py-1.5 bg-slate-50 border border-slate-100 rounded text-xs outline-none focus:border-indigo-400" />
                        </div>
                      </div>
                    </div>
                    <button className="w-full py-2 bg-indigo-50 text-indigo-600 text-[10px] font-bold rounded border border-indigo-100 hover:bg-indigo-100 transition-all mt-4">
                      编辑数据
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* AI Form Modal */}
          <AnimatePresence>
            {isAiFormModalOpen && (
              <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
                  onClick={() => setIsAiFormModalOpen(false)}
                />
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col relative z-10 overflow-hidden"
                >
                  <div className="flex justify-between items-center px-8 py-6 border-b border-slate-100 bg-indigo-50/50">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600">
                        <Sparkles size={20} fill="currentColor" />
                      </div>
                      <div>
                        <h2 className="text-xl font-black text-slate-800">CRF表单模板</h2>
                        <p className="text-xs text-slate-500 font-medium mt-1">结合海量医学文献、学科热点与系统既往模板生成差异化方案</p>
                      </div>
                    </div>
                    <button onClick={() => setIsAiFormModalOpen(false)} className="p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 rounded-full transition-colors">
                      <X size={20} />
                    </button>
                  </div>

                  <div className="flex-1 overflow-hidden flex h-[600px]">
                     {/* Left: Input & History */}
                     <div className="w-80 bg-slate-50 border-r border-slate-100 p-6 flex flex-col h-full">
                        <h3 className="text-sm font-bold text-slate-800 mb-4">描述研究意图</h3>
                        <div className="flex-1 space-y-4 flex flex-col">
                           <div className="space-y-2">
                              <label className="text-xs font-bold text-slate-600">研究方向/诉求</label>
                              <textarea 
                                value={aiFormPrompt}
                                onChange={(e) => setAiFormPrompt(e.target.value)}
                                placeholder="例如：我想做一个关于『原发性肝癌术后复发预测』的回顾性队列研究，请帮我生成几个切入点并生成相应的CRF表单..."
                                className="w-full h-32 p-3 text-sm border border-slate-200 rounded-xl resize-none focus:border-indigo-500 focus:ring-indigo-500 bg-white"
                              />
                           </div>
                           <button 
                             onClick={() => {
                               setAiFormStatus('generating');
                               setTimeout(() => {
                                 setAiFormStatus('done');
                               }, 3000);
                             }}
                             disabled={!aiFormPrompt || aiFormStatus === 'generating'}
                             className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-bold shadow-sm shadow-indigo-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shrink-0"
                           >
                             {aiFormStatus === 'generating' ? <RotateCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                             生成方案与表单
                           </button>

                           <div className="pt-6 mt-6 border-t border-slate-200 flex-1 overflow-y-auto w-full">
                             <div className="text-xs font-bold text-slate-500 mb-3 flex items-center justify-between">
                               <span className="flex items-center gap-1.5"><BookOpen size={14} className="text-indigo-500" /> 近期高分文献与学科热点</span>
                             </div>
                             <div className="flex flex-col gap-2 relative z-0 w-full overflow-hidden">
                                <button onClick={() => setAiFormPrompt('结合 2024 JCO 最新进展，生成肝内胆管癌(ICC)新兴免疫靶向联合治疗的真实世界疗效表单')} className="text-left px-3 py-2 text-xs text-slate-600 bg-white border border-slate-200 rounded-lg hover:border-indigo-300 hover:shadow-sm hover:text-indigo-600 transition-colors relative z-10 w-full hover:z-20 align-middle flex flex-col justify-center">
                                  <div className="font-bold text-slate-700 truncate w-full">肝内胆管癌靶向免疫联合诊疗</div>
                                  <div className="text-[10px] text-slate-400 mt-1 truncate w-full flex items-center gap-1">
                                    <Activity size={10} className="text-rose-400" /> JCO / Lancet Oncol. 等高频关注
                                  </div>
                                </button>
                                <button onClick={() => setAiFormPrompt('借鉴 Nature Medicine 近期心血管数字疗法热点，构建可穿戴设备监测数据预测心衰风险的CRF')} className="text-left px-3 py-2 text-xs text-slate-600 bg-white border border-slate-200 rounded-lg hover:border-indigo-300 hover:shadow-sm hover:text-indigo-600 transition-colors relative z-10 w-full hover:z-20 align-middle flex flex-col justify-center">
                                  <div className="font-bold text-slate-700 truncate w-full">可穿戴设备与心血管风险建模</div>
                                  <div className="text-[10px] text-slate-400 mt-1 truncate w-full flex items-center gap-1">
                                    <BookOpen size={10} className="text-indigo-400" /> 交叉学科热点 · 文献收录飙升
                                  </div>
                                </button>
                                <button onClick={() => setAiFormPrompt('基于 2023-2024 Radiology 放射组学高引文章，构建多模态影像在胰腺癌鉴别中的表单')} className="text-left px-3 py-2 text-xs text-slate-600 bg-white border border-slate-200 rounded-lg hover:border-indigo-300 hover:shadow-sm hover:text-indigo-600 transition-colors relative z-10 w-full hover:z-20 align-middle flex flex-col justify-center">
                                  <div className="font-bold text-slate-700 truncate w-full">多模态影像组学肿瘤预后诊断</div>
                                  <div className="text-[10px] text-slate-400 mt-1 truncate w-full flex items-center gap-1">
                                    <Database size={10} className="text-emerald-400" /> 临床特征 + 影像组学数据映射
                                  </div>
                                </button>
                             </div>
                           </div>
                        </div>
                     </div>

                     {/* Right: Output */}
                     <div className="flex-1 bg-white relative flex flex-col h-full overflow-hidden">
                        {aiFormStatus === 'idle' && (
                           <div className="flex-1 flex flex-col items-center justify-center text-center p-10">
                              <div className="w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-300 mb-6">
                                 <Sparkles size={48} />
                              </div>
                              <h3 className="text-lg font-black text-slate-700 mb-2">描述您的需求，AI 为您全自动构建</h3>
                              <p className="text-sm text-slate-500 max-w-sm">输入您的研究思路，系统将分析最新文献、指南与百万份历史高质表单库，为您推荐前沿选题并一键搭建结构化CRF。</p>
                           </div>
                        )}

                        {aiFormStatus === 'generating' && (
                           <div className="flex-1 flex flex-col items-center justify-center bg-slate-50/50 p-10">
                              <div className="relative">
                                 <div className="w-24 h-24 bg-indigo-100 rounded-full animate-ping absolute opacity-50"></div>
                                 <div className="w-24 h-24 bg-indigo-600 rounded-full flex items-center justify-center text-white relative z-10 shadow-lg shadow-indigo-200">
                                    <Brain size={40} className="animate-pulse" />
                                 </div>
                              </div>
                              <h3 className="text-lg font-black text-indigo-900 mt-8 mb-2">AI 引擎正在深度思考分析...</h3>
                              <div className="space-y-2 text-sm text-slate-500">
                                 <p className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-500" /> 已检出 2,451 篇相关高质量SCI文献</p>
                                 <p className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-500" /> 正在提取临床核心特征与高频随访终点</p>
                                 <p className="flex items-center gap-2 text-indigo-600 font-bold"><RotateCw size={14} className="animate-spin" /> 正在为您生成差异化选题与 CRF 模板</p>
                              </div>
                           </div>
                        )}

                        {aiFormStatus === 'done' && (
                           <div className="flex-1 flex flex-col h-full overflow-hidden">
                              <div className="flex px-6 border-b border-slate-100 bg-white shrink-0 mt-2">
                                <button 
                                  onClick={() => setAiFormResultTab('plan')}
                                  className={`px-4 py-3 text-sm font-bold border-b-2 transition-all ${aiFormResultTab === 'plan' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
                                >
                                  差异化选题方案推荐
                                </button>
                                <button 
                                  onClick={() => setAiFormResultTab('preview')}
                                  className={`px-4 py-3 text-sm font-bold border-b-2 transition-all flex items-center gap-1.5 ${aiFormResultTab === 'preview' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
                                >
                                  对应 CRF 表单预览 <span className="px-1.5 py-0.5 bg-indigo-100 text-indigo-600 text-[10px] rounded-full">New</span>
                                </button>
                              </div>

                              <div className="flex-1 overflow-y-auto p-6 bg-slate-50/50">
                                 {aiFormResultTab === 'plan' && (
                                   <div className="space-y-6">
                                     <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3">
                                        <Lightbulb className="text-amber-500 shrink-0 mt-0.5" size={18} />
                                        <div className="text-sm text-amber-800">
                                          <span className="font-bold">AI 分析结论：</span>
                                          单纯的"预测"已被广泛研究。建议引入<span className="font-black px-1">多组学指标 / 新型生物标志物</span>作为创新点。以下为您生成 3 个具发表潜力的选题方向：
                                        </div>
                                     </div>

                                     {[
                                       { title: '基于增强MRI影像组学联合临床特征预测早期复发', tag: '临床+影像', hot: '高', source: '2024 Radiology 等期刊高频偏好' },
                                       { title: '多模态特征融合(病理+基因)预测靶免联合治疗预后', tag: '多模态', hot: '极高', source: '切合目前靶免新辅助治疗热点' },
                                       { title: '基于深度学习的连续多点动态检验指标对复发的预测模型', tag: 'AI大模型', hot: '中', source: '关注纵向动态特征变化' }
                                     ].map((plan, idx) => (
                                       <div key={idx} className={`p-5 rounded-xl border-2 transition-all cursor-pointer ${idx === 0 ? 'bg-indigo-50 border-indigo-500 shadow-md' : 'bg-white border-slate-200 hover:border-indigo-300'}`}>
                                          <div className="flex justify-between items-start mb-2">
                                            <h4 className={`text-base font-black ${idx === 0 ? 'text-indigo-900' : 'text-slate-800'}`}>{plan.title}</h4>
                                            {idx === 0 && <span className="bg-indigo-600 text-white text-[10px] px-2 py-1 rounded font-bold shrink-0 ml-2">已为您生成表单</span>}
                                          </div>
                                          <div className="flex items-center gap-4 text-xs mt-3">
                                             <span className="flex items-center gap-1 text-slate-500"><Box size={14} className="text-slate-400" /> 研究维度: {plan.tag}</span>
                                             <span className="flex items-center gap-1 text-slate-500"><Activity size={14} className="text-rose-400" /> 创新热度: <span className="font-bold text-rose-500">{plan.hot}</span></span>
                                          </div>
                                          <p className="text-xs text-slate-500 mt-2 bg-white/50 p-2 rounded break-words">
                                            <BookOpen size={12} className="inline mr-1" /> 选题依据：{plan.source}
                                          </p>
                                       </div>
                                     ))}
                                   </div>
                                 )}

                                 {aiFormResultTab === 'preview' && (
                                   <div className="space-y-4">
                                      <div className="flex justify-between items-center mb-4">
                                        <h3 className="text-base font-black text-slate-800">CRF草稿预览: 基于影像组学+临床特征</h3>
                                        <button 
                                          onClick={() => {
                                            setIsAiFormModalOpen(false);
                                            setBuilderFormName('MRI影像组学预测复发CRF');
                                          }}
                                          className="px-4 py-2 bg-indigo-600 text-white text-xs font-bold rounded-lg shadow hover:bg-indigo-700"
                                        >
                                          使用此模板并编辑
                                        </button>
                                      </div>
                                      
                                      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm pointer-events-none opacity-80">
                                         {/* Mock CRF Preview */}
                                         <div className="space-y-6 text-left">
                                            <div className="border-b border-indigo-100 pb-2">
                                              <h4 className="font-bold text-indigo-900 text-sm flex items-center gap-2"><User size={14} /> 一、 基础人口学及病史</h4>
                                            </div>
                                            <div className="grid grid-cols-2 gap-6">
                                              <div className="space-y-2">
                                                <div className="text-xs font-bold text-slate-700">患者姓名</div>
                                                <input type="text" className="w-full h-8 bg-slate-50 border border-slate-200 rounded px-2 text-xs" defaultValue="[系统映射带入]" />
                                              </div>
                                              <div className="space-y-2">
                                                <div className="text-xs font-bold text-slate-700">出生日期</div>
                                                <input type="date" className="w-full h-8 bg-slate-50 border border-slate-200 rounded px-2 text-xs text-slate-500" value="1965-08-22" readOnly />
                                              </div>
                                              <div className="space-y-2">
                                                <div className="text-xs font-bold text-slate-700">ECOG 评分</div>
                                                <select className="w-full h-8 bg-slate-50 border border-slate-200 rounded px-2 text-xs text-slate-600">
                                                  <option>0分：活动能力完全正常</option>
                                                  <option selected>1分：能自由走动及从事轻体力活动</option>
                                                  <option>2分：能自由走动及生活自理</option>
                                                </select>
                                              </div>
                                              <div className="space-y-2">
                                                <div className="text-xs font-bold text-slate-700">既往肝病史</div>
                                                <div className="flex items-center gap-4 mt-1">
                                                  <label className="flex items-center gap-1 text-xs text-slate-600"><input type="radio" name="liver" defaultChecked /> 乙肝</label>
                                                  <label className="flex items-center gap-1 text-xs text-slate-600"><input type="radio" name="liver" /> 丙肝</label>
                                                  <label className="flex items-center gap-1 text-xs text-slate-600"><input type="radio" name="liver" /> 无</label>
                                                </div>
                                              </div>
                                              <div className="space-y-2 col-span-2">
                                                <div className="text-xs font-bold text-slate-700">基线 AFP (ng/ml)</div>
                                                <input type="number" className="w-full h-8 bg-slate-50 border border-slate-200 rounded px-2 text-xs text-slate-600" defaultValue="425.8" />
                                              </div>
                                            </div>
                                            
                                            <div className="border-b border-indigo-100 pb-2 mt-8 flex justify-between items-end">
                                              <div className="flex items-center gap-2">
                                                <h4 className="font-bold text-indigo-900 text-sm flex items-center gap-2"><ImageIcon size={14} /> 二、 AI 提取：影像组学特征池</h4>
                                                <span className="text-[10px] bg-amber-100 text-amber-700 px-1.5 rounded font-bold shrink-0 shadow-sm border border-amber-200">AI课题特有变量</span>
                                              </div>
                                              <div className="text-[10px] text-indigo-500 font-bold bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100 flex items-center gap-1">
                                                <Sparkles size={10} /> NLP自动抽取
                                              </div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-6 bg-indigo-50/30 p-4 rounded-xl border border-indigo-50">
                                              <div className="space-y-2">
                                                <div className="text-xs font-bold text-indigo-900">肿瘤长径 (cm)</div>
                                                <input type="number" className="w-full h-8 bg-white border border-indigo-100 rounded px-2 text-xs text-indigo-700 font-medium font-mono" defaultValue="4.2" />
                                              </div>
                                              <div className="space-y-2">
                                                <div className="text-xs font-bold text-indigo-900">MRI 动脉期强化模式</div>
                                                <select className="w-full h-8 bg-white border border-indigo-100 rounded px-2 text-xs text-indigo-700">
                                                  <option>整体明显强化 (Wash-in)</option>
                                                  <option>周边环形强化</option>
                                                  <option>不均匀强化</option>
                                                </select>
                                              </div>
                                              <div className="space-y-2">
                                                <div className="text-xs font-bold text-indigo-900">微血管侵犯影像特征 (MVI-R)</div>
                                                <div className="flex items-center gap-4 mt-1">
                                                  <label className="flex items-center gap-1 text-xs text-indigo-700"><input type="radio" name="mvi" defaultChecked /> 高风险</label>
                                                  <label className="flex items-center gap-1 text-xs text-indigo-700"><input type="radio" name="mvi" /> 低风险</label>
                                                </div>
                                              </div>
                                              <div className="space-y-2">
                                                <div className="text-xs font-bold text-indigo-900">肿瘤包膜完整性</div>
                                                <select className="w-full h-8 bg-white border border-indigo-100 rounded px-2 text-xs text-indigo-700">
                                                  <option>完整</option>
                                                  <option>不完整/缺损</option>
                                                  <option>无包膜</option>
                                                </select>
                                              </div>
                                              <div className="space-y-2 col-span-2">
                                                <div className="text-xs font-bold text-indigo-900">一阶灰度共生矩阵 (GLCM_Entropy)</div>
                                                <input type="text" className="w-full h-8 bg-slate-100 border border-slate-200 rounded px-2 text-xs text-slate-500 font-mono shadow-inner cursor-not-allowed" defaultValue="7.42851" readOnly />
                                                <p className="text-[10px] text-slate-400 mt-1 flex items-center gap-1"><Info size={10} /> 组学特征由系统根据上传影像自动计算，无需手动录入</p>
                                              </div>
                                            </div>
                                         </div>
                                      </div>
                                   </div>
                                 )}
                              </div>
                           </div>
                        )}
                     </div>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>

          {/* Standard Data Set Modal */}
          <AnimatePresence>
            {isStandardDataSetModalOpen && (
              <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
                  onClick={() => setIsStandardDataSetModalOpen(false)}
                />
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  className="bg-white rounded-3xl shadow-2xl w-full max-w-5xl h-[85vh] flex flex-col relative z-10 overflow-hidden"
                >
                  <div className="flex justify-between items-center px-8 py-6 border-b border-slate-100 bg-emerald-50/50">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600">
                        <Database size={20} />
                      </div>
                      <div>
                        <h2 className="text-xl font-black text-slate-800">标准数据集指标</h2>
                        <p className="text-xs text-slate-500 font-medium mt-1">从临床科研一体化平台标准指标库中快速勾选字段，保障多中心研究数据一致性</p>
                      </div>
                    </div>
                    <button onClick={() => setIsStandardDataSetModalOpen(false)} className="p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 rounded-full transition-colors">
                      <X size={20} />
                    </button>
                  </div>

                  <div className="flex-1 flex overflow-hidden">
                     {/* Left: Indicator tree */}
                     <div className="w-72 border-r border-slate-100 flex flex-col bg-slate-50/30">
                        <div className="p-4 border-b border-slate-100">
                           <div className="relative">
                             <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                             <input type="text" placeholder="搜索标准集、指标集..." className="w-full pl-8 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-xs" />
                           </div>
                        </div>
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 text-sm font-bold text-slate-700">
                           <div className="space-y-2">
                             <div className="flex items-center gap-2 cursor-pointer text-emerald-600"><ChevronDown size={14} /><Folder size={14} /> 原发性肝癌专病数据集 v2.0</div>
                             <div className="pl-6 space-y-2 font-medium text-xs text-slate-600">
                                <div className="flex items-center gap-2 truncate"><Lock size={12} className="text-slate-400 shrink-0" /> 人口学信息集 (必备)</div>
                                <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 p-1 rounded font-bold truncate"><Database size={12} className="shrink-0" /> 临床诊断与分期集</div>
                                <div className="flex items-center gap-2 truncate"><Database size={12} className="text-slate-400 font-normal shrink-0" /> <span className="font-normal opacity-70">肿瘤标志物集</span></div>
                                <div className="flex items-center gap-2 truncate"><Database size={12} className="text-slate-400 font-normal shrink-0" /> <span className="font-normal opacity-70">随访与生存状态集</span></div>
                             </div>
                           </div>
                           <div className="space-y-2">
                             <div className="flex items-center gap-2 cursor-pointer text-slate-500"><ChevronRight size={14} /><Folder size={14} /> 结直肠癌专病数据集 v1.5</div>
                           </div>
                           <div className="space-y-2">
                             <div className="flex items-center gap-2 cursor-pointer text-slate-500"><ChevronRight size={14} /><Folder size={14} /> 消化系统通用集</div>
                           </div>
                        </div>
                     </div>
                     
                     {/* Middle: Selection */}
                     <div className="flex-1 flex flex-col">
                        <div className="p-4 border-b border-slate-100 bg-white flex justify-between items-center shrink-0">
                           <h4 className="font-bold text-slate-800 flex items-center gap-2"><TextIcon size={16} className="text-emerald-500" /> 临床诊断与分期集 (共8个标准数据集指标)</h4>
                           <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                              <input type="checkbox" className="rounded text-emerald-600 border-slate-300" defaultChecked /> 全选
                           </div>
                        </div>
                        <div className="flex-1 overflow-y-auto p-6 bg-slate-50 space-y-3">
                           {[
                             { name: '首次确诊日期', type: '日期', req: true },
                             { name: '肿瘤原发部位', type: '单选字典', req: true },
                             { name: '组织学分级', type: '单选字典', req: true },
                             { name: '微血管侵犯 (MVI)', type: '单选字典', req: false },
                             { name: '临床TNM分期 (AJCC 8th)', type: '下拉菜单', req: true },
                             { name: 'BCLC分期', type: '单选字典', req: false },
                             { name: '是否有肝外转移', type: '开关', req: true },
                             { name: '转移部位', type: '多选字典', req: false },
                           ].map((item, i) => (
                             <div key={i} className="flex items-center justify-between bg-white p-3 rounded-xl border border-slate-200 hover:border-emerald-300 transition-colors cursor-pointer group">
                                <div className="flex items-center gap-3">
                                   <input type="checkbox" className="rounded text-emerald-600 border-slate-300" defaultChecked={i < 5} />
                                   <div>
                                      <div className="font-bold text-sm text-slate-800 flex items-center gap-2">
                                        {item.name} 
                                        {item.req && <span className="text-[10px] text-rose-500 bg-rose-50 px-1 rounded">必填</span>}
                                      </div>
                                   </div>
                                </div>
                                <div className="flex items-center gap-4">
                                   <span className="text-[11px] text-slate-400 bg-slate-100 px-2 py-0.5 rounded font-mono">{item.type}</span>
                                </div>
                             </div>
                           ))}
                        </div>
                     </div>

                     {/* Right: Cart */}
                     <div className="w-64 border-l border-slate-100 bg-white flex flex-col shadow-[-4px_0_15px_-3px_rgba(0,0,0,0.02)] relative z-10">
                        <div className="p-4 border-b border-slate-100 bg-emerald-50/30">
                           <h4 className="font-bold text-slate-800">已选指标预览</h4>
                           <p className="text-[10px] text-slate-500 mt-1">将被自动转换为CRF表单组件</p>
                        </div>
                        <div className="flex-1 overflow-y-auto p-4">
                           <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 mb-3 bg-emerald-50 p-2 rounded">
                             <Database size={12} /> 已选 5 个指标
                           </div>
                           <div className="space-y-4">
                              <div className="border-l-2 border-slate-200 pl-3">
                                 <div className="text-[10px] font-black text-slate-400 mb-2 truncate">人口学信息集</div>
                                 <div className="space-y-2">
                                    <div className="text-xs text-slate-600 flex items-center gap-2 truncate"><Check size={12} className="text-emerald-500 shrink-0" /> 出生日期 (日期)</div>
                                    <div className="text-xs text-slate-600 flex items-center gap-2 truncate"><Check size={12} className="text-emerald-500 shrink-0" /> 性别 (单选)</div>
                                 </div>
                              </div>
                              <div className="border-l-2 border-emerald-400 pl-3">
                                 <div className="text-[10px] font-black text-emerald-600 mb-2 truncate">临床诊断与分期集</div>
                                 <div className="space-y-2">
                                    <div className="text-xs text-slate-600 flex items-center gap-2 truncate"><Check size={12} className="text-emerald-500 shrink-0" /> 首次确诊日期</div>
                                    <div className="text-xs text-slate-600 flex items-center gap-2 truncate"><Check size={12} className="text-emerald-500 shrink-0" /> 肿瘤原发部位</div>
                                    <div className="text-xs text-slate-600 flex items-center gap-2 truncate"><Check size={12} className="text-emerald-500 shrink-0" /> 组织学分级</div>
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div className="p-4 border-t border-slate-100 bg-white shadow-[0_-4px_15px_-3px_rgba(0,0,0,0.05)]">
                           <button 
                             onClick={() => {
                               setIsStandardDataSetModalOpen(false);
                               setBuilderFormName('基于V2.0标准集的CRF表单');
                             }}
                             className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-bold shadow-sm shadow-emerald-200 transition-all flex items-center justify-center gap-2"
                           >
                             创建CRF表单 <ArrowRight size={16} />
                           </button>
                        </div>
                     </div>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>

          {/* Form Builder Usage Configuration Modal */}
          <AnimatePresence>
            {isBuilderUsageModalOpen && (
              <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsBuilderUsageModalOpen(false)}
                  className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                />
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  className="relative bg-white rounded-[40px] shadow-2xl w-full max-w-lg overflow-hidden"
                >
                  <div className="p-8">
                    <div className="flex justify-between items-center mb-8">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center">
                          <Settings size={24} />
                        </div>
                        <div>
                          <h3 className="text-xl font-black text-slate-800">表单应用配置</h3>
                          <p className="text-xs text-slate-400">配置表单的应用场景与录入权限</p>
                        </div>
                      </div>
                      <button onClick={() => setIsBuilderUsageModalOpen(false)} className="p-2 text-slate-400 hover:bg-slate-100 rounded-full">
                        <Plus size={20} className="rotate-45" />
                      </button>
                    </div>

                    <div className="space-y-6">
                      <div className="space-y-4">
                        <label className="text-xs font-bold text-slate-500 ml-1">应用场景</label>
                        <div className="grid grid-cols-2 gap-3">
                          {[
                            { id: 'data-center', label: '数据中心', icon: Database, desc: '用于常规临床数据补录' },
                            { id: 'favorites', label: '患者收藏', icon: Star, desc: '用于患者快捷录入' }
                          ].map((usage) => (
                            <button 
                              key={usage.id}
                              onClick={() => {
                                setBuilderUsage([usage.id]);
                              }}
                              className={`flex flex-col gap-2 p-4 rounded-2xl border-2 text-left transition-all ${
                                builderUsage.includes(usage.id)
                                  ? 'border-indigo-600 bg-indigo-50/30 text-indigo-600'
                                  : 'border-slate-100 bg-white text-slate-400 hover:border-indigo-200'
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <usage.icon size={18} />
                                <span className="text-xs font-bold">{usage.label}</span>
                                {builderUsage.includes(usage.id) && <Check size={14} className="ml-auto" />}
                              </div>
                              <p className="text-[9px] opacity-70">{usage.desc}</p>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-4">
                        <label className="text-xs font-bold text-slate-500 ml-1">所属目录</label>
                        <div className="relative">
                          <select
                            value={builderFolderId}
                            onChange={(e) => setBuilderFolderId(e.target.value)}
                            className="w-full appearance-none bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 font-bold"
                          >
                            <option value="unmounted">不挂载 (无目录)</option>
                            {folders.map(folder => (
                              <option key={folder.id} value={folder.id}>
                                {folder.name}
                              </option>
                            ))}
                          </select>
                          <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                        </div>
                      </div>

                      <div className="pt-4 flex gap-3">
                        <button 
                          onClick={() => setIsBuilderUsageModalOpen(false)}
                          className="flex-1 py-4 bg-slate-100 text-slate-600 font-bold rounded-2xl hover:bg-slate-200 transition-all"
                        >
                          取消
                        </button>
                        <button 
                          onClick={() => setIsBuilderUsageModalOpen(false)}
                          className="flex-1 py-4 bg-indigo-600 text-white font-black rounded-2xl shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all"
                        >
                          确认配置
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>

          {activePage === 'form-center' && (
            <motion.div 
              key="form-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex-1 flex flex-col bg-[#f5f8ff] p-8 overflow-y-auto"
            >
              <div className="flex items-center gap-5 mb-8">
                <div className="w-14 h-14 bg-indigo-600 text-white rounded-2xl flex items-center justify-center shadow-xl shadow-indigo-100">
                  <ClipboardList size={28} />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-slate-800 tracking-tight">表单中心</h2>
                  <p className="text-xs text-slate-400 mt-1 font-medium">管理与使用科研数据采集表单</p>
                </div>
              </div>

              <div className="flex gap-6 h-full min-h-0">
                {/* Folder Sidebar */}
                <div className="w-64 bg-white rounded-3xl border border-slate-100 shadow-sm p-4 flex flex-col shrink-0">
                  <div className="flex justify-between items-center mb-4 px-2">
                    <h3 className="text-sm font-bold text-slate-800">表单目录</h3>
                    <button 
                      onClick={() => {
                        setIsAddingFolder(true);
                        setNewFolderName('');
                      }}
                      className="text-indigo-600 hover:bg-indigo-50 p-1 rounded-lg transition-colors"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  <div className="space-y-1 overflow-y-auto flex-1">
                    <button 
                      onClick={() => setActiveFolderId('all')}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                        activeFolderId === 'all' 
                          ? 'bg-indigo-50 text-indigo-600' 
                          : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Folder size={16} className={activeFolderId === 'all' ? 'fill-indigo-100' : ''} />
                        全部分类
                      </div>
                    </button>
                    {folders.map(folder => (
                      <div key={folder.id} className="group relative">
                        {editingFolderId === folder.id ? (
                          <div className="flex items-center gap-2 px-3 py-2 bg-indigo-50/50 rounded-xl border border-indigo-100">
                            <Folder size={16} className="text-indigo-300 shrink-0" />
                            <input
                              type="text"
                              autoFocus
                              value={editFolderName}
                              onChange={(e) => setEditFolderName(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter' && editFolderName.trim()) {
                                  setFolders(folders.map(f => f.id === folder.id ? { ...f, name: editFolderName.trim() } : f));
                                  setEditingFolderId(null);
                                } else if (e.key === 'Escape') {
                                  setEditingFolderId(null);
                                }
                              }}
                              onBlur={() => {
                                if (editFolderName.trim()) {
                                  setFolders(folders.map(f => f.id === folder.id ? { ...f, name: editFolderName.trim() } : f));
                                }
                                setEditingFolderId(null);
                              }}
                              className="w-full bg-transparent border-none outline-none text-xs font-bold text-slate-700"
                            />
                          </div>
                        ) : (
                          <button 
                            onClick={() => setActiveFolderId(folder.id)}
                            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                              activeFolderId === folder.id 
                                ? 'bg-indigo-50 text-indigo-600' 
                                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <Folder size={16} className={activeFolderId === folder.id ? 'fill-indigo-100' : ''} />
                              {folder.name}
                            </div>
                            {folder.id !== 'root' && (
                              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <div 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setEditingFolderId(folder.id);
                                    setEditFolderName(folder.name);
                                  }}
                                  className="p-1 hover:bg-indigo-100 rounded text-indigo-400 hover:text-indigo-600"
                                >
                                  <Pencil size={12} />
                                </div>
                                <div 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setFolders(folders.filter(f => f.id !== folder.id));
                                    if (activeFolderId === folder.id) setActiveFolderId('all');
                                    // Optionally update forms that were in this folder to 'unmounted'
                                    setProjectForms(projectForms.map(f => f.folderId === folder.id ? { ...f, folderId: 'unmounted' } : f));
                                  }}
                                  className="p-1 hover:bg-red-100 rounded text-red-400 hover:text-red-600"
                                >
                                  <Trash2 size={12} />
                                </div>
                              </div>
                            )}
                          </button>
                        )}
                      </div>
                    ))}
                    {isAddingFolder && (
                      <div className="flex items-center gap-2 px-3 py-2 bg-indigo-50/50 rounded-xl border border-indigo-100">
                        <Folder size={16} className="text-indigo-300 shrink-0" />
                        <input
                          type="text"
                          autoFocus
                          value={newFolderName}
                          onChange={(e) => setNewFolderName(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && newFolderName.trim()) {
                              setFolders([...folders, { id: 'folder_' + Date.now(), name: newFolderName.trim() }]);
                              setIsAddingFolder(false);
                            } else if (e.key === 'Escape') {
                              setIsAddingFolder(false);
                            }
                          }}
                          onBlur={() => {
                            if (newFolderName.trim()) {
                              setFolders([...folders, { id: 'folder_' + Date.now(), name: newFolderName.trim() }]);
                            }
                            setIsAddingFolder(false);
                          }}
                          placeholder="输入目录名称..."
                          className="w-full bg-transparent border-none outline-none text-xs font-bold text-slate-700 placeholder:text-slate-400"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 bg-white rounded-3xl border border-slate-100 shadow-sm flex flex-col overflow-hidden">
                  <div className="p-6 border-b flex justify-between items-center bg-slate-50/50">
                    <div className="flex gap-3">
                      <div className="relative">
                        <SearchIcon size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input 
                          type="text" 
                          placeholder="搜索表单..." 
                          className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-blue-100 transition-all w-64"
                        />
                      </div>
                    </div>
                    <button 
                      onClick={() => setIsCreateFormModalOpen(true)}
                      className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-colors flex items-center gap-2"
                    >
                      <Plus size={16} /> 创建表单
                    </button>
                  </div>
                  <div className="grid grid-cols-3 gap-6 p-6 overflow-y-auto">
                    {projectForms
                      .filter((f: any) => activeFolderId === 'all' || f.folderId === activeFolderId)
                      .map((form: any) => (
                    <div key={form.id} className="bg-white border border-slate-100 rounded-3xl p-8 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-50/50 transition-all group relative flex flex-col">
                      <div className="flex items-start gap-5 mb-8">
                        <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center shadow-inner shrink-0">
                          <FileText size={28} />
                        </div>
                        <div className="flex-1 min-w-0">
                              <h4 
                                className="text-lg font-black text-slate-800 tracking-tight truncate cursor-pointer hover:text-indigo-600 transition-colors underline decoration-blue-500 decoration-2 underline-offset-4"
                                onClick={() => setActivePage('form-builder')}
                              >
                                {form.name}
                              </h4>
                        </div>
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 relative">
                          {/* Removed FolderInput button */}
                          {movingFormId === form.id && (
                            <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-slate-200 rounded-xl shadow-xl z-50 py-1" onClick={e => e.stopPropagation()}>
                              <div className="px-3 py-2 text-xs font-bold text-slate-500 border-b border-slate-100">
                                选择目标目录
                              </div>
                              <div className="max-h-48 overflow-y-auto">
                                <button
                                  onClick={() => {
                                    setProjectForms(projectForms.map(f => f.id === form.id ? { ...f, folderId: 'unmounted' } : f));
                                    setMovingFormId(null);
                                  }}
                                  className={`w-full text-left px-3 py-2 text-sm hover:bg-slate-50 flex items-center gap-2 ${form.folderId === 'unmounted' ? 'text-indigo-600 font-bold bg-indigo-50/50' : 'text-slate-700'}`}
                                >
                                  <Folder size={14} className={form.folderId === 'unmounted' ? 'text-indigo-600' : 'text-slate-400'} />
                                  <span className="truncate">未挂载</span>
                                  {form.folderId === 'unmounted' && <Check size={14} className="ml-auto" />}
                                </button>
                                {folders.map(folder => (
                                  <button
                                    key={folder.id}
                                    onClick={() => {
                                      setProjectForms(projectForms.map(f => f.id === form.id ? { ...f, folderId: folder.id } : f));
                                      setMovingFormId(null);
                                    }}
                                    className={`w-full text-left px-3 py-2 text-sm hover:bg-slate-50 flex items-center gap-2 ${form.folderId === folder.id ? 'text-indigo-600 font-bold bg-indigo-50/50' : 'text-slate-700'}`}
                                  >
                                    <Folder size={14} className={form.folderId === folder.id ? 'text-indigo-600' : 'text-slate-400'} />
                                    <span className="truncate">{folder.name}</span>
                                    {form.folderId === folder.id && <Check size={14} className="ml-auto" />}
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}
                          {/* Removed Pencil button */}
                          {movingFormId === form.id && (
                            <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-slate-200 rounded-xl shadow-xl z-50 py-1" onClick={e => e.stopPropagation()}>
                              <div className="px-3 py-2 text-xs font-bold text-slate-500 border-b border-slate-100">
                                选择目标目录
                              </div>
                              <div className="max-h-48 overflow-y-auto">
                                <button
                                  onClick={() => {
                                    setProjectForms(projectForms.map(f => f.id === form.id ? { ...f, folderId: 'unmounted' } : f));
                                    setMovingFormId(null);
                                  }}
                                  className={`w-full text-left px-3 py-2 text-sm hover:bg-slate-50 flex items-center gap-2 ${form.folderId === 'unmounted' ? 'text-indigo-600 font-bold bg-indigo-50/50' : 'text-slate-700'}`}

                                >
                                  <Folder size={14} className={form.folderId === 'unmounted' ? 'text-indigo-600' : 'text-slate-400'} />
                                  <span className="truncate">未挂载</span>
                                  {form.folderId === 'unmounted' && <Check size={14} className="ml-auto" />}
                                </button>
                                {folders.map(folder => (
                                  <button
                                    key={folder.id}
                                    onClick={() => {
                                      setProjectForms(projectForms.map(f => f.id === form.id ? { ...f, folderId: folder.id } : f));
                                      setMovingFormId(null);
                                    }}
                                    className={`w-full text-left px-3 py-2 text-sm hover:bg-slate-50 flex items-center gap-2 ${form.folderId === folder.id ? 'text-indigo-600 font-bold bg-indigo-50/50' : 'text-slate-700'}`}
                                  >
                                    <Folder size={14} className={form.folderId === folder.id ? 'text-indigo-600' : 'text-slate-400'} />
                                    <span className="truncate">{folder.name}</span>
                                    {form.folderId === folder.id && <Check size={14} className="ml-auto" />}
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              setEditingFormNameId(form.id);
                              setEditFormNameValue(form.name);
                            }}
                            className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-colors"
                            title="修改名称"
                          >
                            <Pencil size={16} />
                          </button>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              setFormToDelete(form);
                            }}
                            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                            title="删除表单"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 pt-6 border-t border-slate-50 mt-auto">
                        <div className="space-y-1">
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">创建人</p>
                          <p className="text-sm font-bold text-slate-700">{form.configurator || '管理员'}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">创建时间</p>
                          <p className="text-sm font-bold text-slate-700">{form.configTime || '-'}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                  </div>
                </div>
              </div>
              {/* Create Form Modal */}
              {isCreateFormModalOpen && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                  <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl">
                    <h3 className="text-xl font-black text-slate-800 mb-6">创建表单</h3>
                    <div className="space-y-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 ml-1">表单名称</label>
                        <input 
                          type="text" 
                          value={newFormName}
                          onChange={(e) => setNewFormName(e.target.value)}
                          placeholder="请输入表单名称"
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm outline-none focus:bg-white focus:border-blue-200 transition-all"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 ml-1">所属目录</label>
                        <select 
                          value={newFormFolderId}
                          onChange={(e) => setNewFormFolderId(e.target.value)}
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm outline-none focus:bg-white focus:border-blue-200 transition-all"
                        >
                          <option value="unmounted">未挂载</option>
                          {folders.map(folder => (
                            <option key={folder.id} value={folder.id}>{folder.name}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="flex gap-3 mt-8">
                      <button 
                        onClick={() => setIsCreateFormModalOpen(false)}
                        className="flex-1 py-3 bg-slate-100 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-200 transition-colors"
                      >
                        取消
                      </button>
                      <button 
                        onClick={() => {
                          if (newFormName.trim()) {
                            const newForm = {
                              id: 'f' + Date.now(),
                              name: newFormName.trim(),
                              permission: '个人',
                              configurator: '当前用户',
                              configTime: new Date().toLocaleString(),
                              enabled: true,
                              verifyLevel: 'medium',
                              qrValue: '',
                              usage: [],
                              folderId: newFormFolderId
                            };
                            setProjectForms([...projectForms, newForm]);
                            setNewFormName('');
                            setNewFormFolderId('unmounted');
                            setIsCreateFormModalOpen(false);
                            setActivePage('form-builder');
                          }
                        }}
                        className="flex-1 py-3 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-colors"
                      >
                        立即创建
                      </button>
                    </div>
                  </div>
                </div>
              )}
              {/* Edit Form Modal */}
              {isEditFormModalOpen && editingForm && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                  <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl">
                    <h3 className="text-xl font-black text-slate-800 mb-6">编辑表单</h3>
                    <div className="space-y-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 ml-1">表单名称</label>
                        <input 
                          type="text" 
                          value={editingForm.name}
                          onChange={(e) => setEditingForm({ ...editingForm, name: e.target.value })}
                          placeholder="请输入表单名称"
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm outline-none focus:bg-white focus:border-blue-200 transition-all"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 ml-1">所属目录</label>
                        <select 
                          value={editingForm.folderId}
                          onChange={(e) => setEditingForm({ ...editingForm, folderId: e.target.value })}
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm outline-none focus:bg-white focus:border-blue-200 transition-all"
                        >
                          <option value="unmounted">未挂载</option>
                          {folders.map(folder => (
                            <option key={folder.id} value={folder.id}>{folder.name}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="flex gap-3 mt-8">
                      <button 
                        onClick={() => setIsEditFormModalOpen(false)}
                        className="flex-1 py-3 bg-slate-100 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-200 transition-colors"
                      >
                        取消
                      </button>
                      <button 
                        onClick={() => {
                          if (editingForm.name.trim()) {
                            setProjectForms(projectForms.map(f => f.id === editingForm.id ? editingForm : f));
                            setIsEditFormModalOpen(false);
                            setEditingForm(null);
                          }
                        }}
                        className="flex-1 py-3 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-colors"
                      >
                        保存
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {activePage === 'data-center' && (
            <motion.div 
              key="data-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col overflow-hidden bg-[#f5f8ff]"
            >
              {/* Header Tabs */}
              <header className="h-16 bg-white border-b px-8 flex items-center justify-between shadow-sm flex-shrink-0 z-20">
                <div className="flex items-center gap-2">
                  {[
                    { id: 'overview', label: '数据洞察' },
                    { id: 'patients', label: '患者列表' },
                    { id: 'datasets', label: '专病数据集' },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as Tab)}
                      className={`px-6 py-2 text-sm font-bold rounded-lg transition-all ${
                        activeTab === tab.id 
                          ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' 
                          : 'text-slate-400 hover:text-slate-600'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2 text-blue-600 cursor-pointer">
                    <Brain size={18} />
                    <span className="text-sm font-black">AI 助手</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-[10px] font-bold">
                      科
                    </div>
                    <span className="text-sm font-bold text-slate-800">科研演示02</span>
                    <Settings size={16} className="text-slate-400 cursor-pointer" />
                  </div>
                </div>
              </header>

              {/* Tab Content */}
              <div className="flex-1 overflow-y-auto p-8 relative">
                {/* Global Toast Notification */}
                <AnimatePresence>
                  {showUpdateToast && (
                    <motion.div 
                      initial={{ opacity: 0, y: -40, x: '-50%' }}
                      animate={{ opacity: 1, y: 0, x: '-50%' }}
                      exit={{ opacity: 0, y: -40, x: '-50%' }}
                      className="absolute top-4 left-1/2 z-[100] flex items-center gap-3 bg-white border border-blue-100 shadow-2xl px-6 py-4 rounded-2xl min-w-[320px]"
                    >
                      <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
                        <RotateCw size={20} className="animate-spin" />
                      </div>
                      <div>
                        <p className="text-sm font-black text-slate-800">数据更新同步中...</p>
                        <p className="text-[11px] text-slate-500 font-bold">预计需要 3 - 5 分钟，期间可继续浏览其他页面</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {activeTab === 'overview' && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-1 h-full gap-5 overflow-hidden p-5 bg-[#f5f8ff]"
                  >
                    {/* Right Column: Metrics & Charts */}
                    <div className="flex-1 flex flex-col gap-5 overflow-y-auto dataset-scroll pr-2 pb-5">
                      {/* Top Metrics Cards */}
                      <div className="grid grid-cols-5 gap-5 flex-shrink-0">
                        {[
                          { label: '变量数', value: '498', icon: Box, color: 'text-cyan-500', bg: 'bg-cyan-50' },
                          { label: '患者总数', value: '99', icon: Users, color: 'text-blue-500', bg: 'bg-blue-50' },
                          { label: '病历总数', value: '194', icon: FileBarChart, color: 'text-orange-500', bg: 'bg-orange-50' },
                          { label: '总记录数', value: '10,980', icon: Database, color: 'text-purple-500', bg: 'bg-purple-50' },
                          { label: '患者收藏', value: '7', icon: Heart, color: 'text-amber-500', bg: 'bg-amber-50' },
                        ].map((m, i) => (
                          <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex items-center justify-between group hover:border-blue-200 transition-all">
                            <div className="flex items-center gap-4">
                              <div className={`w-10 h-10 ${m.bg} ${m.color} rounded-xl flex items-center justify-center`}>
                                <m.icon size={20} />
                              </div>
                              <div>
                                <div className="flex items-center gap-1">
                                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{m.label}</span>
                                  <ChevronRight size={10} className="text-slate-300" />
                                </div>
                                <p className="text-xl font-black text-slate-800 tracking-tight group-hover:text-blue-600 transition-colors">{m.value}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Data Resource Overview */}
                      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
                        <div className="flex items-center justify-between mb-8">
                          <h4 className="text-[15px] font-black text-slate-800 flex items-center gap-2">
                             数据资源总览
                          </h4>
                          <button className="text-blue-600 bg-blue-50/50 p-1.5 rounded-lg border border-blue-100 hover:bg-blue-100 transition-colors">
                            <Settings size={14} />
                          </button>
                        </div>

                        <div className="grid grid-cols-3 gap-6">
                           {[
                             { title: '疾病诊断表', metrics: 28, records: 101, keys: '就诊流水号, 患者编号, 患者姓名, 记录日期, 丙型肝炎肝硬化, 丙型肝炎...' },
                             { title: '住院病人病历', metrics: 4, records: 0, keys: '就诊流水号, 患者登记号, 病历文书内容, 就诊日期时间' },
                             { title: '生化', metrics: 9, records: 3, keys: '就诊流水号, 个人标识号, 检验报告日期, 更新时间, 标本名称, 检...' }
                           ].map((res, i) => (
                             <div key={i} className="bg-slate-50/50 rounded-xl p-6 border border-slate-100 relative group hover:bg-white hover:shadow-md transition-all">
                               <div className="absolute top-0 left-0 w-full h-1 bg-blue-500/20 group-hover:bg-blue-500 rounded-t-xl transition-colors" />
                               <div className="flex items-center justify-between mb-4">
                                 <h5 className="text-[13px] font-black text-slate-700">{res.title}</h5>
                                 <div className="flex gap-4">
                                   <div className="text-right">
                                     <p className="text-[10px] text-slate-400 font-bold uppercase">指标总数</p>
                                     <p className="text-sm font-black text-slate-800">{res.metrics}</p>
                                   </div>
                                   <div className="text-right">
                                     <p className="text-[10px] text-slate-400 font-bold uppercase">病历总数</p>
                                     <p className="text-sm font-black text-slate-800">{res.records}</p>
                                   </div>
                                 </div>
                               </div>
                               <div>
                                 <p className="text-[10px] text-slate-400 font-bold mb-1 uppercase">关键指标:</p>
                                 <div className="text-[11px] text-slate-500 leading-relaxed font-medium line-clamp-2">{res.keys}</div>
                               </div>
                             </div>
                           ))}
                           
                           <div className="bg-slate-50/50 rounded-xl p-6 border border-slate-100 flex flex-col group hover:bg-white hover:shadow-md transition-all">
                             <div className="flex items-center justify-between mb-4">
                               <h5 className="text-[13px] font-black text-slate-700">门诊病历</h5>
                               <div className="flex gap-4">
                                 <div className="text-right">
                                   <p className="text-[10px] text-slate-400 font-bold uppercase">指标总数</p>
                                   <p className="text-sm font-black text-slate-800">4</p>
                                 </div>
                                 <div className="text-right">
                                   <p className="text-[10px] text-slate-400 font-bold uppercase">病历总数</p>
                                   <p className="text-sm font-black text-slate-800">0</p>
                                 </div>
                               </div>
                             </div>
                             <p className="text-[11px] text-slate-500 font-medium">关键指标：就诊号,患者登记号,病历文书内容,就诊日期时间</p>
                           </div>

                           <div className="bg-slate-50/50 rounded-xl p-6 border border-dashed border-slate-200 flex flex-col cursor-pointer hover:bg-blue-50 transition-colors group relative overflow-hidden">
                              <div className="flex items-center gap-2 text-[13px] font-black text-slate-600 group-hover:text-blue-600 mb-2 z-10">
                                查看更多资源目录 <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                              </div>
                              <p className="text-[11px] text-slate-400 leading-relaxed font-medium z-10">就诊信息,既往疾病手术史,门诊就诊记录,诊断信息,住院三测单,就诊报告,检验-血型鉴定,粪便检查报告表,急诊留观病历,检验-自身免疫抗体测定,甲状腺功能检查报告表...</p>
                           </div>
                        </div>
                      </div>

                      {/* Charts Grid */}
                      <div className="grid grid-cols-2 gap-5 flex-shrink-0">
                        {/* Data Overview Chart */}
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
                          <div className="flex items-center justify-between mb-8">
                             <h4 className="text-[15px] font-black text-slate-800">数据概览</h4>
                             <div className="flex gap-1 bg-slate-100 p-1 rounded-lg">
                               <button className="px-3 py-1 bg-white text-blue-600 text-[10px] font-black rounded shadow-sm">年</button>
                               <button className="px-3 py-1 text-slate-400 text-[10px] font-bold">月</button>
                             </div>
                          </div>
                          <div className="h-64 relative border-b border-l border-slate-100">
                             <div className="absolute inset-0 flex items-end justify-around px-8">
                               <div className="flex flex-col items-center gap-4">
                                 <div className="flex items-center gap-8">
                                   <div className="w-3 h-3 rounded-full bg-blue-500 shadow-lg shadow-blue-200" />
                                   <div className="w-3 h-3 rounded-full bg-amber-500 shadow-lg shadow-amber-100" />
                                 </div>
                                 <div className="h-1 bg-slate-100 w-16" />
                               </div>
                             </div>
                             {/* Simple Chart Visual */}
                             <div className="absolute inset-0 p-8 flex items-end">
                               <div className="w-full flex items-end gap-12 justify-center">
                                  <div className="flex flex-col items-center gap-2">
                                     <div className="w-4 h-32 bg-blue-500 rounded-t shadow-lg shadow-blue-100" />
                                     <div className="w-4 h-40 bg-amber-500 rounded-t shadow-lg shadow-amber-100 -mt-32" />
                                     <span className="text-[10px] font-black text-slate-400 mt-2">2024</span>
                                  </div>
                               </div>
                             </div>
                          </div>
                        </div>

                        {/* Project/Favorite Chart */}
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
                          <div className="flex items-center justify-between mb-8">
                             <h4 className="text-[15px] font-black text-slate-800">项目/收藏概览</h4>
                             <div className="flex gap-1 bg-slate-100 p-1 rounded-lg">
                               <button className="px-3 py-1 bg-white text-blue-600 text-[10px] font-black rounded shadow-sm">年</button>
                               <button className="px-3 py-1 text-slate-400 text-[10px] font-bold">月</button>
                             </div>
                          </div>
                          <div className="h-64 relative">
                            <div className="absolute inset-0 bg-gradient-to-t from-blue-50 to-transparent opacity-50" />
                            <div className="h-full flex items-end p-4">
                               <div className="w-full h-32 border-b-2 border-blue-500 relative">
                                  <div className="absolute right-0 top-0 w-3 h-3 bg-blue-500 rounded-full border-2 border-white shadow-lg" />
                                  <div className="absolute left-0 bottom-0 w-3 h-3 bg-blue-100 rounded-full border-2 border-white" />
                               </div>
                            </div>
                            <div className="absolute bottom-4 left-0 w-full flex justify-around text-[10px] font-black text-slate-400 uppercase tracking-widest">
                               <span>2025</span>
                               <span>2026</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Business Data Statistics - Drag & Drop Interactive Board */}
                      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 mb-4">
                        <div className="flex items-center justify-between mb-6">
                          <div className="flex items-center gap-2">
                            <h4 className="text-[16px] font-black text-slate-800">业务数据统计</h4>
                            <span className="text-xs text-slate-400 font-medium bg-slate-100 px-2 py-0.5 rounded-full">
                              共 {bizStatCards.length} 个模块
                            </span>
                            <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1 bg-slate-50 px-2 py-0.5 rounded-md border border-slate-100">
                              <GripVertical size={12} className="text-slate-400" />
                              <span>支持拖拽卡片调整排序</span>
                            </span>
                          </div>
                          <button
                            onClick={() => {
                              setNewModuleContentType('常用指标');
                              setNewModuleMetricId('surg');
                              setNewModuleTitle('手术top10');
                              setNewCustomMetricField('检验报告/就诊类型');
                              setNewCustomStatType('按频次统计 (人次)');
                              setNewCustomStatRange('全部数据');
                              setIsAddModuleModalOpen(true);
                            }}
                            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-all shadow-sm shadow-blue-500/20 cursor-pointer"
                          >
                            <Plus size={14} />
                            <span>添加模块</span>
                          </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                          {bizStatCards.map((card, idx) => (
                            <BizBarChartCard 
                              key={card.id || idx}
                              cardIndex={idx}
                              title={card.title} 
                              metricId={card.metricId}
                              contentType={card.contentType}
                              isDragging={draggedCardIndex === idx}
                              isDragOver={dragOverCardIndex === idx}
                              onDragStart={(e) => {
                                e.dataTransfer.setData('text/plain', String(idx));
                                e.dataTransfer.effectAllowed = 'move';
                                setDraggedCardIndex(idx);
                              }}
                              onDragOver={(e) => {
                                e.preventDefault();
                                e.dataTransfer.dropEffect = 'move';
                                if (dragOverCardIndex !== idx) {
                                  setDragOverCardIndex(idx);
                                }
                              }}
                              onDragLeave={() => {
                                if (dragOverCardIndex === idx) {
                                  setDragOverCardIndex(null);
                                }
                              }}
                              onDrop={(e) => {
                                e.preventDefault();
                                const fromIdxStr = e.dataTransfer.getData('text/plain');
                                const fromIdx = fromIdxStr !== '' ? parseInt(fromIdxStr, 10) : draggedCardIndex;
                                if (fromIdx !== null && fromIdx !== undefined && !isNaN(fromIdx)) {
                                  handleReorderCards(fromIdx, idx);
                                }
                                setDraggedCardIndex(null);
                                setDragOverCardIndex(null);
                              }}
                              onDragEnd={() => {
                                setDraggedCardIndex(null);
                                setDragOverCardIndex(null);
                              }}
                              onDelete={() => {
                                if (bizStatCards.length <= 1) {
                                  setToastMessage('请至少保留 1 个统计模块');
                                  return;
                                }
                                const updated = bizStatCards.filter((_, i) => i !== idx);
                                setBizStatCards(updated);
                                setToastMessage(`已移除模块「${card.title}」`);
                              }}
                            />
                          ))}
                        </div>
                      </div>

                    </div>
                  </motion.div>
                )}

                {activeTab === 'patients' && (
                  <>
                    {patientSubView === 'list' && (
                      <motion.div 
                        key="patient-list"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col gap-4 h-full"
                      >
                        {/* 患者列表卡片 */}
                        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden flex flex-col flex-1 min-h-0">
                          {/* 维度切换 & 搜索过滤工具栏 */}
                          <div className="p-4 border-b border-slate-100 flex flex-wrap justify-between items-center gap-3 bg-white">
                            {/* 左侧：维度切换 Segment Tabs 与补录状态筛选 */}
                            <div className="flex flex-wrap items-center gap-3">
                              {/* 维度切换 Segment Button */}
                              <div className="p-1 bg-slate-100/80 rounded-xl flex items-center gap-1 text-xs border border-slate-200/60">
                                <button
                                  onClick={() => setListDimension('patient')}
                                  className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
                                    listDimension === 'patient'
                                      ? 'bg-white text-blue-600 shadow-xs font-bold'
                                      : 'text-slate-600 hover:text-slate-900 font-medium'
                                  }`}
                                >
                                  <Users size={13} />
                                  <span>患者维度</span>
                                  <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-blue-100 text-blue-700 font-mono font-bold">4120</span>
                                </button>
                                <button
                                  onClick={() => setListDimension('visit')}
                                  className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
                                    listDimension === 'visit'
                                      ? 'bg-white text-blue-600 shadow-xs font-bold'
                                      : 'text-slate-600 hover:text-slate-900 font-medium'
                                  }`}
                                >
                                  <List size={13} />
                                  <span>就诊维度</span>
                                  <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-200/70 text-slate-600 font-mono">12707</span>
                                </button>
                              </div>


                            </div>

                            {/* 右侧：数据筛选、数据补录、数据导入、患者自助录入、待清洗入库数据、表单配置(图标按钮) */}
                            <div className="flex flex-wrap items-center gap-2">
                              <button className="px-3 py-1.5 bg-white border border-slate-200 text-xs font-medium text-slate-700 hover:bg-slate-50 rounded-lg flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer">
                                <Filter size={14} className="text-slate-500" />
                                <span>数据筛选</span>
                              </button>

                              <button
                                onClick={() => {
                                  setPatientWorkflow('create-patient');
                                  setPatientSubView('add-data');
                                  setAddDataStep(1);
                                  setSelectedPatient(null);
                                  setSelectedEncounterId(null);
                                  setOutDbPatientForm({
                                    name: '',
                                    gender: '男',
                                    birthDate: '',
                                    idCard: '',
                                    phone: '',
                                    sourceHospital: ''
                                  });
                                }}
                                className="px-3 py-1.5 bg-white border border-blue-200 text-blue-700 hover:bg-blue-50 text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer"
                              >
                                <UserPlus size={14} />
                                <span>新建患者</span>
                              </button>

                              <button 
                                onClick={() => {
                                  setPatientWorkflow('data-entry');
                                  setPatientSubView('add-data');
                                  setAddDataStep(1);
                                  setSelectedPatient(null);
                                  setSelectedEncounterId(null);
                                }}
                                className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-sm shadow-blue-500/20 transition-colors cursor-pointer"
                              >
                                <Cloud size={14} />
                                <span>数据录入</span>
                              </button>

                              <button
                                onClick={() => {
                                  setDataImportStep('upload');
                                  setDataImportProgress(0);
                                  setShowDataImportModal(true);
                                }}
                                className="px-3 py-1.5 bg-white border border-slate-200 hover:border-blue-300 text-xs font-bold text-slate-700 hover:text-blue-600 hover:bg-blue-50/50 rounded-lg flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer"
                              >
                                <Upload size={14} className="text-slate-500" />
                                <span>数据导入</span>
                              </button>

                              <button
                                onClick={() => {
                                  const enabledForms = projectForms.filter(f => f.enabled);
                                  if (enabledForms.length > 0) {
                                    setSelectedFormForQr(enabledForms[0]);
                                  } else {
                                    setSelectedFormForQr(null);
                                  }
                                  setIsQrModalOpen(true);
                                }}
                                className="px-3 py-1.5 bg-blue-50 border border-blue-200 text-blue-700 hover:bg-blue-100 text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer"
                              >
                                <QrCode size={14} className="text-blue-600" />
                                <span>患者自助录入</span>
                              </button>

                              <button 
                                onClick={() => setShowEtlModal(true)}
                                title={hasPendingCleaningData ? '存在待清洗数据' : '暂无待清洗数据'}
                                className="relative px-3 py-1.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
                              >
                                <RotateCw size={14} className="text-indigo-600" />
                                <span>待清洗数据</span>
                                {hasPendingCleaningData && (
                                  <span
                                    aria-label="存在待清洗数据"
                                    className="absolute -right-0.5 -top-0.5 w-2.5 h-2.5 rounded-full bg-red-500 ring-2 ring-white"
                                  />
                                )}
                              </button>

                              <button
                                onClick={() => setShowFormConfigModal(true)}
                                title="表单配置"
                                className="p-2 bg-white border border-slate-200 hover:border-blue-300 text-slate-600 hover:text-blue-600 hover:bg-blue-50/50 rounded-lg flex items-center justify-center shadow-2xs transition-all cursor-pointer"
                              >
                                <Settings size={15} className="text-slate-500" />
                              </button>
                            </div>
                          </div>

                          {/* 数据表格区 */}
                          <div className="flex-1 overflow-x-auto">
                            {/* A. 就诊维度表格 */}
                            {listDimension === 'visit' && (
                              <table className="w-full text-left border-collapse">
                                <thead className="bg-slate-50/80 text-slate-700 text-xs font-bold uppercase tracking-wider sticky top-0 z-10 border-b border-slate-200">
                                  <tr>
                                    <th className="w-10 px-3 py-3 text-center">
                                      <input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer" />
                                    </th>
                                    <th className="px-3 py-3 whitespace-nowrap">序号</th>
                                    <th className="px-3 py-3 whitespace-nowrap">数据进度</th>
                                    <th className="px-3 py-3 whitespace-nowrap">
                                      <div className="flex items-center gap-1 cursor-pointer hover:text-blue-600">
                                        <span>患者就诊编号</span>
                                        <ArrowUpDown size={12} className="text-slate-400" />
                                      </div>
                                    </th>
                                    <th className="px-3 py-3 whitespace-nowrap">
                                      <div className="flex items-center gap-1 cursor-pointer hover:text-blue-600">
                                        <span>患者就诊流水号</span>
                                        <ArrowUpDown size={12} className="text-slate-400" />
                                      </div>
                                    </th>
                                    <th className="px-3 py-3 whitespace-nowrap">就诊类型</th>
                                    <th className="px-3 py-3 whitespace-nowrap">
                                      <div className="flex items-center gap-1 cursor-pointer hover:text-blue-600">
                                        <span>患者姓名</span>
                                        <ArrowUpDown size={12} className="text-slate-400" />
                                      </div>
                                    </th>
                                    <th className="px-3 py-3 whitespace-nowrap">
                                      <div className="flex items-center gap-1 cursor-pointer hover:text-blue-600">
                                        <span>性别名称</span>
                                        <ArrowUpDown size={12} className="text-slate-400" />
                                      </div>
                                    </th>
                                    <th className="px-3 py-3 whitespace-nowrap">
                                      <div className="flex items-center gap-1 cursor-pointer hover:text-blue-600">
                                        <span>就诊年龄</span>
                                        <ArrowUpDown size={12} className="text-slate-400" />
                                      </div>
                                    </th>
                                    <th className="px-3 py-3 whitespace-nowrap">
                                      <div className="flex items-center gap-1 cursor-pointer hover:text-blue-600">
                                        <span>患者来源</span>
                                        <ArrowUpDown size={12} className="text-slate-400" />
                                      </div>
                                    </th>
                                    <th className="px-3 py-3 whitespace-nowrap">
                                      <div className="flex items-center gap-1 cursor-pointer hover:text-blue-600">
                                        <span>录入人</span>
                                        <ArrowUpDown size={12} className="text-slate-400" />
                                      </div>
                                    </th>
                                    <th className="px-3 py-3 whitespace-nowrap">操作</th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 text-xs">
                                  {PATIENTS.map((p, i) => (
                                    <tr key={p.id} className="hover:bg-slate-50/80 transition-colors group">
                                      <td className="px-3 py-3 text-center">
                                        <input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer" />
                                      </td>
                                      <td className="px-3 py-3 text-slate-500 font-normal">{i + 1}</td>
                                      <td className="px-3 py-3 whitespace-nowrap min-w-[130px]">
                                        <div className="flex items-center gap-2">
                                          <div className="w-14 h-2 bg-slate-200 rounded-full overflow-hidden shrink-0">
                                            <div 
                                              className="h-full bg-blue-600 rounded-full" 
                                              style={{ width: `${Math.min(100, p.comp)}%` }} 
                                            />
                                          </div>
                                          <span className="text-[11px] font-mono text-slate-700">{p.comp}%</span>
                                        </div>
                                      </td>
                                      <td className="px-3 py-3 font-mono text-slate-700 whitespace-nowrap">{p.patientNo || p.id}</td>
                                      <td className="px-3 py-3 font-mono text-slate-700 whitespace-nowrap">{p.visitNo || `IMP2026032000${10 + i}`}</td>
                                      <td className="px-3 py-3 whitespace-nowrap">
                                        <span className={`px-2 py-0.5 rounded text-[11px] font-medium border ${
                                          (p.visitType || '外院门诊') === '外院门诊' 
                                            ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
                                            : (p.visitType || '') === '外院住院'
                                            ? 'bg-blue-50 text-blue-600 border-blue-100'
                                            : 'bg-purple-50 text-purple-600 border-purple-100'
                                        }`}>
                                          {p.visitType || '外院门诊'}
                                        </span>
                                      </td>
                                      <td className="px-3 py-3 text-slate-800 font-medium whitespace-nowrap">{p.name}</td>
                                      <td className="px-3 py-3 text-slate-500 whitespace-nowrap">{p.gender}</td>
                                      <td className="px-3 py-3 text-slate-700 whitespace-nowrap">{p.age}</td>
                                      <td className="px-3 py-3 text-slate-600 whitespace-nowrap">{p.source || '手动入库'}</td>
                                      <td className="px-3 py-3 font-mono text-slate-600 text-[11px] whitespace-nowrap">{p.creator || '201859437033684'}</td>
                                      <td className="px-3 py-3 whitespace-nowrap">
                                        <div className="flex items-center gap-2">
                                          <button 
                                            onClick={() => {
                                              setSelectedDetailPatientNo(p.patientNo || p.id);
                                              setSelectedDetailVisitId(p.visitNo || p.id);
                                              setPatientSubView('detail');
                                            }}
                                            className="text-blue-600 hover:text-blue-800 text-xs font-medium transition-colors cursor-pointer"
                                          >
                                            查看详情
                                          </button>
                                          <button 
                                            onClick={() => {
                                              const encId = p.visitNo || p.id || 'IMP202603200011';
                                              const patObj = {
                                                id: p.patientNo || p.id || 'PAT20260128003',
                                                name: p.name || '王**',
                                                gender: p.gender === '女' ? 'female' : 'male',
                                                age: p.age || 60,
                                                phone: '13800138000',
                                                idCard: '440106198503124829',
                                                visitNo: encId,
                                                visitType: p.visitType || '外院门诊',
                                                source: p.source || '手动入库',
                                              };
                                              setPatientWorkflow('data-entry');
                                              setSelectedPatient(patObj);
                                              setSelectedEncounterId(encId);
                                              setPatientSubView('add-data');
                                              setAddDataStep(2);
                                            }}
                                            className="px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold shadow-2xs transition-colors cursor-pointer flex items-center gap-1"
                                          >
                                            <Cloud size={11} /> 数据录入
                                          </button>
                                        </div>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            )}

                            {/* B. 患者维度表格（聚合展现与手风琴展开就诊明细） */}
                            {listDimension === 'patient' && (() => {
                              // 计算按患者编号聚合的数据
                              const groupsMap: Record<string, {
                                patientNo: string;
                                name: string;
                                gender: string;
                                age: number;
                                source: string;
                                creator: string;
                                visits: typeof PATIENTS;
                                avgComp: number;
                                repairStatus: 'pending' | 'processing' | 'completed';
                                missingFields: string[];
                              }> = {};

                              PATIENTS.forEach(p => {
                                const pNo = p.patientNo || p.id;
                                if (!groupsMap[pNo]) {
                                  groupsMap[pNo] = {
                                    patientNo: pNo,
                                    name: p.name,
                                    gender: p.gender,
                                    age: p.age,
                                    source: p.source || '手动入库',
                                    creator: p.creator || '201859437033684',
                                    visits: [],
                                    avgComp: 0,
                                    repairStatus: 'completed',
                                    missingFields: [],
                                  };
                                }
                                groupsMap[pNo].visits.push(p);
                              });

                              let groups = Object.values(groupsMap).map(g => {
                                const totalComp = g.visits.reduce((acc, curr) => acc + curr.comp, 0);
                                const avgComp = Number((totalComp / g.visits.length).toFixed(2));
                                let repairStatus: 'pending' | 'processing' | 'completed' = 'completed';
                                let missingFields: string[] = [];
                                if (avgComp < 50) {
                                  repairStatus = 'pending';
                                  missingFields = ['主要门诊/住院诊断', '检验明细报告', '出院小结'];
                                } else if (avgComp < 85) {
                                  repairStatus = 'processing';
                                  missingFields = ['部分图像与病理诊断报告'];
                                }
                                return { ...g, avgComp, repairStatus, missingFields };
                              });

                              if (repairFilter !== 'all') {
                                groups = groups.filter(g => g.repairStatus === repairFilter);
                              }

                              return (
                                <table className="w-full text-left border-collapse">
                                  <thead className="bg-slate-50/80 text-slate-700 text-xs font-bold uppercase tracking-wider sticky top-0 z-10 border-b border-slate-200">
                                    <tr>
                                      <th className="w-10 px-3 py-3 text-center">
                                        <input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer" />
                                      </th>
                                      <th className="px-3 py-3 whitespace-nowrap">序号</th>
                                      <th className="px-3 py-3 whitespace-nowrap">患者编号</th>
                                      <th className="px-3 py-3 whitespace-nowrap">患者姓名</th>
                                      <th className="px-3 py-3 whitespace-nowrap">性别</th>
                                      <th className="px-3 py-3 whitespace-nowrap">年龄</th>
                                      <th className="px-3 py-3 whitespace-nowrap">累计就诊记录</th>
                                      <th className="px-3 py-3 whitespace-nowrap">患者来源</th>
                                      <th className="px-3 py-3 whitespace-nowrap">录入人</th>
                                      <th className="px-3 py-3 whitespace-nowrap">操作</th>
                                    </tr>
                                  </thead>
                                  <tbody className="divide-y divide-slate-100 text-xs">
                                    {groups.map((grp, idx) => {
                                      const isExpanded = expandedPatientNos.includes(grp.patientNo);
                                      return (
                                        <React.Fragment key={grp.patientNo}>
                                          <tr className={`hover:bg-slate-50/80 transition-colors ${isExpanded ? 'bg-blue-50/30' : ''}`}>
                                            <td className="px-3 py-3 text-center">
                                              <input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer" />
                                            </td>
                                            <td className="px-3 py-3 text-slate-500 font-normal">{idx + 1}</td>
                                            <td className="px-3 py-3 font-mono font-bold text-slate-800 whitespace-nowrap">{grp.patientNo}</td>
                                            <td className="px-3 py-3 text-slate-900 font-bold whitespace-nowrap">{grp.name}</td>
                                            <td className="px-3 py-3 text-slate-500 whitespace-nowrap">{grp.gender}</td>
                                            <td className="px-3 py-3 text-slate-700 whitespace-nowrap">{grp.age}</td>
                                            <td className="px-3 py-3 whitespace-nowrap">
                                              <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-100 flex items-center gap-1 w-fit">
                                                <Calendar size={11} /> {grp.visits.length} 次就诊
                                              </span>
                                            </td>
                                            <td className="px-3 py-3 text-slate-600 whitespace-nowrap">{grp.source}</td>
                                            <td className="px-3 py-3 font-mono text-slate-600 text-[11px] whitespace-nowrap">{grp.creator}</td>
                                            <td className="px-3 py-3 whitespace-nowrap">
                                              <div className="flex items-center gap-2">
                                                <button 
                                                  onClick={() => {
                                                    setSelectedDetailPatientNo(grp.patientNo);
                                                    setSelectedDetailVisitId(grp.visits[0]?.visitNo || grp.visits[0]?.id || null);
                                                    setPatientSubView('detail');
                                                  }}
                                                  className="text-blue-600 hover:text-blue-800 text-xs font-medium cursor-pointer"
                                                >
                                                  查看详情
                                                </button>
                                                <button 
                                                  onClick={() => {
                                                    const firstVisit = grp.visits[0];
                                                    const encId = firstVisit?.visitNo || firstVisit?.id || 'IMP202603200011';
                                                    const patObj = {
                                                      id: grp.patientNo || 'PAT20260128003',
                                                      name: grp.name || '王**',
                                                      gender: grp.gender === '女' ? 'female' : 'male',
                                                      age: grp.age || 60,
                                                      phone: '13800138000',
                                                      idCard: '440106198503124829',
                                                      visitNo: encId,
                                                      visitType: firstVisit?.visitType || '外院门诊',
                                                      source: grp.source || '手动入库',
                                                    };
                                                    setPatientWorkflow('data-entry');
                                                    setSelectedPatient(patObj);
                                                    setSelectedEncounterId(encId);
                                                    setPatientSubView('add-data');
                                                    setAddDataStep(2);
                                                  }}
                                                  className="px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold shadow-2xs transition-colors cursor-pointer flex items-center gap-1"
                                                >
                                                  <Cloud size={11} /> 数据录入
                                                </button>
                                              </div>
                                            </td>
                                          </tr>
                                        </React.Fragment>
                                      );
                                    })}
                                  </tbody>
                                </table>
                              );
                            })()}
                          </div>

                          {/* 底部页码控制条 */}
                          <div className="px-6 py-3.5 border-t border-slate-200 flex flex-wrap justify-between items-center gap-4 text-xs text-slate-600 bg-white">
                            <div className="flex items-center gap-1 font-medium text-slate-700">
                              <span>共</span>
                              <span className="text-blue-600 font-bold">
                                {listDimension === 'visit' ? '12707' : '4120'}
                              </span>
                              <span>个{listDimension === 'visit' ? '就诊' : '患者'}，最后一例数据入库时间：2026-04-13 00:00:00</span>
                            </div>
                            
                            <div className="flex items-center gap-3">
                              <span className="text-slate-500">
                                共 {Math.ceil((listDimension === 'visit' ? 12707 : 4120) / patientPageSize)} 页，
                                {listDimension === 'visit' ? '12707 次就诊' : '4120 位患者'}
                              </span>
                              <div className="flex items-center gap-1">
                                <span className="text-slate-500">每页</span>
                                <select
                                  value={patientPageSize}
                                  onChange={(e) => setPatientPageSize(Number(e.target.value))}
                                  className="border border-slate-200 rounded px-1.5 py-0.5 text-xs text-slate-700 bg-white focus:outline-none focus:border-blue-500"
                                >
                                  <option value="50">50</option>
                                  <option value="20">20</option>
                                  <option value="100">100</option>
                                </select>
                                <span className="text-slate-500">条</span>
                              </div>

                              <div className="flex items-center gap-1">
                                <button className="w-7 h-7 flex items-center justify-center border border-slate-200 text-slate-400 rounded hover:bg-slate-50 transition-colors disabled:opacity-40" disabled>
                                  <ChevronLeft size={14} />
                                </button>
                                <button className="w-7 h-7 flex items-center justify-center bg-blue-600 text-white font-bold rounded shadow-2xs">
                                  1
                                </button>
                                <button className="w-7 h-7 flex items-center justify-center border border-slate-200 text-slate-600 rounded hover:bg-slate-50 transition-colors font-medium">
                                  2
                                </button>
                                <button className="w-7 h-7 flex items-center justify-center border border-slate-200 text-slate-600 rounded hover:bg-slate-50 transition-colors font-medium">
                                  3
                                </button>
                                <button className="w-7 h-7 flex items-center justify-center border border-slate-200 text-slate-600 rounded hover:bg-slate-50 transition-colors font-medium">
                                  4
                                </button>
                                <button className="w-7 h-7 flex items-center justify-center border border-slate-200 text-slate-600 rounded hover:bg-slate-50 transition-colors font-medium">
                                  5
                                </button>
                                <button className="w-7 h-7 flex items-center justify-center border border-slate-200 text-slate-600 rounded hover:bg-slate-50 transition-colors font-medium">
                                  6
                                </button>
                                <span className="px-1 text-slate-400">...</span>
                                <button className="px-1.5 h-7 flex items-center justify-center border border-slate-200 text-slate-600 rounded hover:bg-slate-50 transition-colors font-medium text-xs">
                                  {Math.ceil((listDimension === 'visit' ? 12707 : 4120) / patientPageSize)}
                                </button>
                                <button className="w-7 h-7 flex items-center justify-center border border-slate-200 text-slate-600 rounded hover:bg-slate-50 transition-colors">
                                  <ChevronRight size={14} />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {false && patientSubView === 'data-entry' && (
                      <motion.div 
                        key="data-entry"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden flex flex-col h-full"
                      >
                        {/* Data Entry Header */}
                        <div className="flex justify-between items-center p-5 border-b border-slate-100">
                          <div className="flex items-center gap-4">
                            <button 
                              onClick={() => {
                                setPatientSubView('list');
                                setSelectedDataEntryForm(null);
                              }} 
                              className="flex items-center gap-1 text-slate-500 hover:text-blue-600 transition-colors bg-slate-50 hover:bg-blue-50 px-3 py-1.5 rounded-lg text-sm font-bold"
                            >
                              <ArrowLeft size={16} /> 返回
                            </button>
                            <div className="h-5 w-px bg-slate-200"></div>
                            <span className="font-black text-slate-800 text-lg">数据补录</span>
                          </div>
                          <div className="text-xs text-amber-600 bg-amber-50 px-4 py-2 rounded-lg flex items-center gap-2 font-medium border border-amber-100">
                            <AlertCircle size={14} className="text-amber-500" />
                            补录的数据将进行数据清洗，清洗完成后请在患者列表中查看，请第二天查看。
                          </div>
                        </div>

                        <div className="flex-1 flex flex-col overflow-hidden">
                          {/* Data Entry Toolbar */}
                          <div className="flex justify-between items-center p-4 bg-slate-50/50 border-b border-slate-100">
                            <div className="flex items-center gap-3">
                              {/* Tiled Form Selector */}
                              <div className="flex gap-2">
                                {[
                                  { id: 'std_imaging', name: '检查报告', type: 'standard' },
                                  { id: 'std_lab', name: '检验报告', type: 'standard' },
                                  ...projectForms
                                    .filter(f => f.usage?.includes(isFromFavorites ? 'favorites' : 'data-center') && f.name !== '简易问卷' && f.name !== '外显子基因报告')
                                    .map(f => ({ ...f, type: 'crf' }))
                                ].map((item) => (
                                  <button 
                                    key={item.id}
                                    onClick={() => setSelectedDataEntryForm(item)}
                                    className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                                      selectedDataEntryForm?.id === item.id 
                                        ? 'bg-blue-600 text-white shadow-md shadow-blue-100' 
                                        : 'bg-white border border-slate-200 text-slate-500 hover:bg-slate-50'
                                    }`}
                                  >
                                    {item.name}
                                  </button>
                                ))}
                              </div>
                            </div>


                              <div className="flex gap-3">
                                <button className="px-4 py-2 bg-white border border-slate-200 text-slate-600 font-bold text-sm rounded-lg shadow-sm hover:bg-slate-50 flex items-center gap-2 transition-colors">
                                  <Filter size={14} /> 数据筛选
                                </button>
                                <button className="px-4 py-2 bg-white border border-slate-200 text-slate-600 font-bold text-sm rounded-lg shadow-sm hover:bg-slate-50 flex items-center gap-2 transition-colors">
                                  <Upload size={14} /> 数据导入
                                </button>
                                <button 
                                  onClick={() => {
                                    const enabledForms = projectForms.filter(f => f.enabled);
                                    if (selectedDataEntryForm?.type === 'crf' && selectedDataEntryForm?.enabled) {
                                      setSelectedFormForQr(selectedDataEntryForm);
                                    } else if (enabledForms.length > 0) {
                                      setSelectedFormForQr(enabledForms[0]);
                                    } else {
                                      setSelectedFormForQr(null);
                                    }
                                    setIsQrModalOpen(true);
                                  }}
                                  className="px-4 py-2 bg-white border border-blue-200 text-blue-600 font-bold text-sm rounded-lg shadow-sm hover:bg-blue-50 flex items-center gap-2 transition-colors"
                                >
                                  <QrCode size={14} /> 患者自助录入
                                </button>
                                <button 
                                  onClick={() => {
                                    setIsOutcomeModalOpen(true);
                                  }}
                                  className="px-4 py-2 bg-white border border-rose-200 text-rose-600 font-bold text-sm rounded-lg shadow-sm hover:bg-rose-50 flex items-center gap-2 transition-colors"
                                >
                                  <Flag size={14} /> 设置患者结局
                                </button>
                                <button 
                                  onClick={() => {
                                    setPatientWorkflow('data-entry');
                                    setPatientSubView('add-data');
                                    setAddDataStep(1);
                                    setSelectedPatient(null);
                                    setIsFromFavorites(false);
                                  }}
                                  className="px-4 py-2 bg-blue-600 text-white font-bold text-sm rounded-lg shadow-lg shadow-blue-100 hover:bg-blue-700 flex items-center gap-2 transition-colors"
                                >
                                  <Plus size={14} /> 添加数据
                                </button>
                                <button 
                                  onClick={() => setIsFormConfigModalOpen(true)}
                                  className="p-2 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-blue-600 hover:border-blue-200 transition-all shadow-sm group"
                                  title="CRF表单配置"
                                >
                                  <Settings size={16} className="group-hover:rotate-90 transition-transform duration-500" />
                                </button>
                              </div>
                            </div>

                            {/* Data Entry Table */}
                            <div className="flex-1 overflow-auto bg-slate-50/30">
                              <table className="w-full text-left border-collapse min-w-max">
                                <thead className="bg-slate-100/80 text-slate-600 text-xs font-bold sticky top-0 z-10 shadow-sm">
                                  <tr>
                                    <th className="p-3 border border-slate-200 w-10 text-center">
                                      <input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                                    </th>
                                    {[
                                      selectedDataEntryForm?.id === 'std_lab' ? ['患者编号', '报告单号', '报告日期', '检验项目', '检验结果值', '结果单位', '参考范围', '异常标识', '医院', '报告原文', '录入人', '更新时间'] :
                                      selectedDataEntryForm?.id === 'std_imaging' ? ['患者编号', '检查单号', '检查日期', '检查项目', '检查部位', '检查结论', '检查描述', '医院', '影像文件', '录入人', '更新时间'] :
                                      selectedDataEntryForm?.id === 'std_pathology' ? ['患者编号', '病理单号', '诊断日期', '病理诊断', '标本部位', '镜下描述', '免疫组化', '医院', '病理切片', '录入人', '更新时间'] :
                                      ['患者编号', '记录编号', '录入日期', '字段1', '字段2', '字段3', '字段4', '字段5', '备注', '附件', '录入人', '更新时间']
                                    ][0].map((col, idx) => (
                                      <th key={idx} className="p-3 border border-slate-200 whitespace-nowrap">
                                        <div className="flex items-center justify-between gap-3">
                                          <span>{col}</span>
                                          {col !== '报告原文' && col !== '影像文件' && col !== '病理切片' && col !== '附件' && col !== '更新时间' && (
                                            <div className="flex items-center text-slate-400">
                                              <ArrowUpDown size={12} className="cursor-pointer hover:text-blue-600" />
                                              <Filter size={12} className="ml-1 cursor-pointer hover:text-blue-600" />
                                            </div>
                                          )}
                                        </div>
                                      </th>
                                    ))}
                                  </tr>
                                </thead>
                                <tbody className="text-xs text-slate-600 bg-white">
                                  {records.map((record, i) => {
                                    const isNew = !record.patientId;
                                    const cellClass = "p-2 border border-slate-200";
                                    const inputClass = "w-full bg-transparent outline-none focus:bg-blue-50 px-2 py-1 rounded transition-colors border border-transparent focus:border-blue-300";
                                    
                                    // Helper to render cells based on form type
                                    const renderCells = () => {
                                      if (selectedDataEntryForm?.id === 'std_lab') {
                                        return (
                                          <>
                                            <td className={cellClass}>{isNew ? <input type="text" className={inputClass} placeholder="请输入" /> : record.patientId}</td>
                                            <td className={cellClass}>{isNew ? <input type="text" className={inputClass} placeholder="请输入" /> : record.reportNo}</td>
                                            <td className={cellClass}>{isNew ? <input type="date" className={inputClass} /> : record.reportDate}</td>
                                            <td className={cellClass}>{isNew ? <input type="text" className={inputClass} placeholder="请输入" /> : record.itemName}</td>
                                            <td className={cellClass}>{isNew ? <input type="text" className={inputClass} placeholder="请输入" /> : record.resultValue}</td>
                                            <td className={cellClass}>{isNew ? <input type="text" className={inputClass} placeholder="请输入" /> : record.unit}</td>
                                            <td className={cellClass}>{isNew ? <input type="text" className={inputClass} placeholder="请输入" /> : record.refRange}</td>
                                            <td className={cellClass}>{isNew ? <input type="text" className={inputClass} placeholder="请输入" /> : record.abnormalFlag}</td>
                                            <td className={cellClass}>{isNew ? <input type="text" className={inputClass} placeholder="请输入" /> : record.hospital}</td>
                                            <td className={cellClass}>
                                              {isNew ? (
                                                <button className="text-blue-500 hover:text-blue-700 flex items-center gap-1 px-2 py-1">
                                                  <Upload size={14} /> 上传
                                                </button>
                                              ) : record.originalReport && (
                                                <div className="flex items-center gap-1 text-blue-600 cursor-pointer hover:underline px-2 py-1">
                                                  <ImageIcon size={14} /> {record.originalReport}
                                                </div>
                                              )}
                                            </td>
                                          </>
                                        );
                                      } else if (selectedDataEntryForm?.id === 'std_imaging') {
                                        return (
                                          <>
                                            <td className={cellClass}>{isNew ? <input type="text" className={inputClass} placeholder="请输入" /> : record.patientId}</td>
                                            <td className={cellClass}>{isNew ? <input type="text" className={inputClass} placeholder="请输入" /> : record.reportNo}</td>
                                            <td className={cellClass}>{isNew ? <input type="date" className={inputClass} /> : record.reportDate}</td>
                                            <td className={cellClass}>{isNew ? <input type="text" className={inputClass} placeholder="请输入" /> : '胸部CT'}</td>
                                            <td className={cellClass}>{isNew ? <input type="text" className={inputClass} placeholder="请输入" /> : '肺部'}</td>
                                            <td className={cellClass}>{isNew ? <input type="text" className={inputClass} placeholder="请输入" /> : '未见明显异常'}</td>
                                            <td className={cellClass}>{isNew ? <input type="text" className={inputClass} placeholder="请输入" /> : '双肺纹理清晰...'}</td>
                                            <td className={cellClass}>{isNew ? <input type="text" className={inputClass} placeholder="请输入" /> : record.hospital}</td>
                                            <td className={cellClass}>
                                              <button className="text-blue-500 hover:text-blue-700 flex items-center gap-1 px-2 py-1">
                                                <Upload size={14} /> 上传
                                              </button>
                                            </td>
                                          </>
                                        );
                                      } else if (selectedDataEntryForm?.id === 'std_pathology') {
                                        return (
                                          <>
                                            <td className={cellClass}>{isNew ? <input type="text" className={inputClass} placeholder="请输入" /> : record.patientId}</td>
                                            <td className={cellClass}>{isNew ? <input type="text" className={inputClass} placeholder="请输入" /> : record.reportNo}</td>
                                            <td className={cellClass}>{isNew ? <input type="date" className={inputClass} /> : record.reportDate}</td>
                                            <td className={cellClass}>{isNew ? <input type="text" className={inputClass} placeholder="请输入" /> : '腺癌'}</td>
                                            <td className={cellClass}>{isNew ? <input type="text" className={inputClass} placeholder="请输入" /> : '肺左下叶'}</td>
                                            <td className={cellClass}>{isNew ? <input type="text" className={inputClass} placeholder="请输入" /> : '镜下见异型细胞...'}</td>
                                            <td className={cellClass}>{isNew ? <input type="text" className={inputClass} placeholder="请输入" /> : 'CK(+), TTF-1(+)'}</td>
                                            <td className={cellClass}>{isNew ? <input type="text" className={inputClass} placeholder="请输入" /> : record.hospital}</td>
                                            <td className={cellClass}>
                                              <button className="text-blue-500 hover:text-blue-700 flex items-center gap-1 px-2 py-1">
                                                <Upload size={14} /> 上传
                                              </button>
                                            </td>
                                          </>
                                        );
                                      } else {
                                        // CRF or other
                                        return (
                                          <>
                                            <td className={cellClass}>{isNew ? <input type="text" className={inputClass} placeholder="请输入" /> : record.patientId}</td>
                                            <td className={cellClass}>{isNew ? <input type="text" className={inputClass} placeholder="请输入" /> : 'REC-001'}</td>
                                            <td className={cellClass}>{isNew ? <input type="date" className={inputClass} /> : record.reportDate}</td>
                                            <td className={cellClass}><input type="text" className={inputClass} placeholder="请输入" /></td>
                                            <td className={cellClass}><input type="text" className={inputClass} placeholder="请输入" /></td>
                                            <td className={cellClass}><input type="text" className={inputClass} placeholder="请输入" /></td>
                                            <td className={cellClass}><input type="text" className={inputClass} placeholder="请输入" /></td>
                                            <td className={cellClass}><input type="text" className={inputClass} placeholder="请输入" /></td>
                                            <td className={cellClass}><input type="text" className={inputClass} placeholder="请输入" /></td>
                                            <td className={cellClass}>
                                              <button className="text-blue-500 hover:text-blue-700 flex items-center gap-1 px-2 py-1">
                                                <Upload size={14} /> 上传
                                              </button>
                                            </td>
                                          </>
                                        );
                                      }
                                    };

                                    return (
                                      <tr key={record.id} className="hover:bg-blue-50/30 transition-colors group">
                                        <td className="p-2 border border-slate-200 text-center">
                                          <input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                                        </td>
                                        {renderCells()}
                                        <td className={cellClass}>{record.enteredBy}</td>
                                        <td className={`${cellClass} text-slate-400`}>{record.updateTime}</td>
                                      </tr>
                                    );
                                  })}
                                </tbody>
                              </table>
                            </div>

                            {/* Data Entry Pagination */}
                            <div className="p-4 border-t border-slate-100 flex justify-end items-center gap-3 text-xs text-slate-600 bg-white">
                              <button className="w-8 h-8 flex items-center justify-center border border-slate-200 rounded hover:bg-slate-50">
                                <ChevronLeft size={14} />
                              </button>
                              <button className="w-8 h-8 flex items-center justify-center bg-blue-500 text-white rounded font-bold">1</button>
                              <button className="w-8 h-8 flex items-center justify-center border border-slate-200 rounded hover:bg-slate-50">2</button>
                              <button className="w-8 h-8 flex items-center justify-center border border-slate-200 rounded hover:bg-slate-50">3</button>
                              <button className="w-8 h-8 flex items-center justify-center border border-slate-200 rounded hover:bg-slate-50">4</button>
                              <button className="w-8 h-8 flex items-center justify-center border border-slate-200 rounded hover:bg-slate-50">5</button>
                              <span className="px-1">...</span>
                              <button className="w-8 h-8 flex items-center justify-center border border-slate-200 rounded hover:bg-slate-50">50</button>
                              <button className="w-8 h-8 flex items-center justify-center border border-slate-200 rounded hover:bg-slate-50">
                                <ChevronRight size={14} />
                              </button>
                              <select className="border border-slate-200 rounded px-2 py-1.5 bg-white outline-none focus:border-blue-500 ml-2">
                                <option>10条/页</option>
                                <option>20条/页</option>
                                <option>50条/页</option>
                              </select>
                            </div>
                          </div>
                        </motion.div>
                      )}

                    {patientSubView === 'add-data' && (
                      <motion.div 
                        key="add-data"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden flex flex-col h-full"
                      >
                        {/* Add Data Header */}
                        <div className="flex justify-between items-center p-5 border-b border-slate-100">
                          <div className="flex items-center gap-4">
                            <button 
                              onClick={() => {
                                setPatientSubView('list');
                                setAddDataStep(1);
                                setSelectedEncounterId(null);
                              }} 
                              className="flex items-center gap-1 text-slate-500 hover:text-blue-600 transition-colors bg-slate-50 hover:bg-blue-50 px-3 py-1.5 rounded-lg text-sm font-bold"
                            >
                              <ArrowLeft size={16} /> 返回
                            </button>
                            <div className="h-5 w-px bg-slate-200"></div>
                            <div>
                              <span className="font-black text-slate-800 text-lg">
                                {patientWorkflow === 'create-patient' ? '新建患者' : '数据录入'}
                              </span>
                              <p className="text-xs text-slate-400 mt-0.5">
                                {patientWorkflow === 'create-patient'
                                  ? '创建患者主档，建档后可继续录入临床数据'
                                  : '仅为已有患者补充就诊和报告数据'}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Stepper */}
                        <div className="px-10 py-8 bg-slate-50/30 border-b border-slate-100">
                          <div className="flex items-center justify-between max-w-3xl mx-auto relative">
                            {/* Connector Lines */}
                            <div className="absolute top-5 left-0 w-full h-0.5 bg-slate-200 -z-0">
                              <div 
                                className="h-full bg-blue-500 transition-all duration-500" 
                                style={{ width: `${((addDataStep - 1) / 2) * 100}%` }}
                              ></div>
                            </div>
                            
                            {[
                              { step: 1, label: patientWorkflow === 'create-patient' ? '建立患者档案' : '选择已有患者' },
                              { step: 2, label: '录入报告' },
                              { step: 3, label: patientWorkflow === 'create-patient' ? '新增首次就诊' : '选择或新增就诊' }
                            ].map((s) => (
                              <div key={s.step} className="flex flex-col items-center gap-2 relative z-10">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                                  addDataStep >= s.step 
                                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' 
                                    : 'bg-white border-2 border-slate-200 text-slate-400'
                                }`}>
                                  {addDataStep > s.step ? <Check size={18} /> : s.step}
                                </div>
                                <span className={`text-xs font-bold ${addDataStep >= s.step ? 'text-blue-600' : 'text-slate-400'}`}>
                                  {s.label}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Step Content */}
                        <div className="flex-1 overflow-y-auto p-8">
                          <div className="max-w-4xl mx-auto">
                            {addDataStep === 1 && (
                              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                                {patientWorkflow === 'data-entry' ? (
                                  <>
                                    <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100">
                                      <h3 className="text-sm font-black text-slate-800 mb-4 flex items-center gap-2">
                                        <SearchIcon size={16} className="text-blue-500" /> 查找已有患者
                                      </h3>
                                      <div className="flex gap-0 items-center bg-white border border-slate-200 rounded-xl shadow-sm overflow-visible">
                                        <div className="relative">
                                          <button 
                                            onClick={() => setIsSearchDropdownOpen(!isSearchDropdownOpen)}
                                            className="flex items-center gap-2 px-4 py-3 text-slate-600 hover:bg-slate-50 transition-colors rounded-l-xl min-w-[120px] justify-between"
                                          >
                                            <span className="text-sm font-bold">
                                              {searchType === 'name' ? '患者姓名' : searchType === 'id' ? '患者编号' : '身份证号'}
                                            </span>
                                            <ChevronDown size={14} className={`transition-transform duration-200 ${isSearchDropdownOpen ? 'rotate-180' : ''}`} />
                                          </button>

                                          <AnimatePresence>
                                            {isSearchDropdownOpen && (
                                              <>
                                                <div 
                                                  className="fixed inset-0 z-10" 
                                                  onClick={() => setIsSearchDropdownOpen(false)}
                                                />
                                                <motion.div 
                                                  initial={{ opacity: 0, y: 10 }}
                                                  animate={{ opacity: 1, y: 0 }}
                                                  exit={{ opacity: 0, y: 10 }}
                                                  className="absolute top-full left-0 mt-1 w-40 bg-white border border-slate-100 rounded-xl shadow-xl z-20 py-2 overflow-hidden"
                                                >
                                                  {[
                                                    { id: 'name', label: '患者姓名' },
                                                    { id: 'id', label: '患者编号' },
                                                    { id: 'idCard', label: '身份证号' }
                                                  ].map(type => (
                                                    <button
                                                      key={type.id}
                                                      onClick={() => {
                                                        setSearchType(type.id as any);
                                                        setIsSearchDropdownOpen(false);
                                                      }}
                                                      className={`w-full text-left px-4 py-2 text-xs font-bold transition-colors ${
                                                        searchType === type.id 
                                                          ? 'bg-blue-50 text-blue-600' 
                                                          : 'text-slate-600 hover:bg-slate-50'
                                                      }`}
                                                    >
                                                      {type.label}
                                                    </button>
                                                  ))}
                                                </motion.div>
                                              </>
                                            )}
                                          </AnimatePresence>
                                        </div>

                                        <div className="w-[1px] h-6 bg-slate-200" />

                                        <input 
                                          type="text" 
                                          value={searchQuery}
                                          onChange={(e) => setSearchQuery(e.target.value)}
                                          placeholder="输入检索内容" 
                                          className="flex-1 px-4 py-3 bg-transparent text-sm outline-none"
                                        />
                                        
                                        <div className="pr-2">
                                          <button className="px-8 py-2.5 bg-blue-600 text-white font-bold text-sm rounded-lg shadow-lg shadow-blue-100 hover:bg-blue-700 transition-colors">
                                            查询
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </>
                                ) : (
                                  /* 新患者建档表单 */
                                  <div className="bg-blue-50/40 p-6 rounded-2xl border border-blue-200/80 space-y-5">
                                    <div className="flex items-center justify-between pb-3 border-b border-blue-200/60">
                                      <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center font-bold">
                                          <UserPlus size={18} />
                                        </div>
                                        <div>
                                          <h3 className="text-sm font-black text-slate-900">建立患者主档</h3>
                                          <p className="text-xs text-slate-500 mt-0.5">用于首次进入平台的患者，请先完成身份查重与基本信息登记</p>
                                        </div>
                                      </div>
                                      <span className="px-2.5 py-1 bg-blue-100 text-blue-800 text-[11px] font-bold rounded-lg border border-blue-200">
                                        患者编号将在保存后生成
                                      </span>
                                    </div>

                                    <div className="flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs text-amber-800">
                                      <AlertTriangle size={15} className="mt-0.5 shrink-0" />
                                      <span>保存前将根据证件号、手机号、姓名和出生日期检查疑似重复患者。</span>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                                      <div className="space-y-1.5">
                                        <label className="font-bold text-slate-700 flex items-center gap-1">
                                          <span className="text-red-500">*</span> 患者姓名
                                        </label>
                                        <input
                                          type="text"
                                          placeholder="例如：陈*文"
                                          value={outDbPatientForm.name}
                                          onChange={(e) => setOutDbPatientForm({ ...outDbPatientForm, name: e.target.value })}
                                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-slate-800 outline-none focus:border-blue-500 font-medium"
                                        />
                                      </div>

                                      <div className="space-y-1.5">
                                        <label className="font-bold text-slate-700 flex items-center gap-1">
                                          <span className="text-red-500">*</span> 性别
                                        </label>
                                        <select
                                          value={outDbPatientForm.gender}
                                          onChange={(e) => setOutDbPatientForm({ ...outDbPatientForm, gender: e.target.value })}
                                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-slate-800 outline-none focus:border-blue-500 font-medium"
                                        >
                                          <option value="男">男</option>
                                          <option value="女">女</option>
                                        </select>
                                      </div>

                                      <div className="space-y-1.5">
                                        <label className="font-bold text-slate-700 flex items-center gap-1">
                                          <span className="text-red-500">*</span> 出生日期
                                        </label>
                                        <input
                                          type="date"
                                          value={outDbPatientForm.birthDate}
                                          onChange={(e) => setOutDbPatientForm({ ...outDbPatientForm, birthDate: e.target.value })}
                                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-slate-800 outline-none focus:border-blue-500 font-medium text-slate-700"
                                        />
                                      </div>

                                      <div className="space-y-1.5">
                                        <label className="font-bold text-slate-700">身份证号</label>
                                        <input
                                          type="text"
                                          placeholder="4401021968******12"
                                          value={outDbPatientForm.idCard}
                                          onChange={(e) => setOutDbPatientForm({ ...outDbPatientForm, idCard: e.target.value })}
                                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-slate-800 outline-none focus:border-blue-500 font-medium"
                                        />
                                      </div>

                                      <div className="space-y-1.5">
                                        <label className="font-bold text-slate-700">联系电话</label>
                                        <input
                                          type="text"
                                          placeholder="138****9988"
                                          value={outDbPatientForm.phone}
                                          onChange={(e) => setOutDbPatientForm({ ...outDbPatientForm, phone: e.target.value })}
                                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-slate-800 outline-none focus:border-blue-500 font-medium"
                                        />
                                      </div>

                                      <div className="space-y-1.5">
                                        <label className="font-bold text-slate-700">医院名称</label>
                                        <input
                                          type="text"
                                          placeholder="例如：中山大学附属第一医院"
                                          value={outDbPatientForm.sourceHospital}
                                          onChange={(e) => setOutDbPatientForm({ ...outDbPatientForm, sourceHospital: e.target.value })}
                                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-slate-800 outline-none focus:border-blue-500 font-medium"
                                        />
                                      </div>
                                    </div>

                                    <div className="pt-3 border-t border-blue-100">
                                      <p className="text-[11px] text-slate-500">资料暂不齐全时，可使用页面底部的“仅保存患者档案”，稍后再补充数据。</p>
                                    </div>
                                  </div>
                                )}

                                {patientWorkflow === 'data-entry' && <div className="space-y-4">
                                  <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-3">
                                      <h3 className="text-sm font-black text-slate-800">符合患者</h3>
                                      {searchQuery && (
                                        <button 
                                          onClick={() => setSearchQuery('')}
                                          className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full font-black hover:bg-slate-200 transition-colors"
                                        >
                                          清除搜索
                                        </button>
                                      )}
                                    </div>
                                    <span className="text-xs text-slate-400 font-bold">
                                      共 {(() => {
                                        const query = searchQuery.toLowerCase();
                                        if (!searchQuery) return 4;
                                        return PATIENTS.filter(p => {
                                          if (searchType === 'name') return p.name.toLowerCase().includes(query);
                                          if (searchType === 'id') return p.id.toLowerCase().includes(query);
                                          if (searchType === 'idCard') return p.idCard?.toLowerCase().includes(query);
                                          return false;
                                        }).length;
                                      })()} 条结果
                                    </span>
                                  </div>
                                  
                                  {(() => {
                                    const results = searchQuery 
                                      ? PATIENTS.filter(p => {
                                          const query = searchQuery.toLowerCase();
                                          if (searchType === 'name') return p.name.toLowerCase().includes(query);
                                          if (searchType === 'id') return p.id.toLowerCase().includes(query);
                                          if (searchType === 'idCard') return p.idCard?.toLowerCase().includes(query);
                                          return false;
                                        })
                                      : PATIENTS.slice(0, 4);
                                    
                                    // Auto-select if only one result and not already selected
                                    if (results.length === 1 && selectedPatient?.id !== results[0].id) {
                                      setSelectedPatient(results[0]);
                                    }
                                    
                                    if (results.length === 0) {
                                      return (
                                        <div className="bg-white border border-slate-100 rounded-2xl p-12 text-center">
                                          <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <SearchIcon size={24} className="text-slate-300" />
                                          </div>
                                          <p className="text-slate-400 text-sm font-bold">未找到匹配的患者</p>
                                        </div>
                                      );
                                    }

                                    if (results.length === 1) {
                                      const p = results[0];
                                      return (
                                        <div 
                                          onClick={() => setSelectedPatient(p)}
                                          className={`rounded-2xl border-2 cursor-pointer transition-all overflow-hidden p-8 ${
                                            selectedPatient?.id === p.id 
                                              ? 'border-blue-500 bg-blue-50/10 shadow-xl shadow-blue-100/20' 
                                              : 'border-slate-100 hover:border-blue-200 hover:bg-slate-50 bg-white'
                                          }`}
                                        >
                                          <div className="flex items-start gap-8 relative z-10">
                                            <div className="relative">
                                              <div className={`w-28 h-28 rounded-[2rem] flex items-center justify-center text-white shadow-2xl transition-all duration-500 ${
                                                selectedPatient?.id === p.id ? 'bg-blue-600 scale-105 rotate-3' : 'bg-slate-200'
                                              }`}>
                                                <User size={56} />
                                              </div>
                                              <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white text-[10px] font-black px-3 py-1 rounded-full shadow-lg border-2 border-white flex items-center gap-1">
                                                <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                                                匹配成功
                                              </div>
                                            </div>
                                            
                                            <div className="flex-1">
                                              <div className="flex items-center gap-4 mb-5">
                                                <span className="font-black text-slate-800 text-4xl tracking-tight">{p.name}</span>
                                                <div className="flex gap-2">
                                                  <span className="px-4 py-1.5 bg-blue-600 text-white rounded-xl text-xs font-black shadow-md shadow-blue-100">{p.gender}</span>
                                                  <span className="px-4 py-1.5 bg-slate-800 text-white rounded-xl text-xs font-black shadow-md shadow-slate-100">{p.age} 岁</span>
                                                </div>
                                              </div>
                                              
                                              <div className="grid grid-cols-3 gap-x-16 gap-y-5">
                                                <div className="space-y-1.5">
                                                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">患者编号</p>
                                                  <p className="text-base text-slate-800 font-mono font-black">{p.id}</p>
                                                </div>
                                                <div className="space-y-1.5">
                                                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">手机号码</p>
                                                  <p className="text-base text-slate-800 font-mono font-black">{p.phone}</p>
                                                </div>
                                                <div className="space-y-1.5">
                                                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">身份证号</p>
                                                  <p className="text-base text-slate-800 font-mono font-black">{p.idCard}</p>
                                                </div>
                                              </div>
                                            </div>
                                            
                                            <div className="flex flex-col gap-3 min-w-[140px]">
                                              <button 
                                                onClick={(e) => {
                                                  e.stopPropagation();
                                                  setSelectedDetailPatientNo(p.patientNo || p.id);
                                                  setSelectedDetailVisitId(p.visitNo || p.id);
                                                  setPatientSubView('detail');
                                                }}
                                                className="w-full py-3 bg-white border-2 border-slate-100 text-slate-600 text-xs font-black rounded-2xl hover:border-blue-200 hover:bg-slate-50 transition-all active:scale-95 cursor-pointer"
                                              >
                                                查看详情
                                              </button>
                                              <button 
                                                onClick={(e) => {
                                                  e.stopPropagation();
                                                  setSelectedPatient(p);
                                                  setAddDataStep(2);
                                                }}
                                                className="w-full py-3 bg-blue-600 text-white text-xs font-black rounded-2xl shadow-xl shadow-blue-200 hover:bg-blue-700 hover:-translate-y-0.5 transition-all active:scale-95"
                                              >
                                                确认并继续
                                              </button>
                                            </div>
                                          </div>
                                          
                                          {/* Decorative background element */}
                                          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
                                          <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-48 h-48 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />
                                        </div>
                                      );
                                    }

                                    return (
                                      <div className="space-y-3">
                                        {results.map(p => (
                                          <div 
                                            key={p.id}
                                            onClick={() => {
                                              setSelectedPatient(p);
                                              setAddDataStep(2);
                                            }}
                                            className={`rounded-2xl border-2 cursor-pointer transition-all overflow-hidden flex items-stretch ${
                                              selectedPatient?.id === p.id 
                                                ? 'border-blue-500 bg-blue-50/10 shadow-md' 
                                                : 'border-slate-100 hover:border-blue-200 hover:bg-slate-50 bg-white'
                                            }`}
                                          >
                                            <div className="p-4 flex items-center gap-4 flex-1">
                                              <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                                                selectedPatient?.id === p.id ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-500'
                                              }`}>
                                                <User size={24} />
                                              </div>
                                              <div className="flex-1 grid grid-cols-3 items-center gap-4">
                                                <div>
                                                  <div className="flex items-baseline gap-2">
                                                    <span className="font-black text-slate-800 text-lg">{p.name}</span>
                                                    <span className="text-xs font-bold text-slate-500">{p.gender} · {p.age}岁</span>
                                                  </div>
                                                  <div className="text-[10px] font-bold text-slate-400 mt-0.5 font-mono">ID: {p.id}</div>
                                                </div>
                                                
                                                <div className="space-y-0.5">
                                                  <p className="text-[9px] text-slate-400 font-black uppercase tracking-wider">手机号码</p>
                                                  <p className="text-xs text-slate-700 font-bold font-mono">{p.phone}</p>
                                                </div>
                                                
                                                <div className="space-y-0.5">
                                                  <p className="text-[9px] text-slate-400 font-black uppercase tracking-wider">身份证号</p>
                                                  <p className="text-xs text-slate-700 font-bold font-mono">{p.idCard}</p>
                                                </div>
                                              </div>

                                              <div className="flex items-center justify-end pr-4">
                                                {selectedPatient?.id === p.id && (
                                                  <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-100">
                                                    <Check size={14} />
                                                  </div>
                                                )}
                                              </div>
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    );
                                  })()}
                                </div>}
                              </motion.div>
                            )}

                            {addDataStep === 2 && (
                              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                                {selectedPatient && (
                                  <div className="bg-blue-50/50 border-2 border-blue-600 ring-4 ring-blue-50 p-4 rounded-2xl flex items-center gap-6">
                                    <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center">
                                      <User size={24} />
                                    </div>
                                    <div className="flex-1 grid grid-cols-3 items-center gap-4">
                                      <div>
                                        <div className="flex items-baseline gap-2">
                                          <span className="font-black text-slate-800 text-lg">{selectedPatient.name}</span>
                                          <span className="text-xs font-bold text-slate-500">
                                            {selectedPatient.gender === 'male' ? '男' : '女'} · {selectedPatient.age}岁
                                          </span>
                                        </div>
                                        <div className="text-[10px] font-bold text-slate-400 mt-0.5 font-mono">ID: {selectedPatient.id}</div>
                                      </div>
                                      
                                      <div className="space-y-0.5">
                                        <p className="text-[9px] text-slate-400 font-black uppercase tracking-wider">手机号码</p>
                                        <p className="text-xs text-slate-700 font-bold font-mono">{selectedPatient.phone}</p>
                                      </div>
                                      
                                      <div className="space-y-0.5">
                                        <p className="text-[9px] text-slate-400 font-black uppercase tracking-wider">身份证号</p>
                                        <p className="text-xs text-slate-700 font-bold font-mono">{selectedPatient.idCard}</p>
                                      </div>
                                    </div>
                                  </div>
                                )}

                                {isAnalyzing ? (
                                  <div className="flex flex-col items-center justify-center py-20 space-y-6">
                                    <div className="relative">
                                      <div className="w-20 h-20 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
                                      <div className="absolute inset-0 flex items-center justify-center">
                                        <Brain size={32} className="text-blue-600 animate-pulse" />
                                      </div>
                                    </div>
                                    <div className="text-center space-y-2">
                                      <h3 className="text-lg font-black text-slate-800">系统正在智能分析报告...</h3>
                                      <p className="text-sm text-slate-500">正在识别报告类型、关键指标及是否需要关联就诊信息</p>
                                    </div>
                                  </div>
                                ) : (
                                  <div className="space-y-12">
                                    {reports.map((report, index) => (
                                      <div key={report.id} className="relative p-6 bg-white border border-slate-100 rounded-3xl shadow-sm space-y-6">
                                        <div className="flex justify-between items-center">
                                          <div className="flex gap-4 p-1 bg-slate-100 rounded-2xl w-fit">
                                            <button 
                                              onClick={() => updateReportType(report.id, 'imaging')}
                                              className={`px-8 py-2.5 rounded-xl text-sm font-black transition-all ${
                                                report.type === 'imaging' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'
                                              }`}
                                            >
                                              检查报告
                                            </button>
                                            <button 
                                              onClick={() => updateReportType(report.id, 'pathology')}
                                              className={`px-8 py-2.5 rounded-xl text-sm font-black transition-all ${
                                                report.type === 'pathology' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'
                                              }`}
                                            >
                                              病理报告
                                            </button>
                                            <button 
                                              onClick={() => updateReportType(report.id, 'lab')}
                                              className={`px-8 py-2.5 rounded-xl text-sm font-black transition-all ${
                                                report.type === 'lab' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'
                                              }`}
                                            >
                                              简易问卷
                                            </button>
                                            <button 
                                              onClick={() => updateReportType(report.id, 'gene')}
                                              className={`px-8 py-2.5 rounded-xl text-sm font-black transition-all ${
                                                report.type === 'gene' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'
                                              }`}
                                            >
                                              外显子基因报告
                                            </button>
                                          </div>

                                          {reports.length > 1 && (
                                            <button 
                                              onClick={() => removeReport(report.id)}
                                              className="p-2 text-slate-300 hover:text-red-500 transition-colors"
                                            >
                                              <Trash2 size={18} />
                                            </button>
                                          )}
                                        </div>

                                        <div className="space-y-6">
                                          <div className="flex justify-between items-center">
                                            <h3 className="text-sm font-black text-slate-800">
                                              {report.type === 'imaging' ? '检查报告详情' : 
                                               report.type === 'pathology' ? '病理报告详情' :
                                               report.type === 'lab' ? '问卷基本信息' : '基因报告详情'}
                                            </h3>
                                          </div>

                                          {report.type === 'gene' && (
                                            <div 
                                              onClick={() => report.ocrStatus !== 'loading' && handleOcr(report.id)}
                                              className={`p-6 border-2 border-dashed rounded-2xl text-center cursor-pointer transition-all group mb-6 relative overflow-hidden ${
                                                report.ocrStatus === 'loading' 
                                                  ? 'bg-blue-50/30 border-blue-200' 
                                                  : report.ocrStatus === 'completed'
                                                  ? 'bg-emerald-50/30 border-emerald-200'
                                                  : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                                              }`}
                                            >
                                              {report.ocrStatus === 'loading' ? (
                                                <div className="flex flex-col items-center gap-3 py-2">
                                                  <div className="w-10 h-10 rounded-full border-4 border-blue-100 border-t-blue-600 animate-spin" />
                                                  <div className="space-y-1">
                                                    <p className="text-sm font-black text-blue-600">正在智能解析中...</p>
                                                    <p className="text-[10px] text-slate-400">正在提取基因变异、临床意义等关键信息</p>
                                                  </div>
                                                </div>
                                              ) : report.ocrStatus === 'completed' ? (
                                                <div className="flex flex-col items-center gap-2 py-2">
                                                  <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white shadow-lg shadow-emerald-100">
                                                    <Check size={20} />
                                                  </div>
                                                  <div className="space-y-1">
                                                    <p className="text-sm font-black text-emerald-600">解析完成</p>
                                                    <p className="text-[10px] text-slate-400">已自动填充 7 项关键信息，请核对</p>
                                                  </div>
                                                  <div className="flex gap-4">
                                                    <button className="mt-2 text-[10px] font-bold text-blue-600 hover:underline">重新上传</button>
                                                    <button 
                                                      onClick={(e) => {
                                                        e.stopPropagation();
                                                        setPreviewingReportId(report.id);
                                                      }}
                                                      className="mt-2 text-[10px] font-bold text-blue-600 hover:underline flex items-center gap-1"
                                                    >
                                                      <Eye size={12} /> 查看预览
                                                    </button>
                                                  </div>
                                                </div>
                                              ) : (
                                                <div className="flex flex-col items-center gap-2">
                                                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-slate-400 group-hover:text-blue-600 transition-colors shadow-sm">
                                                    <Upload size={20} />
                                                  </div>
                                                  <p className="text-xs text-slate-400 font-bold">点击或拖拽 Word 报告文件到此处进行智能解析</p>
                                                  <p className="text-[10px] text-slate-300">支持 .doc, .docx 格式</p>
                                                </div>
                                              )}
                                              
                                              {report.ocrStatus === 'loading' && (
                                                <motion.div 
                                                  initial={{ x: '-100%' }}
                                                  animate={{ x: '100%' }}
                                                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                                  className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-50"
                                                />
                                              )}
                                            </div>
                                          )}

                                          <div className="grid grid-cols-2 gap-6">
                                            {report.type === 'imaging' && (
                                              <>
                                                {[
                                                  { key: 'reportNo', label: '报告单号', placeholder: '请输入报告单号' },
                                                  { key: 'reportDate', label: '检查日期', type: 'date' },
                                                  { key: 'imagingProject', label: '检查项目', placeholder: '如：CT, MRI' },
                                                  { key: 'imagingPart', label: '检查部位', placeholder: '如：胸部, 腹部' },
                                                ].map((field) => (
                                                  <div key={field.key} className="space-y-1.5">
                                                    <label className="text-xs font-bold text-slate-500 ml-1">{field.label}</label>
                                                    <input 
                                                      type={field.type || 'text'}
                                                      placeholder={field.placeholder}
                                                      value={report.data[field.key] || ''}
                                                      onChange={(e) => updateReportData(report.id, field.key, e.target.value)}
                                                      className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-100 transition-all"
                                                    />
                                                  </div>
                                                ))}
                                                <div className="col-span-2 space-y-1.5">
                                                  <label className="text-xs font-bold text-slate-500 ml-1">检查结论</label>
                                                  <textarea 
                                                    placeholder="请输入检查结论"
                                                    value={report.data.imagingConclusion || ''}
                                                    onChange={(e) => updateReportData(report.id, 'imagingConclusion', e.target.value)}
                                                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-100 transition-all h-24 resize-none"
                                                  />
                                                </div>
                                                <div className="col-span-2 space-y-1.5">
                                                  <label className="text-xs font-bold text-slate-500 ml-1">检查描述</label>
                                                  <textarea 
                                                    placeholder="请输入检查描述"
                                                    value={report.data.imagingDescription || ''}
                                                    onChange={(e) => updateReportData(report.id, 'imagingDescription', e.target.value)}
                                                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-100 transition-all h-24 resize-none"
                                                  />
                                                </div>
                                              </>
                                            )}

                                            {report.type === 'pathology' && (
                                              <>
                                                {[
                                                  { key: 'reportNo', label: '报告单号', placeholder: '请输入报告单号' },
                                                  { key: 'reportDate', label: '报告日期', type: 'date' },
                                                  { key: 'specimenName', label: '标本名称', placeholder: '请输入标本名称' },
                                                  { key: 'clinicalDiagnosis', label: '临床诊断', placeholder: '请输入临床诊断' },
                                                ].map((field) => (
                                                  <div key={field.key} className="space-y-1.5">
                                                    <label className="text-xs font-bold text-slate-500 ml-1">{field.label}</label>
                                                    <input 
                                                      type={field.type || 'text'}
                                                      placeholder={field.placeholder}
                                                      value={report.data[field.key] || ''}
                                                      onChange={(e) => updateReportData(report.id, field.key, e.target.value)}
                                                      className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-100 transition-all"
                                                    />
                                                  </div>
                                                ))}
                                                <div className="col-span-2 space-y-1.5">
                                                  <label className="text-xs font-bold text-slate-500 ml-1">病理诊断</label>
                                                  <textarea 
                                                    placeholder="请输入病理诊断"
                                                    value={report.data.pathologyDiagnosis || ''}
                                                    onChange={(e) => updateReportData(report.id, 'pathologyDiagnosis', e.target.value)}
                                                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-100 transition-all h-32 resize-none"
                                                  />
                                                </div>
                                              </>
                                            )}

                                            {report.type === 'lab' && (
                                              <>
                                                {[
                                                  { key: 'name', label: '姓名', placeholder: '请输入姓名' },
                                                  { key: 'age', label: '年龄', placeholder: '请输入年龄', type: 'number' },
                                                  { key: 'phone', label: '电话', placeholder: '请输入电话', type: 'tel' },
                                                  { key: 'healthCard', label: '健康卡号', placeholder: '请输入健康卡号' },
                                                  { key: 'height', label: '身高 (cm)', placeholder: '请输入身高', type: 'number' },
                                                  { key: 'weight', label: '体重 (kg)', placeholder: '请输入体重', type: 'number' },
                                                  { key: 'waist', label: '腰围 (cm)', placeholder: '请输入腰围', type: 'number' },
                                                  { key: 'birthplace', label: '籍贯/出生地', placeholder: '请输入籍贯/出生地' },
                                                ].map((field) => (
                                                  <div key={field.key} className="space-y-1.5">
                                                    <label className="text-xs font-bold text-slate-500 ml-1">{field.label}</label>
                                                    <input 
                                                      type={field.type || 'text'}
                                                      placeholder={field.placeholder}
                                                      value={report.data[field.key] || ''}
                                                      onChange={(e) => updateReportData(report.id, field.key, e.target.value)}
                                                      className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-100 transition-all"
                                                    />
                                                  </div>
                                                ))}
                                                <div className="space-y-1.5">
                                                  <label className="text-xs font-bold text-slate-500 ml-1">性别</label>
                                                  <select 
                                                    value={report.data.gender || '男'}
                                                    onChange={(e) => updateReportData(report.id, 'gender', e.target.value)}
                                                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-100 transition-all"
                                                  >
                                                    <option>男</option>
                                                    <option>女</option>
                                                  </select>
                                                </div>
                                                <div className="space-y-1.5">
                                                  <label className="text-xs font-bold text-slate-500 ml-1">文化程度</label>
                                                  <select 
                                                    value={report.data.education || '大专/本科'}
                                                    onChange={(e) => updateReportData(report.id, 'education', e.target.value)}
                                                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-100 transition-all"
                                                  >
                                                    <option>小学及以下</option>
                                                    <option>初、高中或中专</option>
                                                    <option>大专/本科</option>
                                                    <option>硕士及以上</option>
                                                  </select>
                                                </div>
                                              </>
                                            )}

                                            {report.type === 'gene' && (
                                              <div className="col-span-2 space-y-8">
                                                {/* Top Header Row from Image */}
                                                <div className="grid grid-cols-5 gap-0 border border-slate-200 rounded-xl overflow-hidden bg-slate-50/30">
                                                  {[
                                                    { key: 'reportNo', label: '报告编号' },
                                                    { key: 'patientName', label: '姓名' },
                                                    { key: 'patientGender', label: '性别' },
                                                    { key: 'patientAge', label: '年龄' },
                                                    { key: 'healthCard', label: '健康卡号' },
                                                  ].map((field, idx) => (
                                                    <div key={field.key} className={`p-3 space-y-1 ${idx < 4 ? 'border-r border-slate-200' : ''}`}>
                                                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">{field.label}</label>
                                                      <input 
                                                        type="text"
                                                        value={report.data[field.key] || (field.key === 'patientName' ? selectedPatient?.name : field.key === 'patientGender' ? selectedPatient?.gender : field.key === 'patientAge' ? selectedPatient?.age : '')}
                                                        onChange={(e) => updateReportData(report.id, field.key, e.target.value)}
                                                        className="w-full bg-transparent text-xs font-bold text-slate-700 outline-none"
                                                        placeholder="-"
                                                      />
                                                    </div>
                                                  ))}
                                                </div>

                                                {/* Basic Info Section */}
                                                <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                                                  {[
                                                    { key: 'clinicalPhenotype', label: '送检人现临床表型', placeholder: '请输入临床表型', type: 'text' },
                                                    { key: 'testProject', label: '检测项目', placeholder: '请输入检测项目', isOcr: true, type: 'text' },
                                                    { key: 'sampleType', label: '样本类型', placeholder: '如：全血', isOcr: true, type: 'text' },
                                                    { key: 'captureReagent', label: '捕获试剂', placeholder: '请输入捕获试剂', type: 'text' },
                                                    { key: 'platform', label: '检测平台', placeholder: '请输入检测平台', type: 'text' },
                                                    { key: 'testScope', label: '检测范围', placeholder: '请输入检测范围', type: 'text' },
                                                    { key: 'sourceDataCode', label: '源数据码', placeholder: '请输入源数据码', type: 'text' },
                                                    { key: 'reportDate', label: '报告日期', type: 'date', isOcr: true },
                                                    { key: 'reportVersion', label: '报告版本', placeholder: '请输入报告版本', type: 'text' },
                                                  ].map((field) => (
                                                    <div key={field.key} className="space-y-1.5 relative">
                                                      <label className="text-xs font-bold text-slate-500 ml-1 flex items-center gap-1">
                                                        {field.label}
                                                        {field.isOcr && report.ocrStatus === 'completed' && report.data[field.key] && (
                                                          <span className="text-[8px] bg-emerald-100 text-emerald-600 px-1 rounded leading-none py-0.5">OCR</span>
                                                        )}
                                                      </label>
                                                      <input 
                                                        type={field.type}
                                                        placeholder={field.placeholder}
                                                        value={report.data[field.key] || ''}
                                                        onChange={(e) => updateReportData(report.id, field.key, e.target.value)}
                                                        className={`w-full px-4 py-3 bg-white border rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-100 transition-all ${
                                                          field.isOcr && report.ocrStatus === 'completed' && report.data[field.key]
                                                            ? 'border-emerald-200 bg-emerald-50/10 ring-1 ring-emerald-50'
                                                            : 'border-slate-200'
                                                        }`}
                                                      />
                                                    </div>
                                                  ))}
                                                </div>

                                                {/* Mutation Details Section */}
                                                <div className="pt-6 border-t border-slate-100">
                                                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider mb-6 flex items-center gap-2">
                                                    <div className="w-1 h-3 bg-blue-500 rounded-full"></div>
                                                    一、有临床意义的突变位点
                                                  </h4>
                                                  <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                                                    {[
                                                      { key: 'geneName', label: '基因名称', placeholder: '如：G6PD', isOcr: true, type: 'text' },
                                                      { key: 'mutation', label: '变异描述', placeholder: '如：c.1376G>T', isOcr: true, type: 'text' },
                                                      { key: 'dbSnp', label: 'dbSNP 数据库', placeholder: '请输入 dbSNP', type: 'text' },
                                                      { key: 'mutationRatio', label: '突变比例', placeholder: '请输入突变比例', type: 'text' },
                                                      { key: 'alfaFreq', label: '全球人群总频率 (ALFA 库)', placeholder: '请输入频率', type: 'text' },
                                                      { key: 'chineseFreq', label: '中国人群总频率 (汉族基因组库)', placeholder: '请输入频率', type: 'text' },
                                                      { key: 'vcfRef', label: 'VCF_Ref', placeholder: '请输入 VCF_Ref', type: 'text' },
                                                      { key: 'vcfAlt', label: 'VCF_Alt', placeholder: '请输入 VCF_Alt', type: 'text' },
                                                      { key: 'physicalPosition', label: '物理位点', placeholder: '请输入物理位点', type: 'text' },
                                                      { key: 'clinvarDisease', label: '本突变相关疾病 (ClinVar 库)', placeholder: '请输入相关疾病', type: 'text' },
                                                      { key: 'inheritance', label: '疾病遗传特征 (MalaCards 库)', placeholder: '请输入遗传特征', type: 'text' },
                                                    ].map((field) => (
                                                      <div key={field.key} className="space-y-1.5 relative">
                                                        <label className="text-xs font-bold text-slate-500 ml-1 flex items-center gap-1">
                                                          {field.label}
                                                          {field.isOcr && report.ocrStatus === 'completed' && report.data[field.key] && (
                                                            <span className="text-[8px] bg-emerald-100 text-emerald-600 px-1 rounded leading-none py-0.5">OCR</span>
                                                          )}
                                                        </label>
                                                        <input 
                                                          type={field.type}
                                                          placeholder={field.placeholder}
                                                          value={report.data[field.key] || ''}
                                                          onChange={(e) => updateReportData(report.id, field.key, e.target.value)}
                                                          className={`w-full px-4 py-3 bg-white border rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-100 transition-all ${
                                                            field.isOcr && report.ocrStatus === 'completed' && report.data[field.key]
                                                              ? 'border-emerald-200 bg-emerald-50/10 ring-1 ring-emerald-50'
                                                              : 'border-slate-200'
                                                          }`}
                                                        />
                                                      </div>
                                                    ))}
                                                    <div className="space-y-1.5">
                                                      <label className="text-xs font-bold text-slate-500 ml-1 flex items-center gap-1">
                                                        突变致病性 (ClinVar 库)
                                                        {report.ocrStatus === 'completed' && report.data.significance && (
                                                          <span className="text-[8px] bg-emerald-100 text-emerald-600 px-1 rounded leading-none py-0.5">OCR</span>
                                                        )}
                                                      </label>
                                                      <select 
                                                        value={report.data.significance || '致病'}
                                                        onChange={(e) => updateReportData(report.id, 'significance', e.target.value)}
                                                        className={`w-full px-4 py-3 bg-white border rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-100 transition-all ${
                                                          report.ocrStatus === 'completed' && report.data.significance
                                                            ? 'border-emerald-200 bg-emerald-50/10'
                                                            : 'border-slate-200'
                                                        }`}
                                                      >
                                                        <option>致病</option>
                                                        <option>可能致病</option>
                                                        <option>意义未明</option>
                                                        <option>可能良性</option>
                                                        <option>良性</option>
                                                      </select>
                                                    </div>
                                                  </div>
                                                </div>

                                                {/* Text Interpretations Section */}
                                                <div className="pt-6 border-t border-slate-100 space-y-6">
                                                  {[
                                                    { key: 'geneFunction', label: '基因功能解读 (GeneCards 库及相关报道整理)', placeholder: '请输入基因功能解读...' },
                                                    { key: 'acmgInterpretation', label: '突变位点解读及综合判读 (ACMG 指南)', placeholder: '请输入解读内容...' },
                                                    { key: 'recommendations', label: '相关建议', placeholder: '请输入相关建议...' },
                                                  ].map((field) => (
                                                    <div key={field.key} className="space-y-1.5">
                                                      <label className="text-xs font-bold text-slate-500 ml-1 flex items-center gap-1">
                                                        {field.label}
                                                      </label>
                                                      <textarea 
                                                        placeholder={field.placeholder}
                                                        value={report.data[field.key] || ''}
                                                        onChange={(e) => updateReportData(report.id, field.key, e.target.value)}
                                                        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-100 transition-all h-32 resize-none leading-relaxed"
                                                      />
                                                    </div>
                                                  ))}
                                                </div>
                                              </div>
                                            )}
                                          </div>
                                        </div>
                                      </div>
                                    ))}

                                    <button 
                                      onClick={addReport}
                                      className="w-full py-4 border-2 border-dashed border-slate-200 rounded-3xl text-slate-400 font-bold hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50/30 transition-all flex items-center justify-center gap-2"
                                    >
                                      <Plus size={20} />
                                      <span>添加数据</span>
                                    </button>
                                  </div>
                                )}
                              </motion.div>
                            )}

                            {addDataStep === 3 && (
                              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                                {selectedPatient && (
                                  <div className="bg-blue-50/50 border-2 border-blue-600 ring-4 ring-blue-50 p-4 rounded-2xl flex items-center gap-6">
                                    <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center">
                                      <User size={24} />
                                    </div>
                                    <div className="flex-1 grid grid-cols-3 items-center gap-4">
                                      <div>
                                        <div className="flex items-baseline gap-2">
                                          <span className="font-black text-slate-800 text-lg">{selectedPatient.name}</span>
                                          <span className="text-xs font-bold text-slate-500">
                                            {selectedPatient.gender === 'male' ? '男' : '女'} · {selectedPatient.age}岁
                                          </span>
                                        </div>
                                        <div className="text-[10px] font-bold text-slate-400 mt-0.5 font-mono">ID: {selectedPatient.id}</div>
                                      </div>
                                      
                                      <div className="space-y-0.5">
                                        <p className="text-[9px] text-slate-400 font-black uppercase tracking-wider">手机号码</p>
                                        <p className="text-xs text-slate-700 font-bold font-mono">{selectedPatient.phone}</p>
                                      </div>
                                      
                                      <div className="space-y-0.5">
                                        <p className="text-[9px] text-slate-400 font-black uppercase tracking-wider">身份证号</p>
                                        <p className="text-xs text-slate-700 font-bold font-mono">{selectedPatient.idCard}</p>
                                      </div>
                                    </div>
                                  </div>
                                )}

                                <div className="bg-amber-50 border border-amber-100 p-4 rounded-2xl flex items-start gap-3 mb-4">
                                  <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center text-amber-600 shrink-0">
                                    <AlertCircle size={18} />
                                  </div>
                                  <div>
                                    <p className="text-sm font-black text-amber-900">
                                      {patientWorkflow === 'create-patient'
                                        ? '请创建该患者的首次就诊，录入的数据将自动关联至本次就诊'
                                        : '请选择已有就诊，或新增一次就诊'}
                                    </p>
                                  </div>
                                </div>

                                {patientWorkflow === 'data-entry' && (
                                  <div className="flex justify-between items-center">
                                    <h3 className="text-sm font-black text-slate-800">选择已有就诊</h3>
                                    <button
                                      onClick={() => setShowNewEncounterForm(!showNewEncounterForm)}
                                      className="text-xs text-blue-600 font-bold hover:underline flex items-center gap-1"
                                    >
                                      <Plus size={14} /> {showNewEncounterForm ? '返回选择就诊' : '新增就诊'}
                                    </button>
                                  </div>
                                )}

                                {patientWorkflow === 'create-patient' && (
                                  <div className="flex items-center justify-between">
                                    <h3 className="text-sm font-black text-slate-800">首次就诊信息</h3>
                                    <span className="text-[11px] font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">必填</span>
                                  </div>
                                )}

                                {patientWorkflow === 'data-entry' && !showNewEncounterForm ? (
                                  <div className="space-y-3">
                                    {(() => {
                                      const encList = [];
                                      if (selectedPatient && selectedPatient.visitNo) {
                                        encList.push({
                                          id: selectedPatient.visitNo,
                                          date: '2026-03-20',
                                          hospital: '广东省人民医院',
                                          diagnosis: '原发性肝细胞癌 (HCC)',
                                          type: selectedPatient.visitType || '外院门诊',
                                          source: selectedPatient.source || '外院',
                                          isCurrentVisit: true,
                                        });
                                      }
                                      encList.push(
                                        { id: 'E1001', date: '2026-02-22', hospital: '广州市中医院', diagnosis: '肝恶性肿瘤', type: '门诊', source: '外院', isCurrentVisit: false },
                                        { id: 'E1002', date: '2026-01-15', hospital: '外院', diagnosis: '慢性肝炎', type: '住院', source: '外院', isCurrentVisit: false }
                                      );
                                      return encList.map(e => (
                                        <div 
                                          key={e.id} 
                                          onClick={() => setSelectedEncounterId(e.id)}
                                          className={`p-4 bg-slate-50/50 border rounded-2xl cursor-pointer transition-all flex justify-between items-center group relative overflow-hidden ${
                                            selectedEncounterId === e.id ? 'border-blue-600 bg-blue-50/30 ring-2 ring-blue-50' : 'border-slate-100 hover:border-blue-200 hover:bg-blue-50/30'
                                          }`}
                                        >
                                          {/* Left Accent Bar */}
                                          <div className={`absolute left-0 top-4 bottom-4 w-1 rounded-r-full ${selectedEncounterId === e.id ? 'bg-blue-600' : 'bg-slate-300'}`}></div>
                                          
                                          <div className="flex-1 pl-3 space-y-2">
                                            <div className="flex items-center gap-2 flex-wrap">
                                              <span className="text-sm font-black text-slate-800">{e.date}</span>
                                              {e.isCurrentVisit && (
                                                <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-blue-600 text-white shadow-2xs">
                                                  当次就诊（默认关联）
                                                </span>
                                              )}
                                              <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${e.source === '外院' ? 'bg-indigo-50 text-indigo-500' : 'bg-blue-50 text-blue-500'}`}>
                                                {e.source}
                                              </span>
                                              <span className="px-1.5 py-0.5 bg-green-50 text-green-500 rounded text-[10px] font-bold">
                                                {e.type}
                                              </span>
                                            </div>
                                            <div className="space-y-1">
                                              <div className="flex items-center gap-1 text-xs text-slate-400">
                                                <span className="font-bold">就诊流水号：</span>
                                                <span className="text-slate-800 font-mono font-bold">{e.id}</span>
                                              </div>
                                              <div className="flex items-center gap-1 text-xs text-slate-400">
                                                <span className="font-bold">就诊医院：</span>
                                                <span className="text-slate-600 font-bold">{e.hospital}</span>
                                              </div>
                                              <div className="flex items-center gap-1 text-xs text-slate-400">
                                                <span className="font-bold">诊断名称：</span>
                                                <span className="text-slate-600 font-bold">{e.diagnosis}</span>
                                              </div>
                                            </div>
                                          </div>
                                          
                                          {selectedEncounterId === e.id && (
                                            <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center text-white shrink-0 ml-4 shadow-xs">
                                              <Check size={12} />
                                            </div>
                                          )}
                                        </div>
                                      ));
                                    })()}
                                  </div>
                                ) : (
                                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
                                    <div className="divide-y divide-slate-50">
                                      {/* 就诊ID */}
                                      <div className="flex items-center justify-between p-4">
                                        <div className="flex items-center gap-1">
                                          <span className="text-red-500 text-sm">*</span>
                                          <span className="text-sm font-bold text-slate-600">就诊ID</span>
                                        </div>
                                        <span className="text-sm font-bold text-slate-400 font-mono">YW23829382983928</span>
                                      </div>

                                      {/* 医院名称 */}
                                      <div className="flex items-center justify-between p-4">
                                        <div className="flex items-center gap-1">
                                          <span className="text-red-500 text-sm">*</span>
                                          <span className="text-sm font-bold text-slate-600">医院名称</span>
                                        </div>
                                        <input 
                                          type="text" 
                                          placeholder="请输入医院名称" 
                                          className="text-sm font-bold text-slate-800 text-right outline-none placeholder:text-slate-300 w-1/2"
                                        />
                                      </div>

                                      {/* 就诊类型 */}
                                      <div className="flex items-center justify-between p-4">
                                        <div className="flex items-center gap-1">
                                          <span className="text-red-500 text-sm">*</span>
                                          <span className="text-sm font-bold text-slate-600">就诊类型</span>
                                        </div>
                                        <select className="text-sm font-bold text-slate-800 text-right outline-none bg-transparent cursor-pointer">
                                          <option value="外院门诊">外院门诊</option>
                                          <option value="外院住院">外院住院</option>
                                          <option value="外院急诊">外院急诊</option>
                                          <option value="本院门诊">本院门诊</option>
                                          <option value="本院住院">本院住院</option>
                                          <option value="本院急诊">本院急诊</option>
                                          <option value="第三方/外协检查">第三方/外协检查</option>
                                        </select>
                                      </div>

                                      {/* 就诊时间 */}
                                      <div className="flex items-center justify-between p-4">
                                        <div className="flex items-center gap-1">
                                          <span className="text-red-500 text-sm">*</span>
                                          <span className="text-sm font-bold text-slate-600">就诊时间</span>
                                        </div>
                                        <input 
                                          type="date" 
                                          className="text-sm font-bold text-slate-800 text-right outline-none bg-transparent cursor-pointer"
                                        />
                                      </div>

                                      {/* 就诊科室 */}
                                      <div className="flex items-center justify-between p-4">
                                        <span className="text-sm font-bold text-slate-600 pl-2">就诊科室</span>
                                        <input 
                                          type="text" 
                                          placeholder="请输入就诊科室" 
                                          className="text-sm font-bold text-slate-800 text-right outline-none placeholder:text-slate-300 w-1/2"
                                        />
                                      </div>

                                      {/* 诊断名称 */}
                                      <div className="p-4 space-y-3">
                                        <span className="text-sm font-bold text-slate-600 pl-2">诊断名称</span>
                                        <div className="bg-slate-50 rounded-xl p-4">
                                          <textarea 
                                            rows={3}
                                            placeholder="请输入诊断名称，多个诊断用逗号（,）分隔" 
                                            className="w-full bg-transparent text-sm font-bold text-slate-800 outline-none placeholder:text-slate-300 resize-none leading-relaxed"
                                          ></textarea>
                                        </div>
                                      </div>
                                    </div>

                                    <div className="p-4 bg-slate-50/50 flex justify-end gap-3">
                                      {patientWorkflow === 'data-entry' && (
                                        <button onClick={() => setShowNewEncounterForm(false)} className="px-6 py-2 text-xs font-bold text-slate-500 hover:bg-slate-200 rounded-lg transition-colors">取消新增</button>
                                      )}
                                      <button 
                                        onClick={() => {
                                          alert('就诊信息已保存并关联');
                                          setShowNewEncounterForm(false);
                                          setSelectedEncounterId('new-encounter');
                                        }}
                                        className="px-6 py-2 bg-blue-600 text-white text-xs font-bold rounded-lg shadow-md hover:bg-blue-700 transition-colors"
                                      >
                                        {patientWorkflow === 'create-patient' ? '保存首次就诊' : '保存并关联'}
                                      </button>
                                    </div>
                                  </motion.div>
                                )}
                              </motion.div>
                            )}
                          </div>
                        </div>

                        {/* Step Footer */}
                        <div className="p-6 border-t border-slate-100 bg-slate-50/30 flex justify-between items-center">
                          <button 
                            onClick={() => setAddDataStep(prev => Math.max(1, prev - 1))}
                            disabled={addDataStep === 1}
                            className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all ${
                              addDataStep === 1 ? 'text-slate-300 cursor-not-allowed' : 'text-slate-600 hover:bg-slate-200'
                            }`}
                          >
                            上一步
                          </button>
                          <div className="flex gap-3">
                            <button 
                              onClick={() => {
                                setPatientSubView('list');
                                setAddDataStep(1);
                                setSelectedEncounterId(null);
                              }}
                              className="px-6 py-2.5 text-xs font-bold text-slate-500 hover:bg-slate-200 rounded-xl transition-colors"
                            >
                              取消
                            </button>
                            {patientWorkflow === 'create-patient' && addDataStep === 1 ? (
                              <>
                                <button
                                  onClick={() => saveNewPatient(false)}
                                  className="px-5 py-2.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 font-bold text-xs rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
                                >
                                  <Save size={15} />
                                  <span>仅保存患者档案</span>
                                </button>
                                <button
                                  onClick={() => saveNewPatient(true)}
                                  className="px-8 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-lg shadow-blue-100 transition-colors flex items-center gap-1.5"
                                >
                                  <ArrowRight size={15} />
                                  <span>保存并下一步</span>
                                </button>
                              </>
                            ) : addDataStep < 3 ? (
                              <button 
                                onClick={() => {
                                  if (addDataStep === 2) {
                                    // Removed analysis interaction
                                    setNeedsEncounter(true);
                                    if (patientWorkflow === 'create-patient') setShowNewEncounterForm(true);
                                    setAddDataStep(3);
                                  } else {
                                    setAddDataStep(prev => prev + 1);
                                  }
                                }}
                                disabled={isAnalyzing}
                                className={`px-10 py-2.5 bg-blue-600 text-white font-bold text-xs rounded-xl shadow-lg shadow-blue-100 hover:bg-blue-700 transition-colors ${isAnalyzing ? 'opacity-40 cursor-not-allowed' : ''}`}
                              >
                                {isAnalyzing ? '正在分析...' : '下一步'}
                              </button>
                            ) : (
                              <button 
                                onClick={() => {
                                  alert('数据已提交，正在进入清洗流程');
                                  setPatientSubView('list');
                                  setAddDataStep(1);
                                  setReports([{ id: '1', type: 'lab' }]);
                                  setSelectedEncounterId(null);
                                }}
                                disabled={!selectedEncounterId}
                                className={`px-10 py-2.5 bg-blue-600 text-white font-bold text-xs rounded-xl shadow-lg shadow-blue-100 transition-colors ${
                                  selectedEncounterId ? 'hover:bg-blue-700' : 'opacity-40 cursor-not-allowed'
                                }`}
                              >
                                {selectedEncounterId ? '提交数据' : '请先保存就诊'}
                              </button>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {patientSubView === 'detail' && (() => {
                      const detailVisits = PATIENTS.filter(p => (p.patientNo || p.id) === selectedDetailPatientNo);
                      const primaryPatient = detailVisits[0] || PATIENTS[0];
                      const activeVisit = detailVisits.find(v => (v.visitNo || v.id) === selectedDetailVisitId) || detailVisits[0] || PATIENTS[0];

                      return (
                        <motion.div
                          key="patient-detail"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-full shrink-0 text-slate-700"
                        >
                          {/* 顶栏: 符合截图样式的完整 Header */}
                          <div className="bg-white px-5 py-3.5 border-b border-slate-200 flex flex-wrap justify-between items-center gap-4">
                            <div className="flex items-center gap-3">
                              <button
                                onClick={() => setPatientSubView('list')}
                                className="flex items-center gap-1.5 text-slate-600 hover:text-slate-900 transition-colors font-bold text-sm cursor-pointer"
                              >
                                <ArrowLeft size={18} /> 就诊详情
                              </button>

                              <div className="h-4 w-px bg-slate-200 mx-1" />

                              {/* 绿色标签 & 就诊流水号 */}
                              <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                                {activeVisit.visitType || '外院门诊'}
                              </span>
                              <span className="text-sm font-black text-slate-800 font-mono">
                                就诊流水号: {activeVisit.visitNo || activeVisit.id || 'IMP202603260001'}
                              </span>

                              {/* 患者属性 Inline 列表 */}
                              <div className="hidden xl:flex items-center gap-4 text-xs text-slate-500 font-medium ml-2">
                                <span>姓名: <strong className="text-slate-800">{primaryPatient.name}</strong></span>
                                <span>性别: <strong className="text-slate-800">{primaryPatient.gender === '-' ? '女' : primaryPatient.gender}</strong></span>
                                <span>就诊年龄: <strong className="text-slate-800">{primaryPatient.age || 51}岁</strong></span>
                                <span>就诊科室: <strong className="text-slate-800">{activeVisit.dept || '外院_肝肠科'}</strong></span>
                                <span>就诊日期: <strong className="text-slate-800 font-mono">{activeVisit.visitDate || '2026-03-26 00:00:00'}</strong></span>
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              <div
                                aria-disabled="true"
                                title="功能暂未开放"
                                className="px-3.5 py-1.5 bg-white border border-slate-200 text-slate-700 text-xs font-bold rounded-lg shadow-2xs cursor-default select-none"
                              >
                                患者全息视图
                              </div>
                            </div>
                          </div>

                          {/* 下方 3 栏主体区域 (左侧树、中间网格属性、右侧就诊记录切换 Drawer) */}
                          <div className="flex-1 overflow-hidden flex bg-slate-50/40">
                            
                            {/* 左栏 (220px): 左侧导航树 */}
                            <div className="w-56 bg-white border-r border-slate-200 p-3.5 flex flex-col gap-3 shrink-0">
                              <div className="relative">
                                <Search size={14} className="absolute left-3 top-2.5 text-slate-400" />
                                <input
                                  type="text"
                                  placeholder="请输入关键字进行检索"
                                  className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-blue-500 transition-colors"
                                />
                              </div>

                              <div className="space-y-1 text-xs font-medium">
                                <div className="text-slate-700 font-bold flex items-center gap-1.5 px-2 py-1.5">
                                  <ChevronRight size={14} className="rotate-90 text-slate-400" /> 患者信息
                                </div>
                                <div className="pl-6 space-y-1">
                                  <button
                                    onClick={() => setDetailTab('basic')}
                                    className={`w-full text-left px-3 py-1.5 rounded-lg flex items-center gap-2 font-bold cursor-pointer transition-colors ${
                                      detailTab === 'basic' ? 'bg-blue-50 text-blue-600 border border-blue-100' : 'text-slate-600 hover:bg-slate-50'
                                    }`}
                                  >
                                    <FileText size={13} /> 基本信息
                                  </button>
                                </div>

                                <div
                                  onClick={() => setDetailTab('visit')}
                                  className={`text-slate-700 font-bold flex items-center gap-1.5 px-2 py-1.5 cursor-pointer rounded-lg hover:bg-slate-50 ${detailTab === 'visit' ? 'text-blue-600 bg-blue-50/60' : ''}`}
                                >
                                  <ChevronRight size={14} className="text-slate-400" /> 就诊信息
                                </div>

                                <div
                                  onClick={() => setDetailTab('unclassified')}
                                  className={`text-slate-700 font-bold flex items-center gap-1.5 px-2 py-1.5 cursor-pointer rounded-lg hover:bg-slate-50 ${detailTab === 'unclassified' ? 'text-blue-600 bg-blue-50/60' : ''}`}
                                >
                                  <ChevronRight size={14} className="text-slate-400" /> 未分类
                                </div>
                              </div>
                            </div>

                            {/* 中间栏: 详细数据展示网格 */}
                            <div className="flex-1 bg-white p-5 overflow-y-auto flex flex-col justify-between">
                              <div className="space-y-4">
                                {/* 标题与检索过滤 */}
                                <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                                  <h3 className="text-sm font-black text-slate-800 flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-blue-600 inline-block" />
                                    {detailTab === 'basic' ? '基本信息' : detailTab === 'visit' ? '就诊诊断与病例明细' : '未分类字段'}
                                  </h3>

                                  <div className="flex items-center gap-2">
                                    <input
                                      type="text"
                                      placeholder="过滤检索..."
                                      className="px-3 py-1 text-xs border border-slate-200 rounded-lg outline-none focus:border-blue-500"
                                    />
                                    <button className="px-3 py-1 bg-blue-600 text-white rounded-lg text-xs font-bold hover:bg-blue-700 transition-colors cursor-pointer">
                                      搜索
                                    </button>
                                    <button className="px-3 py-1 bg-white border border-slate-200 text-slate-600 rounded-lg text-xs font-bold hover:bg-slate-50 transition-colors cursor-pointer">
                                      重置
                                    </button>
                                  </div>
                                </div>

                                {detailTab === 'basic' ? (
                                  /* 标准网格表单 (与截图完美对齐) */
                                  <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
                                    <table className="w-full border-collapse">
                                      <tbody className="divide-y divide-slate-200">
                                        <tr className="divide-x divide-slate-200">
                                          <td className="bg-slate-50 font-bold text-slate-600 p-2.5 w-28 text-right">患者id</td>
                                          <td className="p-2.5 font-mono font-medium text-slate-800">{primaryPatient.patientNo || 'P000949'}</td>
                                          <td className="bg-slate-50 font-bold text-slate-600 p-2.5 w-28 text-right">姓名</td>
                                          <td className="p-2.5 font-bold text-slate-800">{primaryPatient.name}</td>
                                          <td className="bg-slate-50 font-bold text-slate-600 p-2.5 w-28 text-right">别名</td>
                                          <td className="p-2.5 text-slate-400">-</td>
                                        </tr>
                                        <tr className="divide-x divide-slate-200">
                                          <td className="bg-slate-50 font-bold text-slate-600 p-2.5 text-right">性别</td>
                                          <td className="p-2.5 font-medium">{primaryPatient.gender === '-' ? '女' : primaryPatient.gender}</td>
                                          <td className="bg-slate-50 font-bold text-slate-600 p-2.5 text-right">出生日期</td>
                                          <td className="p-2.5 font-mono">1975-02-08 00:00:00</td>
                                          <td className="bg-slate-50 font-bold text-slate-600 p-2.5 text-right">婚姻状态</td>
                                          <td className="p-2.5 font-medium">已婚</td>
                                        </tr>
                                        <tr className="divide-x divide-slate-200">
                                          <td className="bg-slate-50 font-bold text-slate-600 p-2.5 text-right">Rh血型</td>
                                          <td className="p-2.5 font-medium">阴性</td>
                                          <td className="bg-slate-50 font-bold text-slate-600 p-2.5 text-right">残疾码</td>
                                          <td className="p-2.5 text-slate-400">-</td>
                                          <td className="bg-slate-50 font-bold text-slate-600 p-2.5 text-right">残疾名称</td>
                                          <td className="p-2.5 text-slate-400">-</td>
                                        </tr>
                                        <tr className="divide-x divide-slate-200">
                                          <td className="bg-slate-50 font-bold text-slate-600 p-2.5 text-right">国籍</td>
                                          <td className="p-2.5 font-medium">中国</td>
                                          <td className="bg-slate-50 font-bold text-slate-600 p-2.5 text-right">手机号</td>
                                          <td className="p-2.5 font-mono">{primaryPatient.phone || '151***9550'}</td>
                                          <td className="bg-slate-50 font-bold text-slate-600 p-2.5 text-right">居民健康卡号</td>
                                          <td className="p-2.5 font-mono">BJ681975234</td>
                                        </tr>
                                        <tr className="divide-x divide-slate-200">
                                          <td className="bg-slate-50 font-bold text-slate-600 p-2.5 text-right">现居住地址</td>
                                          <td className="p-2.5 font-medium" colSpan={3}>上海市嘉定区幸福街道220号</td>
                                          <td className="bg-slate-50 font-bold text-slate-600 p-2.5 text-right">学历 / 职业</td>
                                          <td className="p-2.5 font-medium">本科 / 工人</td>
                                        </tr>
                                        <tr className="divide-x divide-slate-200">
                                          <td className="bg-slate-50 font-bold text-slate-600 p-2.5 text-right">工作单位</td>
                                          <td className="p-2.5 font-medium">南昌服务公司</td>
                                          <td className="bg-slate-50 font-bold text-slate-600 p-2.5 text-right">单位电话</td>
                                          <td className="p-2.5 font-mono">1771916174</td>
                                          <td className="bg-slate-50 font-bold text-slate-600 p-2.5 text-right">单位地址</td>
                                          <td className="p-2.5 font-medium">兰州顺义区五道口301号</td>
                                        </tr>
                                        <tr className="divide-x divide-slate-200">
                                          <td className="bg-slate-50 font-bold text-slate-600 p-2.5 text-right">联系人姓名</td>
                                          <td className="p-2.5 font-medium">*** (同事)</td>
                                          <td className="bg-slate-50 font-bold text-slate-600 p-2.5 text-right">联系人电话</td>
                                          <td className="p-2.5 font-mono">1860757292</td>
                                          <td className="bg-slate-50 font-bold text-slate-600 p-2.5 text-right">家庭地址(县)</td>
                                          <td className="p-2.5 font-medium">杨浦区</td>
                                        </tr>
                                        <tr className="divide-x divide-slate-200">
                                          <td className="bg-slate-50 font-bold text-slate-600 p-2.5 text-right">户籍地址</td>
                                          <td className="p-2.5 font-medium" colSpan={3}>上海市杨浦区中山路368号</td>
                                          <td className="bg-slate-50 font-bold text-slate-600 p-2.5 text-right">户籍邮编</td>
                                          <td className="p-2.5 font-mono">201538</td>
                                        </tr>
                                        <tr className="divide-x divide-slate-200">
                                          <td className="bg-slate-50 font-bold text-slate-600 p-2.5 text-right">出生地</td>
                                          <td className="p-2.5 font-medium">上海市浦东新区青浦区</td>
                                          <td className="bg-slate-50 font-bold text-slate-600 p-2.5 text-right">医院名称 / 院区</td>
                                          <td className="p-2.5 font-medium" colSpan={3}>第一附属医院 (东院区)</td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                ) : (
                                  /* 就诊信息展示 */
                                  <div className="p-5 border border-slate-200 rounded-xl space-y-3 text-xs bg-slate-50/50">
                                    <div className="flex justify-between items-center">
                                      <span className="font-bold text-slate-700">本次就诊流水号: {activeVisit.visitNo || activeVisit.id}</span>
                                      <span className="px-2.5 py-0.5 bg-blue-100 text-blue-800 rounded font-bold">{activeVisit.visitType || '外院门诊'}</span>
                                    </div>
                                    <p className="text-slate-600">主要诊断: 原发性肝细胞癌 (HCC)</p>
                                    <p className="text-slate-600">关联检验: 甲胎蛋白 (AFP) 420.5 ng/mL ↑</p>
                                  </div>
                                )}
                              </div>

                              {/* 底部分页指示栏 */}
                              <div className="flex justify-between items-center text-xs text-slate-500 pt-4 border-t border-slate-100 mt-4">
                                <span>共 1 页，1 条记录</span>
                                <div className="flex items-center gap-2">
                                  <span>每页 100 条</span>
                                  <div className="flex items-center gap-1">
                                    <button className="px-2 py-0.5 border border-slate-200 rounded text-slate-400 hover:bg-slate-50">&lt;</button>
                                    <button className="px-2.5 py-0.5 bg-blue-600 text-white rounded font-bold">1</button>
                                    <button className="px-2 py-0.5 border border-slate-200 rounded text-slate-400 hover:bg-slate-50">&gt;</button>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* 右栏 (300px): "就诊记录" 切换 Drawer (对应截图右侧) */}
                            {showVisitDrawer && (
                              <div className="w-80 bg-white border-l border-slate-200 p-4 flex flex-col gap-3 shrink-0 overflow-y-auto">
                                <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                                  <h4 className="text-sm font-black text-slate-800 flex items-center gap-1.5">
                                    就诊记录
                                  </h4>
                                  <button
                                    onClick={() => setShowVisitDrawer(false)}
                                    className="p-1 hover:bg-slate-100 rounded text-slate-400 hover:text-slate-600 transition-colors"
                                  >
                                    <X size={16} />
                                  </button>
                                </div>

                                {/* 蓝底提醒 Alert */}
                                <div className="p-2.5 bg-blue-50 border border-blue-200 rounded-lg text-[11px] text-blue-700 flex items-start gap-1.5">
                                  <AlertCircle size={14} className="shrink-0 mt-0.5" />
                                  <span>仅展示当前患者符合本次检索条件的就诊记录</span>
                                </div>

                                {/* 就诊卡片列表 */}
                                <div className="space-y-3 mt-1">
                                  {detailVisits.map((v, index) => {
                                    const isSelected = (v.visitNo || v.id) === (activeVisit.visitNo || activeVisit.id);
                                    return (
                                      <div
                                        key={v.id}
                                        onClick={() => setSelectedDetailVisitId(v.visitNo || v.id)}
                                        className={`p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
                                          isSelected
                                            ? 'border-blue-600 bg-blue-50/30 ring-1 ring-blue-100 shadow-2xs'
                                            : 'border-slate-200 hover:border-slate-300 bg-white'
                                        }`}
                                      >
                                        <div className="flex justify-between items-center mb-2">
                                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                                            {v.visitType || '外院门诊'}
                                          </span>
                                          <span className="text-[11px] text-slate-400 font-mono">
                                            {v.visitDate || '2026-03-26 00:00:00'}
                                          </span>
                                        </div>

                                        <p className="text-xs font-bold text-slate-800 mb-1">
                                          {v.dept || '外院_肝肠科'} / {v.visitNo || v.id}
                                        </p>

                                        <div className="text-[11px] text-slate-500">
                                          <span>诊断: </span>
                                          <span className="text-slate-700 font-medium">原发性肝细胞癌</span>
                                        </div>

                                        {index === 0 && (
                                          <div className="mt-2 pt-1.5 border-t border-slate-100 flex justify-between items-center text-[10px]">
                                            <span className="text-purple-700 bg-purple-50 px-2 py-0.5 rounded font-bold border border-purple-100">
                                              最近就诊记录
                                            </span>
                                            {isSelected && <span className="text-blue-600 font-bold">当前预览</span>}
                                          </div>
                                        )}
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            )}

                          </div>
                        </motion.div>
                      );
                    })()}
                  </>
                )}

                {activeTab === 'datasets' && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-1 h-full overflow-hidden"
                  >
                    {/* Left Sidebar */}
                    <div className="w-[280px] bg-white border-r flex flex-col flex-shrink-0">
                      <div className="p-4">
                        <div className="relative">
                          <SearchIcon size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                          <input 
                            type="text" 
                            placeholder="请输入关键字进行检索" 
                            className="w-full bg-[#f8faff] border border-slate-100 rounded-lg pl-9 pr-8 py-2 text-xs outline-none focus:border-blue-500 transition-all font-medium"
                          />
                          <button className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                             <SearchIcon size={14} />
                          </button>
                        </div>
                      </div>

                      <div className="flex-1 overflow-y-auto overflow-x-hidden pt-2">
                        <div className="px-4 mb-4">
                          <h3 className="text-sm font-bold text-slate-800">专病域</h3>
                        </div>
                        
                        <div className="text-[13px]">
                          {/* Tree Items */}
                          <div className="px-4 py-2">
                            <div className="flex items-center gap-2 text-slate-600 mb-2 cursor-pointer hover:text-blue-600">
                              <ChevronDown size={14} className="text-slate-400" />
                              <span className="font-bold">人口信息</span>
                            </div>
                            <div className="ml-5 space-y-1">
                              <div className="bg-[#f0f4ff] text-blue-600 px-3 py-2 rounded-lg font-bold flex items-center gap-2">
                                <FileText size={14} />
                                <span>基本信息</span>
                              </div>
                            </div>
                          </div>

                          {[
                            { label: '诊断', active: false },
                            { label: '就诊', active: false },
                            { label: '检验', active: false },
                            { label: '检查', active: false },
                            { label: '治疗', active: false },
                            { label: '症状+病史', active: false },
                            { label: '文书', active: false },
                          ].map((item, idx) => (
                            <div key={idx} className="px-4 py-2 cursor-pointer hover:bg-slate-50 transition-colors">
                              <div className="flex items-center gap-2 text-slate-600">
                                <ChevronRight size={14} className="text-slate-400" />
                                <span className="font-bold">{item.label}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="flex-1 flex flex-col bg-[#f5f8ff] overflow-hidden">
                      {/* Sub Header */}
                      <div className="h-14 bg-white border-b px-6 flex items-center justify-between flex-shrink-0">
                        <div className="flex items-center gap-1 bg-[#f5f8ff] p-1 rounded-lg">
                          <button className="px-4 py-1.5 rounded-md text-xs font-black bg-blue-600 text-white shadow-sm">数据概览</button>
                          <button className="px-4 py-1.5 rounded-md text-xs font-bold text-slate-500 hover:bg-white transition-all">数据明细</button>
                        </div>
                        <div className="flex items-center gap-8">
                          <button 
                            onClick={handleManualUpdate}
                            disabled={isUpdatingData}
                            className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                              isUpdatingData 
                                ? 'bg-slate-50 text-slate-400 border-slate-100 cursor-not-allowed' 
                                : 'bg-blue-50 text-blue-600 border-blue-100 hover:bg-blue-100 shadow-sm'
                            }`}
                            title="同步并刷新当前数据集统计数据"
                          >
                            <RotateCw size={14} className={isUpdatingData ? 'animate-spin' : ''} />
                            {isUpdatingData ? '正在同步数据...' : '手动更新'}
                          </button>
                          <div className="flex items-center gap-6 text-xs text-slate-400 font-bold">
                            <span>最后更新时间：<span className="text-slate-800">{lastUpdateAttempt}</span></span>
                            <span>患者数：<span className="text-slate-800">219</span></span>
                            <span>病历数：<span className="text-slate-800">{isUpdatingData ? '...' : '0'}</span></span>
                            <span>指标数：<span className="text-slate-800">23</span></span>
                          </div>
                        </div>
                      </div>

                      {/* Content Section */}
                      <div className="flex-1 p-6 overflow-hidden flex gap-6">
                        <div className="flex-1 bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden flex flex-col">
                          <div className="flex-1 overflow-x-auto overflow-y-auto dataset-scroll">
                            <table className="w-full text-left border-collapse min-w-[1000px]">
                              <thead className="sticky top-0 z-10">
                                <tr className="bg-white text-slate-800 text-[13px] font-black border-b">
                                  <th className="px-4 py-4 w-16">序号</th>
                                  <th className="px-4 py-4">变量名称</th>
                                  <th className="px-4 py-4">变量定义</th>
                                  <th className="px-4 py-4">指标类型</th>
                                  <th className="px-4 py-4">加工方式</th>
                                  <th className="px-4 py-4">参考标准</th>
                                  <th className="px-4 py-4">填充率</th>
                                  <th className="px-4 py-4">有值患者数</th>
                                </tr>
                              </thead>
                              <tbody className="text-[13px] text-slate-600">
                                {METRICS.map((m, i) => (
                                  <tr key={i} className="hover:bg-slate-50/50 border-b border-slate-50 transition-all">
                                    <td className="px-4 py-3.5 text-slate-400 font-medium">{i + 1}</td>
                                    <td className="px-4 py-3.5 font-bold text-slate-800">{m.name}</td>
                                    <td className="px-4 py-3.5 text-slate-500">{m.definition}</td>
                                    <td 
                                      className={`px-4 py-3.5 ${['连续', '二分', '分类型', '有序'].includes(m.type) ? 'text-blue-600 cursor-pointer hover:underline underline-offset-4' : 'text-slate-800'}`}
                                      onClick={() => {
                                        if (['连续', '二分', '分类型', '有序'].includes(m.type)) setSelectedMetricForViz({ name: m.name, type: m.type });
                                      }}
                                    >
                                      {m.type}
                                    </td>
                                    <td className="px-4 py-3.5 text-slate-800">{m.processing}</td>
                                    <td className="px-4 py-3.5 text-slate-500">{m.reference}</td>
                                    <td className="px-4 py-3.5 min-w-[240px]">
                                      <div className="flex items-center gap-4">
                                        <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden shadow-inner flex items-center">
                                          <motion.div 
                                            initial={{ width: 0 }}
                                            animate={{ width: `${m.rate}%` }}
                                            className="h-2 bg-blue-500 rounded-full"
                                          />
                                        </div>
                                        <span className="text-[11px] font-black text-blue-600 w-12 text-right">{m.rate.toFixed(2)}%</span>
                                      </div>
                                    </td>
                                    <td className="px-4 py-3.5 text-slate-800 font-bold">{m.hasValuePatientCount || '-'}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                          
                          {/* Pagination Area */}
                          <div className="px-6 py-4 border-t flex items-center justify-end gap-6 bg-white flex-shrink-0">
                            <div className="flex items-center gap-2 text-xs text-slate-400 font-bold">
                              <span>共 1 页，23 条</span>
                              <div className="flex items-center gap-1 ml-4 border rounded-md px-2 py-1 bg-white text-slate-600">
                                <span>每页</span>
                                <span className="font-black text-slate-800 flex items-center gap-1">50 <ChevronDown size={12} /></span>
                                <span>条</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-1">
                              <button className="w-8 h-8 rounded-md border border-slate-100 flex items-center justify-center text-slate-300 hover:bg-slate-50">
                                <ChevronLeft size={16} />
                              </button>
                              <button className="w-8 h-8 rounded-md bg-blue-600 text-white flex items-center justify-center text-xs font-black shadow-sm">1</button>
                              <button className="w-8 h-8 rounded-md border border-slate-100 flex items-center justify-center text-slate-300 hover:bg-slate-50">
                                <ChevronRight size={16} />
                              </button>
                            </div>
                          </div>
                        </div>

                        <AnimatePresence>
                          {selectedMetricForViz && (
                            <MetricVisualization 
                              metricName={selectedMetricForViz.name}
                              metricType={selectedMetricForViz.type}
                              onClose={() => setSelectedMetricForViz(null)}
                            />
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}

          {activePage === 'project' && (
            <motion.div 
              key="project"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col bg-[#f5f8ff]"
            >
              <header className="h-16 bg-white border-b px-8 flex items-center justify-between shadow-sm flex-shrink-0 z-20">
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-black text-slate-800">项目管理</h2>
                </div>
              </header>

              <div className="flex-1 overflow-y-auto p-8">
                <div className="max-w-6xl mx-auto space-y-8">
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 bg-indigo-600 text-white rounded-2xl flex items-center justify-center shadow-xl shadow-indigo-100">
                      <FolderOpen size={28} />
                    </div>
                    <div>
                      <h2 className="text-2xl font-black text-slate-800 tracking-tight">急性胆囊炎科研项目</h2>
                      <p className="text-xs text-slate-400 mt-1 font-medium">项目编号：PROJ-2024-001 | 创建时间：2024-01-15</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-8">
                    <div className="col-span-2 space-y-6">
                      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8">
                        <div className="flex items-center gap-6 mb-8">
                          <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center">
                            <Shield size={32} />
                          </div>
                          <div>
                            <h3 className="text-xl font-black text-slate-800">项目安全概览</h3>
                            <p className="text-xs text-slate-400 mt-1">当前项目已启用多重身份校验与数据加密传输</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-indigo-600 shadow-sm mb-4">
                              <Lock size={20} />
                            </div>
                            <p className="font-bold text-slate-800 mb-1">数据加密</p>
                            <p className="text-xs text-slate-400 leading-relaxed">所有患者录入的数据均采用 AES-256 标准进行端到端加密，确保隐私安全。</p>
                          </div>
                          <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-indigo-600 shadow-sm mb-4">
                              <User size={20} />
                            </div>
                            <p className="font-bold text-slate-800 mb-1">身份核验</p>
                            <p className="text-xs text-slate-400 leading-relaxed">系统自动对接公安部接口，对患者提交的身份信息进行实时比对核验。</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6">
                        <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                          <Shield size={18} className="text-indigo-500" />
                          安全策略
                        </h3>
                        <div className="space-y-4">
                          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                            <p className="text-xs font-bold text-slate-700 mb-1">身份验证方式</p>
                            <p className="text-[10px] text-slate-400 leading-relaxed">当前项目统一采用“姓名+手机号+身份证后4位”进行多重校验，确保数据归属准确。</p>
                          </div>
                          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                            <p className="text-xs font-bold text-slate-700 mb-1">数据审核流程</p>
                            <p className="text-[10px] text-slate-400 leading-relaxed">患者自助录入的数据将进入“待审核”状态，需管理员确认后方可正式入库。</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Add To Project Modal */}
      <AnimatePresence>
        {isAddToProjectModalOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
              onClick={() => setIsAddToProjectModalOpen(false)}
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              className="relative bg-white rounded-lg shadow-xl w-full max-w-5xl h-[85vh] flex flex-col overflow-hidden"
            >
              {/* Header */}
              <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between shrink-0">
                <h3 className="text-base font-bold text-slate-800">加入项目</h3>
                <button 
                  onClick={() => setIsAddToProjectModalOpen(false)}
                  className="p-1 hover:bg-slate-100 rounded-md text-slate-400 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Body */}
              <div className="p-6 flex-1 overflow-y-auto bg-slate-50/30 flex flex-col gap-4">
                
                {/* Banner */}
                {isAddToProjectBannerVisible && (
                  <div className="bg-[#f0f7ff] border border-blue-100 rounded-md px-4 py-2.5 flex items-center justify-between">
                    <span className="text-xs text-slate-600">仅支持加入未锁定的项目。加入后，可在课题空间内进行随访、数据清洗、统计分析等操作</span>
                    <button onClick={() => setIsAddToProjectBannerVisible(false)} className="text-slate-400 hover:text-slate-600 p-0.5">
                      <X size={14} />
                    </button>
                  </div>
                )}

                {/* Search & Actions */}
                <div className="flex justify-between items-center mt-2">
                  <div className="relative w-96">
                      <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input 
                        type="text" 
                        placeholder="请输入项目名称、负责人、研究类型等关键词"
                        className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded text-xs text-slate-700 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder:text-slate-300"
                        value={addToProjectSearchQuery}
                        onChange={(e) => setAddToProjectSearchQuery(e.target.value)}
                      />
                  </div>
                  <button className="flex items-center gap-1.5 bg-blue-600 px-4 py-2 rounded text-white text-xs font-medium hover:bg-blue-700 transition-colors shadow-sm">
                    <Plus size={14} /> 新增项目
                  </button>
                </div>

                {/* Project List */}
                <div className="grid grid-cols-2 gap-4 mt-2">
                  {/* Card 1 */}
                  <div 
                    className={`relative bg-white rounded-md border ${selectedProjectsForAdd.includes('1') ? 'border-blue-400 shadow-[0_0_0_1px_rgba(59,130,246,0.5)]' : 'border-slate-200'} p-5 cursor-pointer overflow-hidden group hover:border-blue-300 transition-all`}
                    onClick={() => {
                        setSelectedProjectsForAdd(prev => 
                            prev.includes('1') ? prev.filter(id => id !== '1') : [...prev, '1']
                        );
                    }}
                  >
                     {/* Background deco */}
                     <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-50">
                        <div className="absolute -top-10 -left-10 w-64 h-64 bg-gradient-to-br from-[#ebf5ff] to-transparent rounded-full blur-3xl"></div>
                     </div>
                     <div className="relative flex justify-between items-start mb-6">
                        <div className="flex gap-2 items-center">
                            <span className="bg-[#a8ccf0] text-white text-[10px] px-1.5 py-0.5 rounded font-medium shadow-sm">回顾性</span>
                            <span className="text-sm font-black text-slate-800">测试</span>
                        </div>
                        <div className={`w-[14px] h-[14px] rounded-[2px] border flex items-center justify-center transition-colors ${selectedProjectsForAdd.includes('1') ? 'bg-blue-600 border-blue-600' : 'border-slate-300 bg-white'}`}>
                           {selectedProjectsForAdd.includes('1') && <Check size={10} className="text-white" strokeWidth={3} />}
                        </div>
                     </div>
                     <div className="flex gap-12 mt-6 relative z-10 px-2 justify-start items-center">
                        <div className="flex gap-3 items-center w-32">
                           <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-[#8e9bae]">
                             <Users size={15} />
                           </div>
                           <div className="flex flex-col">
                              <span className="text-[11px] text-slate-500 mb-0.5">患者数</span>
                              <div className="flex items-center gap-1">
                                <span className="font-bold text-slate-800 text-sm leading-none">3</span>
                                <span className="text-[10px] text-orange-500 font-medium leading-none flex items-center"><span className="text-orange-500 scale-75 mr-0.5">▲</span>0</span>
                              </div>
                           </div>
                        </div>

                        <div className="flex gap-3 items-center">
                           <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-[#8e9bae]">
                             <FileText size={15} />
                           </div>
                           <div className="flex flex-col">
                              <span className="text-[11px] text-slate-500 mb-0.5">病历数</span>
                              <div className="flex items-center gap-1">
                                <span className="font-bold text-slate-800 text-sm leading-none">3</span>
                                <span className="text-[10px] text-orange-500 font-medium leading-none flex items-center"><span className="text-orange-500 scale-75 mr-0.5">▲</span>0</span>
                              </div>
                           </div>
                        </div>
                     </div>
                     
                     <div className="mt-8 text-right text-[11px] text-slate-500 relative z-10">
                        负责人：洪驹发
                     </div>
                  </div>

                  {/* Card 2 */}
                  <div 
                    className={`relative bg-white rounded-md border ${selectedProjectsForAdd.includes('2') ? 'border-blue-400 shadow-[0_0_0_1px_rgba(59,130,246,0.5)]' : 'border-slate-200'} p-5 cursor-pointer overflow-hidden group hover:border-blue-300 transition-all`}
                    onClick={() => {
                        setSelectedProjectsForAdd(prev => 
                            prev.includes('2') ? prev.filter(id => id !== '2') : [...prev, '2']
                        );
                    }}
                  >
                     {/* Background deco */}
                     <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-50">
                        <div className="absolute -top-10 -left-10 w-64 h-64 bg-gradient-to-br from-[#ebf5ff] to-transparent rounded-full blur-3xl"></div>
                     </div>
                     <div className="relative flex justify-between items-start mb-6">
                        <div className="flex gap-2 items-center">
                            <span className="bg-[#a8ccf0] text-white text-[10px] px-1.5 py-0.5 rounded font-medium shadow-sm shrink-0">回顾性</span>
                            <span className="text-sm font-black text-slate-800 truncate w-[300px]">基于多源数据融合的慢性乙型肝炎进展至肝...</span>
                        </div>
                        <div className={`w-[14px] h-[14px] rounded-[2px] border flex items-center justify-center transition-colors shrink-0 ${selectedProjectsForAdd.includes('2') ? 'bg-blue-600 border-blue-600' : 'border-slate-300 bg-white'}`}>
                           {selectedProjectsForAdd.includes('2') && <Check size={10} className="text-white" strokeWidth={3} />}
                        </div>
                     </div>
                     <div className="flex gap-12 mt-6 relative z-10 px-2 justify-start items-center">
                        <div className="flex gap-3 items-center w-32">
                           <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-[#8e9bae]">
                             <Users size={15} />
                           </div>
                           <div className="flex flex-col">
                              <span className="text-[11px] text-slate-500 mb-0.5">患者数</span>
                              <div className="flex items-center gap-1">
                                <span className="font-bold text-slate-800 text-sm leading-none">0</span>
                                <span className="text-[10px] text-orange-500 font-medium leading-none flex items-center"><span className="text-orange-500 scale-75 mr-0.5">▲</span>0</span>
                              </div>
                           </div>
                        </div>

                        <div className="flex gap-3 items-center">
                           <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-[#8e9bae]">
                             <FileText size={15} />
                           </div>
                           <div className="flex flex-col">
                              <span className="text-[11px] text-slate-500 mb-0.5">病历数</span>
                              <div className="flex items-center gap-1">
                                <span className="font-bold text-slate-800 text-sm leading-none">0</span>
                                <span className="text-[10px] text-orange-500 font-medium leading-none flex items-center"><span className="text-orange-500 scale-75 mr-0.5">▲</span>0</span>
                              </div>
                           </div>
                        </div>
                     </div>
                     
                     <div className="mt-8 text-right text-[11px] text-slate-500 relative z-10">
                        负责人：科研演示01
                     </div>
                  </div>

                 </div>

                {/* Randomization Config */}
                {selectedProjectsForAdd.length > 0 && (
                  <div className="mt-4 bg-white border border-slate-200 rounded-md p-5 flex flex-col gap-4 shadow-sm shrink-0">
                     <div className="flex items-center gap-2">
                       <Shield size={16} className="text-blue-600" />
                       <h4 className="text-sm font-bold text-slate-800">入组与随机分组策略</h4>
                     </div>
                     <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                        {/* Admission Method */}
                        <div>
                          <label className="block text-xs font-bold text-slate-600 mb-2">入组方式</label>
                          <div className="flex gap-2">
                            <button 
                              onClick={() => setAdmissionConfig({...admissionConfig, method: 'all'})}
                              className={`flex-1 py-1.5 px-3 text-xs rounded border text-center transition-colors ${admissionConfig.method === 'all' ? 'bg-blue-50 border-blue-600 text-blue-700 font-bold' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                            >全量入组</button>
                            <button 
                               onClick={() => setAdmissionConfig({...admissionConfig, method: 'random'})}
                               className={`flex-1 py-1.5 px-3 text-xs rounded border text-center transition-colors ${admissionConfig.method === 'random' ? 'bg-blue-50 border-blue-600 text-blue-700 font-bold' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                            >随机抽样</button>
                          </div>
                        </div>

                        {/* Random Methods (if random) */}
                        {admissionConfig.method === 'random' ? (
                          <div>
                              <label className="block text-xs font-bold text-slate-600 mb-2">入组样本量 (预估患者数: 112人)</label>
                              <div className="relative">
                                  <input 
                                    type="number"
                                    className="w-full pl-3 pr-8 py-1.5 border border-slate-200 rounded text-xs focus:outline-none focus:border-blue-500"
                                    value={admissionConfig.sampleSize}
                                    onChange={(e) => setAdmissionConfig({...admissionConfig, sampleSize: parseInt(e.target.value) || 0})}
                                  />
                                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400">人</span>
                              </div>
                          </div>
                        ) : <div></div>}

                        {/* RCT Grouping Option */}
                        <div className="col-span-2 border-t border-slate-100 pt-4 mt-2">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex flex-col">
                                    <h5 className="text-xs font-bold text-slate-800 mb-0.5">开展试验分组 (RCT)</h5>
                                    <p className="text-[10px] text-slate-500">将入组患者随机分配到干预组或对照组，适用于开展随机对照试验</p>
                                </div>
                                <div 
                                    className={`w-9 h-5 rounded-full p-0.5 cursor-pointer shadow-inner transition-colors ${admissionConfig.enableGrouping ? 'bg-blue-600' : 'bg-slate-200'}`}
                                    onClick={() => setAdmissionConfig({...admissionConfig, enableGrouping: !admissionConfig.enableGrouping})}
                                >
                                    <div className={`w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform ${admissionConfig.enableGrouping ? 'translate-x-4' : 'translate-x-0'}`}></div>
                                </div>
                            </div>

                            {/* Grouping specifics */}
                            <AnimatePresence>
                                {admissionConfig.enableGrouping && (
                                   <motion.div 
                                      initial={{ opacity: 0, height: 0 }}
                                      animate={{ opacity: 1, height: 'auto' }}
                                      exit={{ opacity: 0, height: 0 }}
                                      className="bg-slate-50 border border-slate-200 rounded p-4 space-y-4 overflow-hidden"
                                   >
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-xs font-bold text-slate-600 mb-2">随机化方法</label>
                                                <div className="flex gap-2">
                                                    <select 
                                                        className="w-full px-3 py-1.5 border border-slate-200 bg-white rounded text-xs focus:outline-none focus:border-blue-500"
                                                        value={admissionConfig.randomType}
                                                        onChange={(e) => setAdmissionConfig({...admissionConfig, randomType: e.target.value})}
                                                    >
                                                        <option value="simple">简单随机</option>
                                                        <option value="block">区组随机 (Block Randomization)</option>
                                                        <option value="stratified">分层随机 (Stratified Randomization)</option>
                                                    </select>
                                                </div>
                                            </div>

                                            {admissionConfig.randomType === 'block' && (
                                              <div>
                                                  <label className="block text-xs font-bold text-slate-600 mb-2">区组大小 (Block Size)</label>
                                                  <input 
                                                    type="number" 
                                                    className="w-full px-3 py-1.5 border border-slate-200 rounded text-xs focus:outline-none focus:border-blue-500"
                                                    value={admissionConfig.blockSize}
                                                    onChange={(e) => setAdmissionConfig({...admissionConfig, blockSize: parseInt(e.target.value) || 0})}
                                                  />
                                              </div>
                                            )}

                                            {admissionConfig.randomType === 'stratified' && (
                                              <div>
                                                  <label className="block text-xs font-bold text-slate-600 mb-2">分层因素</label>
                                                  <select 
                                                    className="w-full px-3 py-1.5 border border-slate-200 bg-white rounded text-xs focus:outline-none focus:border-blue-500"
                                                    value={admissionConfig.stratifyBy}
                                                    onChange={(e) => setAdmissionConfig({...admissionConfig, stratifyBy: e.target.value})}
                                                  >
                                                      <option value="性别">性别</option>
                                                      <option value="年龄段">年龄段</option>
                                                      <option value="病情严重程度">病情严重程度</option>
                                                  </select>
                                              </div>
                                            )}

                                            {/* Dummy div to align grid if simple randomization */}
                                            {admissionConfig.randomType === 'simple' && <div></div>}
                                        </div>

                                        <div className="grid grid-cols-3 gap-4">
                                            <div>
                                                <label className="block text-xs font-bold text-slate-600 mb-2">分组比例</label>
                                                <input 
                                                    type="text" 
                                                    className="w-full px-3 py-1.5 border border-slate-200 rounded text-xs focus:outline-none focus:border-blue-500"
                                                    value={admissionConfig.ratio}
                                                    onChange={(e) => setAdmissionConfig({...admissionConfig, ratio: e.target.value})}
                                                    placeholder="例如: 1:1"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-slate-600 mb-2">A组名称</label>
                                                <input 
                                                    type="text" 
                                                    className="w-full px-3 py-1.5 border border-slate-200 rounded text-xs focus:outline-none focus:border-blue-500"
                                                    value={admissionConfig.groupA}
                                                    onChange={(e) => setAdmissionConfig({...admissionConfig, groupA: e.target.value})}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-slate-600 mb-2">B组名称</label>
                                                <input 
                                                    type="text" 
                                                    className="w-full px-3 py-1.5 border border-slate-200 rounded text-xs focus:outline-none focus:border-blue-500"
                                                    value={admissionConfig.groupB}
                                                    onChange={(e) => setAdmissionConfig({...admissionConfig, groupB: e.target.value})}
                                                />
                                            </div>
                                        </div>
                                   </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                     </div>
                  </div>
                )}

              </div>

              {/* Footer */}
              <div className="px-6 py-4 border-t border-slate-100 bg-white flex justify-end gap-3 rounded-b-lg shrink-0">
                <button 
                  onClick={() => setIsAddToProjectModalOpen(false)}
                  className="px-6 py-2 bg-white border border-slate-200 rounded text-xs font-black text-slate-600 hover:bg-slate-50 transition-colors"
                >
                  取消
                </button>
                <button 
                  onClick={() => setIsAddToProjectModalOpen(false)}
                  className="px-6 py-2 bg-blue-600 border border-blue-600 rounded text-xs font-black text-white hover:bg-blue-700 transition-colors shadow-sm"
                >
                  加入项目
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Form Delete Confirmation Modal */}
      <AnimatePresence>
        {formToDelete && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setFormToDelete(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden p-8"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mb-6">
                  <Trash2 size={32} />
                </div>
                <h3 className="text-xl font-black text-slate-800 mb-2">确认删除表单？</h3>
                <p className="text-sm text-slate-500 mb-8">
                  您确定要删除表单 <span className="font-bold text-slate-700">"{formToDelete.name}"</span> 吗？此操作不可恢复。
                </p>
                <div className="flex gap-4 w-full">
                  <button
                    onClick={() => setFormToDelete(null)}
                    className="flex-1 py-3 bg-slate-100 text-slate-600 font-bold rounded-xl hover:bg-slate-200 transition-colors"
                  >
                    取消
                  </button>
                  <button
                    onClick={() => {
                      setProjectForms(projectForms.filter(f => f.id !== formToDelete.id));
                      setFormToDelete(null);
                    }}
                    className="flex-1 py-3 bg-red-500 text-white font-bold rounded-xl hover:bg-red-600 transition-colors shadow-lg shadow-red-100"
                  >
                    确认删除
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Form Configuration Modal */}
      <AnimatePresence>
        {isFormConfigModalOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFormConfigModalOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl bg-white rounded-[32px] shadow-2xl overflow-hidden"
            >
              <div className="p-8 pb-4 flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-black text-slate-800 mb-1">表单配置</h3>
                  <p className="text-sm text-slate-400 font-bold">配置该科研所使用的 CRF 表单及患者录入权限</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <button 
                      onClick={() => {
                        setIsAddFormDropdownOpen(!isAddFormDropdownOpen);
                        if (!isAddFormDropdownOpen) setAddFormSearchQuery('');
                      }}
                      className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-xl text-sm font-black hover:bg-indigo-100 transition-colors"
                    >
                      <Plus size={18} />
                      添加表单
                    </button>
                    
                    {isAddFormDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden z-50">
                        <div className="p-3 border-b border-slate-50 bg-slate-50/50 space-y-2">
                          <p className="text-xs font-bold text-slate-500">选择要添加的表单</p>
                          <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                            <input 
                              type="text"
                              placeholder="搜索表单..."
                              value={addFormSearchQuery}
                              onChange={(e) => setAddFormSearchQuery(e.target.value)}
                              className="w-full pl-8 pr-3 py-1.5 bg-white border border-slate-100 rounded-lg text-xs outline-none focus:border-indigo-300 transition-all"
                            />
                          </div>
                        </div>
                        <div className="max-h-64 overflow-y-auto p-2">
                          {[{ id: 'unmounted', name: '未分类 (不挂载)' }, ...folders].map(folder => {
                            const availableInFolder = availableFormsToAdd.filter(f => 
                              f.folderId === folder.id && 
                              !projectForms.some(pf => pf.id === f.id) &&
                              (addFormSearchQuery === '' || f.name.toLowerCase().includes(addFormSearchQuery.toLowerCase()))
                            );
                            if (availableInFolder.length === 0) return null;
                            return (
                              <div key={folder.id} className="mb-2 last:mb-0">
                                <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">{folder.name}</div>
                                {availableInFolder.map(form => (
                                  <button
                                    key={form.id}
                                    onClick={() => {
                                      setProjectForms([...projectForms, {
                                        ...form,
                                        permission: '本库',
                                        configurator: '当前用户',
                                        configTime: new Date().toISOString().split('T')[0] + ' ' + new Date().toTimeString().substring(0, 5),
                                        enabled: true,
                                        verifyLevel: 'medium',
                                        qrValue: window.location.origin + '?mode=patient&form=' + form.id,
                                        usage: ['data-center'],
                                        expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
                                      }]);
                                      setIsAddFormDropdownOpen(false);
                                      setAddFormSearchQuery('');
                                    }}
                                    className="w-full text-left px-3 py-2 text-sm font-bold text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-xl transition-colors"
                                  >
                                    {form.name}
                                  </button>
                                ))}
                              </div>
                            );
                          })}
                          {availableFormsToAdd.filter(f => 
                            !projectForms.some(pf => pf.id === f.id) &&
                            (addFormSearchQuery === '' || f.name.toLowerCase().includes(addFormSearchQuery.toLowerCase()))
                          ).length === 0 && (
                            <div className="p-4 text-center text-sm text-slate-400">没有匹配的表单</div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                  <button 
                    onClick={() => setIsFormConfigModalOpen(false)}
                    className="p-2 hover:bg-slate-100 rounded-full text-slate-400 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>
              
              <div className="px-8 py-4">
                <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
                  {/* Table Header */}
                  <div className="grid grid-cols-[1fr_120px_140px_80px] gap-4 px-8 py-4 border-b border-slate-100 bg-slate-50/50">
                    <div className="text-[11px] font-black text-slate-400 uppercase tracking-wider">表单名称</div>
                    <div className="text-[11px] font-black text-slate-400 uppercase tracking-wider text-center">患者自助录入</div>
                    <div className="text-[11px] font-black text-slate-400 uppercase tracking-wider text-center">设置失效时间</div>
                    <div className="text-[11px] font-black text-slate-400 uppercase tracking-wider text-right">操作</div>
                  </div>

                  {/* Table Body */}
                  <div className="max-h-[50vh] overflow-auto">
                    {[{ id: 'unmounted', name: '未分类 (不挂载)' }, ...folders].map(folder => {
                      const formsInFolder = projectForms.filter(f => f.folderId === folder.id);
                      if (formsInFolder.length === 0) return null;
                      return (
                        <div key={folder.id}>
                          <div className="px-8 py-2 bg-slate-50 text-xs font-bold text-slate-500 border-b border-slate-100 flex items-center gap-2">
                            <Folder size={14} />
                            {folder.name}
                          </div>
                          {formsInFolder.map(form => (
                            <div 
                              key={form.id}
                              className="grid grid-cols-[1fr_120px_140px_80px] gap-4 px-8 py-5 items-center hover:bg-slate-50/30 transition-colors group border-b border-slate-50 last:border-0"
                            >
                              <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-indigo-50 text-indigo-500 rounded-xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                                  <FileText size={18} />
                                </div>
                                <span className="text-sm font-bold text-slate-700 tracking-tight">{form.name}</span>
                              </div>

                              <div className="flex justify-center">
                                <button
                                  onClick={() => {
                                    const updatedForms = projectForms.map(f => {
                                      if (f.id === form.id) {
                                        const usage = f.usage || [];
                                        const newUsage = usage.includes('data-center')
                                          ? usage.filter(u => u !== 'data-center')
                                          : [...usage, 'data-center'];
                                        return { ...f, usage: newUsage };
                                      }
                                      return f;
                                    });
                                    setProjectForms(updatedForms);
                                  }}
                                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-all focus:outline-none shadow-inner ${
                                    form.usage?.includes('data-center') ? 'bg-indigo-600' : 'bg-slate-200'
                                  }`}
                                >
                                  <span
                                    className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-md transition-transform ${
                                      form.usage?.includes('data-center') ? 'translate-x-6' : 'translate-x-1'
                                    }`}
                                  />
                                </button>
                              </div>

                              <div className="flex justify-center">
                                <input 
                                  type="date"
                                  disabled={!form.usage?.includes('data-center')}
                                  value={form.expiryDate || ''}
                                  onChange={(e) => {
                                    const val = e.target.value;
                                    setProjectForms(projectForms.map(f => f.id === form.id ? { ...f, expiryDate: val } : f));
                                  }}
                                  className={`w-32 px-2 py-1 text-xs font-bold text-center border rounded-lg outline-none transition-all ${
                                    form.usage?.includes('data-center') 
                                      ? 'bg-white border-slate-200 text-slate-700 focus:border-indigo-300' 
                                      : 'bg-slate-50 border-slate-100 text-slate-300'
                                  }`}
                                />
                              </div>

                              <div className="flex justify-end">
                                <button 
                                  onClick={() => {
                                    setProjectForms(projectForms.filter(f => f.id !== form.id));
                                  }}
                                  className="text-xs font-black text-rose-500 hover:text-rose-600 transition-colors px-3 py-1 hover:bg-rose-50 rounded-lg"
                                >
                                  移除
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              
              <div className="p-8 pt-4 flex justify-end">
                <button 
                  onClick={() => setIsFormConfigModalOpen(false)}
                  className="px-10 py-3 bg-blue-600 text-white font-black text-sm rounded-2xl shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all active:scale-95"
                >
                  完成配置
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* QR Code Modal */}
      <AnimatePresence>
        {isQrModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsQrModalOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white rounded-[40px] shadow-2xl w-full max-w-5xl overflow-hidden flex min-h-[650px]"
            >
              {/* Left: Form Selection */}
              <div className="w-80 border-r border-slate-100 bg-slate-50/50 p-8 flex flex-col">
                <div className="mb-8">
                  <h3 className="text-xl font-black text-slate-800">患者自助录入</h3>
                  <p className="text-xs text-slate-400 font-bold mt-1">选择表单生成录入入口</p>
                </div>
                
                <div className="space-y-3 flex-1 overflow-y-auto pr-2 custom-scrollbar">
                  {projectForms.filter(f => f.enabled).map(form => (
                    <div key={form.id} className="group relative">
                      <button
                        onClick={() => setSelectedFormForQr(form)}
                        className={`w-full p-4 rounded-2xl text-left transition-all border flex items-center justify-between ${
                          selectedFormForQr?.id === form.id 
                            ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-100' 
                            : 'bg-white border-slate-100 text-slate-600 hover:border-blue-200'
                        }`}
                      >
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-sm truncate">{form.name}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${form.enabled ? 'bg-emerald-400' : 'bg-slate-300'}`} />
                        </div>
                      </button>
                    </div>
                  ))}
                </div>

                <button 
                  onClick={() => setIsQrModalOpen(false)}
                  className="mt-6 w-full py-3 bg-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-300 transition-all text-sm"
                >
                  关闭窗口
                </button>
              </div>

              {/* Right: QR Code Display */}
              <div className="flex-1 p-10 flex flex-col bg-white relative overflow-y-auto custom-scrollbar">
                {selectedFormForQr ? (
                  <motion.div 
                    key={selectedFormForQr.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="space-y-8 w-full max-w-2xl mx-auto"
                  >
                    <div className="flex items-center gap-6 pb-6 border-b border-slate-50">
                      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 transition-colors ${
                        selectedFormForQr.enabled ? 'bg-blue-50 text-blue-600' : 'bg-slate-50 text-slate-300'
                      }`}>
                        <QrCode size={32} />
                      </div>
                      <div>
                        <h3 className="text-2xl font-black text-slate-800">{selectedFormForQr.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                            selectedFormForQr.enabled ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-400'
                          }`}>
                            {selectedFormForQr.enabled ? '已启用自助录入' : '已禁用'}
                          </span>
                          <span className="text-[10px] text-slate-400 font-bold">ID: {selectedFormForQr.id}</span>
                        </div>
                      </div>
                    </div>

                    {selectedFormForQr.enabled && (
                      <div className="grid grid-cols-2 gap-8">
                        {/* QR Section */}
                        <div className="space-y-4">
                          <div className="bg-slate-50 p-6 rounded-[32px] border border-slate-100 shadow-inner flex items-center justify-center">
                            <QRCodeCanvas 
                              value={selectedFormForQr.qrValue} 
                              size={180}
                              level="H"
                              includeMargin={false}
                            />
                          </div>
                          <button className="w-full py-4 bg-slate-100 text-slate-600 font-bold rounded-2xl hover:bg-slate-200 transition-all flex items-center justify-center gap-2">
                            <Download size={18} /> 下载二维码
                          </button>
                        </div>

                        {/* Link Section */}
                        <div className="space-y-4 flex flex-col justify-between">
                          <div className="space-y-4">
                            <div className="p-5 bg-slate-50 rounded-[32px] border border-slate-100 relative group">
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-2">生成的链接地址</p>
                              <div className="bg-white p-3 rounded-xl border border-slate-100 text-xs font-bold text-slate-500 break-all line-clamp-4 min-h-[100px]">
                                {selectedFormForQr.qrValue}
                              </div>
                              
                              <button 
                                onClick={() => handleCopy(selectedFormForQr.qrValue)}
                                className={`absolute top-4 right-4 p-2 rounded-lg transition-all ${
                                  isCopied ? 'bg-emerald-500 text-white' : 'bg-white shadow-sm text-slate-400 hover:text-blue-600'
                                }`}
                                title="复制链接"
                              >
                                {isCopied ? <Check size={16} /> : <Copy size={16} />}
                              </button>
                              
                              {isCopied && (
                                <motion.div 
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  className="absolute -top-4 right-4 bg-slate-800 text-white text-[10px] font-bold px-2 py-1 rounded shadow-lg"
                                >
                                  已复制
                                </motion.div>
                              )}
                            </div>

                            <button 
                              onClick={() => handleCopy(selectedFormForQr.qrValue)}
                              className={`w-full py-4 font-bold rounded-2xl transition-all flex items-center justify-center gap-2 ${
                                isCopied ? 'bg-emerald-500 text-white' : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                              }`}
                            >
                              {isCopied ? <Check size={18} /> : <Copy size={18} />}
                              {isCopied ? '已复制' : '复制链接'}
                            </button>
                          </div>

                          <button 
                            onClick={() => {
                              setIsQrModalOpen(false);
                              setIsPatientMode(true);
                              if (selectedFormForQr) {
                                setPatientTargetFormId(selectedFormForQr.id);
                              }
                            }}
                            className="w-full py-4 bg-blue-600 text-white font-black rounded-2xl shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all mt-auto"
                          >
                            模拟扫码打开 (演示用)
                          </button>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ) : (
                  <div className="text-center space-y-4 m-auto">
                    <div className="w-24 h-24 bg-slate-50 text-slate-200 rounded-full flex items-center justify-center mx-auto">
                      <QrCode size={48} />
                    </div>
                    <div className="space-y-1">
                      <p className="text-slate-800 font-black text-lg">请选择业务场景</p>
                      <p className="text-slate-400 font-bold text-sm">
                        {projectForms.some(f => f.enabled) ? '在左侧列表中选择一个已启用的表单' : '暂无开启自助录入的表单'}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Outcome Modal / Mobile Workflow */}
      <AnimatePresence>
        {isOutcomeModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm sm:p-4">
            <motion.div 
              initial={{ opacity: 0, y: "100%" }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: "100%" }}
              className="absolute bottom-0 w-full sm:w-[375px] h-[85vh] sm:h-[750px] bg-white shadow-2xl flex flex-col sm:relative overflow-hidden border border-slate-200"
            >
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-slate-200 rounded-full sm:hidden z-50"></div>

              {outcomeStep === 'list' && (
                <div className="flex flex-col h-full bg-white">
                  <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50/50">
                    <div>
                      <h3 className="text-lg font-bold text-gray-800">患者列表</h3>
                      <p className="text-xs text-gray-500 mt-1">选择一名患者设置随访结局</p>
                    </div>
                    <button onClick={() => setIsOutcomeModalOpen(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                      <X size={18} />
                    </button>
                  </div>
                  
                  <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] p-6 space-y-3">
                    <div className="relative mb-4">
                      <SearchIcon size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input type="text" placeholder="搜索患者姓名、编号 / 拼音首字母" className="w-full border border-gray-300 rounded-none pl-9 pr-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all" />
                    </div>

                    <div className="space-y-2">
                      {PATIENTS.map(p => (
                        <button 
                          key={p.id}
                          onClick={() => {
                            setOutcomePatient(p);
                            setOutcomeStep('setup');
                          }}
                          className="w-full bg-white px-4 py-3 border border-gray-200 flex items-center justify-between text-left hover:border-blue-400 hover:bg-blue-50/30 transition-all rounded-none group"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-50 text-blue-600 flex justify-center items-center font-bold text-base rounded-none">
                              {p.name.charAt(0)}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-gray-800 text-sm group-hover:text-blue-700 transition-colors">{p.name}</span>
                                <span className="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded-none">{p.gender} {p.age}岁</span>
                              </div>
                              <div className="flex items-center mt-1 text-gray-500 text-xs font-mono">
                                {p.id}
                              </div>
                            </div>
                          </div>
                          <ChevronRight size={16} className="text-gray-300 group-hover:text-blue-400" />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {outcomeStep === 'setup' && outcomePatient && (
                <div className="flex flex-col h-full bg-white">
                  <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50/50">
                    <button 
                      onClick={() => setOutcomeStep('list')}
                      className="text-gray-500 hover:text-blue-600 transition-colors flex items-center gap-1 text-sm font-medium"
                    >
                      <ArrowLeft size={16} /> 返回
                    </button>
                    <div className="flex-1 px-4 text-center">
                      <h3 className="text-lg font-bold text-gray-800">设置随访结局</h3>
                    </div>
                    <div className="w-12 shrink-0" /> {/* Spacer for centering */}
                  </div>
                  
                  <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] p-6 space-y-6 bg-slate-50/50">
                    <div className="bg-white p-4 border border-gray-200 flex items-center gap-4 shadow-sm rounded-none border-l-4 border-l-blue-500">
                      <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-none flex justify-center items-center shrink-0">
                        <Flag size={20} />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[11px] font-medium text-gray-500 mb-0.5">当前选择患者</span>
                        <span className="text-sm font-bold text-gray-800">{outcomePatient.name} <span className="font-mono text-gray-500 text-xs ml-2 font-normal">{outcomePatient.id}</span></span>
                      </div>
                    </div>

                    <div className="bg-white p-5 border border-gray-200 rounded-none shadow-sm space-y-6">
                      <div>
                        <label className="text-xs font-bold text-gray-700 block mb-2">结局类型 <span className="text-red-500">*</span></label>
                        <div className="grid grid-cols-2 gap-3">
                          {['计划完成', '失访', '死亡', '撤回同意', '不良事件退出', '其他'].map((reason, idx) => (
                            <div 
                              key={reason} 
                              className="relative"
                            >
                              <input type="radio" name="outcomeType" id={`radio-${idx}`} className="peer sr-only" defaultChecked={idx === 1} />
                              <label 
                                htmlFor={`radio-${idx}`}
                                className="block p-3 border border-gray-200 rounded-none text-sm text-gray-600 peer-checked:border-blue-500 peer-checked:bg-blue-50/50 peer-checked:text-blue-700 transition-all text-center cursor-pointer hover:border-blue-200"
                              >
                                {reason}
                              </label>
                              <div className="absolute top-0 right-0 hidden peer-checked:block text-blue-500">
                                <div className="w-0 h-0 border-t-[20px] border-l-[20px] border-t-blue-500 border-l-transparent absolute top-0 right-0"></div>
                                <Check size={10} strokeWidth={4} className="text-white absolute top-[2px] right-[1px]" />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="text-xs font-bold text-gray-700 block mb-2">发生日期 <span className="text-red-500">*</span></label>
                        <input 
                          type="date"
                          defaultValue={new Date().toISOString().split('T')[0]}
                          className="w-full bg-white border border-gray-300 rounded-none px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-gray-700 transition-all"
                        />
                      </div>
                      
                      <div>
                        <label className="text-xs font-bold text-gray-700 block mb-2">备注说明 (选填)</label>
                        <textarea 
                          rows={3} 
                          className="w-full border border-gray-300 rounded-none px-3 py-2 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm bg-white text-gray-700 resize-none transition-all"
                          placeholder="请输入退出研究的详细描述或补充信息..."
                        />
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-white border-t border-gray-200 flex gap-3 shrink-0 sm:pb-4 pb-8">
                    <button 
                      onClick={() => {
                        setOutcomeStep('list');
                        setOutcomePatient(null);
                      }}
                      className="flex-1 py-3 border border-gray-300 text-gray-600 font-bold rounded-none text-sm hover:bg-gray-50 transition-all"
                    >
                      取消
                    </button>
                    <button 
                      onClick={() => {
                        setIsOutcomeModalOpen(false);
                        setOutcomeStep('list');
                        setOutcomePatient(null);
                      }}
                      className="flex-1 py-3 bg-blue-600 text-white font-bold rounded-none text-sm hover:bg-blue-700 transition-all shadow-sm"
                    >
                      保存
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Word Preview Modal */}
      <AnimatePresence>
        {previewingReportId && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={() => setPreviewingReportId(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="relative bg-white w-full max-w-4xl h-[85vh] rounded-[40px] shadow-2xl overflow-hidden flex flex-col"
            >
              <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white sticky top-0 z-10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                    <FileText size={24} />
                  </div>
                  <div>
                    <h3 className="font-black text-slate-800">报告原文预览</h3>
                    <p className="text-xs text-slate-400 font-bold">
                      {reports.find(r => r.id === previewingReportId)?.fileName}
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => setPreviewingReportId(null)}
                  className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-slate-100 transition-all"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="flex-1 overflow-auto p-12 bg-slate-50/50">
                <div className="max-w-3xl mx-auto bg-white shadow-2xl shadow-slate-200/50 rounded-sm p-16 min-h-full font-serif text-slate-800 leading-relaxed">
                  <div className="text-center mb-12">
                    <h1 className="text-2xl font-bold mb-2">全外显子组测序检测报告</h1>
                    <div className="h-1 w-24 bg-blue-600 mx-auto rounded-full" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-y-4 text-sm mb-12 border-b border-slate-100 pb-8">
                    <div className="flex gap-4"><span className="text-slate-400 font-bold w-20">姓名：</span><span>张三</span></div>
                    <div className="flex gap-4"><span className="text-slate-400 font-bold w-20">性别：</span><span>男</span></div>
                    <div className="flex gap-4"><span className="text-slate-400 font-bold w-20">年龄：</span><span>45岁</span></div>
                    <div className="flex gap-4"><span className="text-slate-400 font-bold w-20">样本类型：</span><span>外周血</span></div>
                    <div className="flex gap-4"><span className="text-slate-400 font-bold w-20">报告单号：</span><span>GENE-2026-001</span></div>
                    <div className="flex gap-4"><span className="text-slate-400 font-bold w-20">报告日期：</span><span>2026-03-25</span></div>
                  </div>
                  
                  <div className="space-y-8">
                    <section>
                      <h2 className="text-lg font-bold text-blue-600 mb-4 flex items-center gap-2">
                        <div className="w-1.5 h-5 bg-blue-600 rounded-full" />
                        检测结果摘要
                      </h2>
                      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="text-slate-400 border-b border-slate-200">
                              <th className="py-3 text-left">基因名称</th>
                              <th className="py-3 text-left">变异描述</th>
                              <th className="py-3 text-left">临床意义</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="py-4 font-bold">EGFR</td>
                              <td className="py-4">c.2573T&gt;G (p.L858R)</td>
                              <td className="py-4 text-rose-500 font-bold">致病 (Pathogenic)</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </section>
                    
                    <section>
                      <h2 className="text-lg font-bold text-blue-600 mb-4 flex items-center gap-2">
                        <div className="w-1.5 h-5 bg-blue-600 rounded-full" />
                        临床意义解析
                      </h2>
                      <p className="text-sm text-slate-600 indent-8">
                        EGFR基因第21号外显子L858R突变是肺腺癌中最常见的驱动突变之一。该突变导致EGFR激酶结构域持续激活，进而促进肿瘤细胞的增殖和存活。临床研究表明，携带该突变的患者对第一代、第二代及第三代EGFR-TKI类药物（如吉非替尼、厄洛替尼、阿法替尼、奥希替尼等）具有较好的敏感性。
                      </p>
                    </section>
                    
                    <section>
                      <h2 className="text-lg font-bold text-blue-600 mb-4 flex items-center gap-2">
                        <div className="w-1.5 h-5 bg-blue-600 rounded-full" />
                        检测方法说明
                      </h2>
                      <p className="text-sm text-slate-600 indent-8">
                        本检测采用全外显子组测序（WES）技术，通过对受检者样本的基因组DNA进行文库构建、目标区域捕获及高通量测序，分析约2万个基因的外显子区域及其侧翼序列。测序深度平均不低于100X，覆盖度不低于99%。
                      </p>
                    </section>
                  </div>
                  
                  <div className="mt-20 pt-8 border-t border-slate-100 flex justify-between items-end text-xs text-slate-400 italic">
                    <div>
                      <p>检测机构：XX医学检验实验室</p>
                      <p>审核人：李医生</p>
                    </div>
                    <p>报告生成时间：2026-03-25 14:30:22</p>
                  </div>
                </div>
              </div>
              
              <div className="p-6 border-t border-slate-100 bg-white flex justify-end gap-3">
                <button 
                  onClick={() => setPreviewingReportId(null)}
                  className="px-8 py-3 bg-slate-100 text-slate-600 font-bold rounded-2xl hover:bg-slate-200 transition-all"
                >
                  关闭预览
                </button>
                <button 
                  onClick={() => setPreviewingReportId(null)}
                  className="px-8 py-3 bg-blue-600 text-white font-black rounded-2xl shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all"
                >
                  确认并返回
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
              {/* Subscription Settings Modal */}
              <AnimatePresence>
                {showSubscriptionSettings && selectedProjectForSubscription && (
                  <div className="fixed inset-0 z-[150] flex items-center justify-end">
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onClick={() => setShowSubscriptionSettings(false)}
                      className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px]"
                    />
                    <motion.div 
                      initial={{ x: '100%' }}
                      animate={{ x: 0 }}
                      exit={{ x: '100%' }}
                      transition={{ type: 'spring', damping: 30, stiffness: 300, mass: 0.8 }}
                      className="relative w-full max-w-[850px] h-full bg-white shadow-2xl flex flex-col"
                    >
                      {/* Modal Header */}
                      <div className="px-6 py-4 border-b flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <h2 className="text-lg font-bold text-slate-800">订阅设置</h2>
                        </div>
                        <button 
                          onClick={() => setShowSubscriptionSettings(false)}
                          className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-slate-600"
                        >
                          <X size={20} />
                        </button>
                      </div>

                      {/* Modal Content */}
                      <div className="flex-1 overflow-y-auto">
                        <div className="p-6">
                          {/* Patient Favorite Dropdown Selection */}
                          <div className="flex items-center gap-3 mb-6 bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80">
                            <label className="text-sm font-bold text-slate-700 whitespace-nowrap flex items-center gap-2">
                              <Bookmark size={16} className="text-blue-600" />
                              <span>患者收藏名称:</span>
                            </label>
                            <div className="relative flex-1">
                              <select 
                                value={selectedProjectForSubscription?.id || FAVORITE_PROJECTS[0]?.id}
                                onChange={(e) => {
                                  const found = FAVORITE_PROJECTS.find(p => p.id === e.target.value);
                                  if (found) setSelectedProjectForSubscription(found);
                                }}
                                className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2 text-sm font-black text-slate-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all appearance-none cursor-pointer pr-10 shadow-xs"
                              >
                                {FAVORITE_PROJECTS.map((proj) => (
                                  <option key={proj.id} value={proj.id}>
                                    {proj.title} ({proj.patientCount}位患者)
                                  </option>
                                ))}
                              </select>
                              <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
                            </div>
                          </div>
                          
                          {/* Config Bar */}
                          <div className="flex flex-wrap items-center gap-y-4 gap-x-8 mb-8 pb-6 border-b border-slate-100">
                            <div className="flex items-center gap-2">
                              <span className="text-[13px] text-slate-500">订阅状态:</span>
                              <div 
                                className="relative inline-flex items-center cursor-pointer"
                                onClick={() => {}}
                              >
                                <div className="w-10 h-5 bg-blue-600 rounded-full transition-colors relative">
                                  <div className="absolute top-0.5 right-0.5 w-4 h-4 bg-white rounded-full shadow-sm" />
                                </div>
                                <span className="ml-2 text-[13px] font-medium text-blue-600">开</span>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <span className="text-[13px] text-slate-500">起止时间:</span>
                              <div className="flex items-center gap-2 border border-slate-200 rounded px-3 py-1.5 bg-white shadow-sm min-w-[240px]">
                                <Calendar size={14} className="text-slate-400" />
                                <span className="text-[13px] text-slate-700">2025-11-11</span>
                                <span className="text-slate-300">至</span>
                                <span className="text-[13px] text-slate-700">2025-11-30</span>
                                <ChevronDown size={14} className="text-slate-400 ml-auto" />
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              <span className="text-[13px] text-slate-500">执行频率:</span>
                              <div className="flex items-center gap-2 border border-slate-200 rounded px-3 py-1.5 bg-white shadow-sm min-w-[140px]">
                                <span className="text-[13px] text-slate-700 uppercase">每天</span>
                                <ChevronDown size={14} className="text-slate-400 ml-auto" />
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              <span className="text-[13px] text-slate-500">入组目标:</span>
                              <div className="flex items-center gap-2">
                                <div className="flex items-center gap-2 border border-slate-200 rounded px-3 py-1.5 bg-white shadow-sm min-w-[100px]">
                                  <span className="text-[13px] text-slate-700">病历数</span>
                                  <ChevronDown size={14} className="text-slate-400 ml-auto" />
                                </div>
                                <input 
                                  type="text" 
                                  className="w-16 h-8 border border-slate-200 rounded px-2 text-[13px] outline-none focus:border-blue-500"
                                  placeholder="0"
                                />
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              <span className="text-[13px] text-slate-500">浮动比例:</span>
                              <div className="flex items-center gap-2 border border-slate-200 rounded px-3 py-1.5 bg-white shadow-sm min-w-[180px]">
                                <span className="text-[13px] text-slate-400">请选择浮动比例</span>
                                <ChevronDown size={14} className="text-slate-400 ml-auto" />
                              </div>
                            </div>
                          </div>

                          {/* Conditions Text Summary */}
                          <div className="mb-0 bg-blue-50/30 rounded-2xl p-6 border border-blue-100/50">
                            <div className="flex items-center justify-between mb-4">
                              <h4 className="flex items-center gap-2 text-xs font-black text-slate-800 uppercase tracking-widest">
                                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                                订阅条件
                              </h4>
                            </div>
                            <div className="space-y-2.5 text-[13px] leading-relaxed">
                              {appliedSearchFavorite ? (
                                appliedSearchFavorite.conditions.map((cond, idx) => (
                                  <div key={idx} className="flex gap-2">
                                    <span className="text-slate-700">{cond}</span>
                                  </div>
                                ))
                              ) : (
                                <>
                                  <div className="flex gap-2">
                                    <span className="text-slate-500 font-bold whitespace-nowrap">纳入条件1:</span>
                                    <span className="text-slate-700">院区: <span className="text-blue-600 font-black">全院</span>; 就诊类型: <span className="text-slate-400">undefined</span>;</span>
                                  </div>
                                  <div className="flex gap-2">
                                    <span className="text-slate-500 font-bold whitespace-nowrap">纳入条件2:</span>
                                    <span className="text-slate-700">同一次就诊: 诊断信息/原始诊断名称 包含 <span className="text-blue-600 font-black">肝炎</span>;</span>
                                  </div>
                                </>
                              )}
                              <div className="flex gap-2">
                                <span className="text-slate-500 font-bold whitespace-nowrap">纳入基线事件:</span>
                                <span className="text-slate-700">同一次就诊: <span className="bg-blue-600 text-white px-1.5 py-0.5 rounded text-[11px] font-bold mx-1">首次</span> 就诊信息/就诊日期 不为空 ;</span>
                              </div>
                              <div className="flex gap-2">
                                <span className="text-slate-500 font-bold whitespace-nowrap">纳入其他事件1:</span>
                                <span className="text-slate-700">同一次就诊: <span className="bg-blue-600 text-white px-1.5 py-0.5 rounded text-[11px] font-bold mx-1">总次数 ≥ 3</span> 生化/乳酸 不为空 ;</span>
                              </div>
                              <div className="flex gap-2">
                                <span className="text-slate-500 font-bold whitespace-nowrap">排除条件1:</span>
                                <span className="text-slate-700">同一次就诊;</span>
                              </div>
                            </div>
                          </div>

                          {/* Tabs and Visual Builder */}
                          <div className="mt-8">
                            <div className="flex items-center justify-between mb-6">
                              <div className="flex gap-1 p-1 bg-slate-100 rounded-xl w-fit">
                                <button className="px-6 py-2 bg-white text-blue-600 rounded-lg text-xs font-black shadow-sm">纳入标准</button>
                                <button className="px-6 py-2 text-slate-500 rounded-lg text-xs font-bold hover:bg-slate-50 transition-all">排除标准</button>
                              </div>
                              <button 
                                onClick={() => setShowSearchFavoritePicker(true)}
                                className="bg-blue-50 text-blue-600 border border-blue-200 px-5 py-2.5 rounded-2xl text-xs font-black flex items-center gap-2 hover:bg-blue-100 transition-all active:scale-95 shadow-sm group"
                              >
                                <FolderInput size={16} className="group-hover:rotate-12 transition-transform" /> 引用检索收藏条件
                              </button>
                            </div>

                            <div className="space-y-4">
                              <span className="text-xs font-black text-slate-800 uppercase tracking-widest flex items-center gap-2">
                                条件筛选
                              </span>
                              
                              <div className="bg-[#f0f4f8] rounded-3xl border border-slate-200 overflow-hidden relative min-h-[500px]">
                                {/* Toolbar */}
                                <div className="absolute top-4 right-4 z-10 flex items-center gap-2 bg-white/90 backdrop-blur shadow-sm border border-slate-200 rounded-xl p-1.5">
                                  <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-400"><Minus size={16} /></button>
                                  <span className="text-[11px] font-black w-10 text-center text-slate-600">100%</span>
                                  <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-400"><Plus size={16} /></button>
                                  <div className="w-px h-4 bg-slate-200 mx-1" />
                                  <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-400"><Layout size={16} /></button>
                                </div>

                                {/* Flow Content */}
                                <div className="p-8 space-y-12">
                                  {/* Top Level Add */}
                                  <div className="flex items-center gap-4">
                                    <button className="bg-blue-600 text-white px-4 py-2 rounded-xl text-xs font-black flex items-center gap-2 shadow-lg shadow-blue-100 transition-all active:scale-95">
                                      <Plus size={16} /> 纳入条件
                                    </button>
                                  </div>

                                  <div className="space-y-8 pl-8 relative">
                                    {/* Connecting Line Vertical */}
                                    <div className="absolute left-0 top-[-30px] bottom-10 w-0.5 bg-slate-200" />

                                    {/* Item 1 */}
                                    <div className="flex items-center gap-4 relative">
                                      <div className="absolute left-[-32px] top-1/2 w-8 h-0.5 bg-slate-200" />
                                      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4 w-full">
                                        <span className="text-xs font-black text-slate-700 whitespace-nowrap">纳入条件1</span>
                                        <div className="flex flex-1 items-center gap-2 overflow-hidden">
                                          <div className="px-4 py-2 border border-slate-100 bg-slate-50 text-[13px] rounded-lg text-slate-700 flex items-center justify-between w-48">
                                            <span>全院</span>
                                            <ChevronDown size={14} className="text-slate-400" />
                                          </div>
                                          <div className="px-4 py-2 border border-slate-100 bg-slate-50 text-[13px] rounded-lg text-slate-700 flex items-center justify-between w-24">
                                            <span>0</span>
                                            <ChevronDown size={14} className="text-slate-400" />
                                          </div>
                                          <div className="px-4 py-2 border border-slate-100 bg-slate-50 text-[13px] rounded-lg text-slate-700 flex items-center justify-between w-48">
                                            <span className="text-slate-400">就诊科室</span>
                                            <ChevronDown size={14} className="text-slate-400" />
                                          </div>
                                          <Calendar size={18} className="text-slate-300 shrink-0" />
                                          <div className="flex-1 bg-slate-50 border border-slate-100 rounded-lg h-9" />
                                        </div>
                                      </div>
                                    </div>

                                    {/* Item 2 */}
                                    <div className="flex items-center gap-4 relative">
                                      <div className="absolute left-[-32px] top-1/2 w-8 h-0.5 bg-slate-200" />
                                      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-4 w-full">
                                        <div className="flex items-center gap-4">
                                          <span className="text-xs font-black text-slate-700 whitespace-nowrap">纳入条件2</span>
                                          <div className="flex items-center gap-1">
                                            <button className="p-1.5 text-slate-300 hover:text-blue-600"><Copy size={16} /></button>
                                            <button className="p-1.5 text-slate-300 hover:text-red-500"><Trash2 size={16} /></button>
                                            <button className="p-1.5 text-slate-300 hover:text-slate-600"><Settings size={16} /></button>
                                          </div>
                                          <div className="flex items-center gap-2 bg-slate-50 p-1.5 rounded-xl border border-slate-100">
                                            <div className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-[13px] flex items-center gap-4">
                                              <span>同一次就诊</span>
                                              <ChevronDown size={14} className="text-slate-400" />
                                            </div>
                                            <div className="bg-blue-600 text-white px-3 py-1 rounded-lg text-[11px] font-black flex items-center gap-1">
                                              且 <ChevronDown size={12} />
                                            </div>
                                            <button className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                                              <Plus size={16} />
                                            </button>
                                          </div>
                                        </div>

                                        <div className="pl-12 space-y-4 relative">
                                          <div className="absolute left-4 top-[-20px] bottom-6 w-0.5 bg-slate-100" />
                                          <div className="absolute left-4 bottom-6 w-4 h-0.5 bg-slate-100" />
                                          
                                          <div className="flex items-center gap-3">
                                            <button className="flex items-center gap-1 text-[11px] font-black text-slate-400 bg-slate-50 px-2 py-1 rounded">
                                              <Minus size={14} /> 按
                                            </button>
                                            <div className="flex-1 flex gap-2">
                                              <div className="px-4 py-2 border border-slate-200 rounded-xl bg-white text-[13px] flex items-center justify-between flex-1">
                                                <span>诊断信息/原始诊断名称</span>
                                                <ChevronDown size={14} className="text-slate-400" />
                                              </div>
                                              <div className="px-4 py-2 border border-slate-200 rounded-xl bg-white text-[13px] flex items-center justify-between w-32">
                                                <span>包含</span>
                                                <ChevronDown size={14} className="text-slate-400" />
                                              </div>
                                              <div className="px-4 py-2 border border-slate-200 rounded-xl bg-white text-[13px] flex items-center gap-2 min-w-[200px]">
                                                <span className="flex items-center gap-1 bg-slate-100 px-2 py-1 rounded text-blue-600 font-bold">
                                                  肝炎 <X size={12} className="text-slate-400 hover:text-red-500 cursor-pointer" />
                                                </span>
                                                <input type="text" className="outline-none flex-1" placeholder="请选择" />
                                              </div>
                                              <button className="p-2 text-slate-300 hover:text-slate-500 transition-colors">
                                                <Settings size={18} />
                                              </button>
                                            </div>
                                          </div>

                                          <div className="flex items-center gap-2">
                                            <button className="px-4 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-[11px] font-bold">+ 条件</button>
                                            <button className="px-4 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-[11px] font-bold">+ 括号</button>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Footer */}
                      <div className="p-6 border-t border-slate-100 flex justify-end gap-4 bg-white sticky bottom-0">
                        <button 
                          onClick={() => setShowSubscriptionSettings(false)}
                          className="px-10 py-3 text-slate-600 font-bold hover:bg-slate-50 rounded-2xl border border-slate-200 transition-all"
                        >
                          取消
                        </button>
                        <button 
                          onClick={() => setShowSubscriptionSettings(false)}
                          className="px-10 py-3 bg-blue-600 text-white font-black rounded-2xl shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all"
                        >
                          保存设置
                        </button>
                      </div>
                    </motion.div>
                  </div>
                )}
              </AnimatePresence>

              {/* Search Favorite Picker Sub-Modal */}
              <AnimatePresence>
                {showSearchFavoritePicker && (
                  <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onClick={() => setShowSearchFavoritePicker(false)}
                      className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                    />
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: 20 }}
                      className="relative w-full max-w-2xl bg-white rounded-[32px] shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
                    >
                      <div className="px-8 py-6 border-b flex items-center justify-between">
                        <div>
                          <h3 className="text-xl font-black text-slate-800">引用检索收藏</h3>
                          <p className="text-xs text-slate-400 font-bold mt-1">选择已收藏的科研检索条件作为订阅标准</p>
                        </div>
                        <button 
                          onClick={() => setShowSearchFavoritePicker(false)}
                          className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400"
                        >
                          <X size={20} />
                        </button>
                      </div>

                      <div className="flex-1 overflow-y-auto p-6 space-y-4">
                        {/* Search Bar in Picker */}
                        <div className="relative mb-6">
                           <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                           <input 
                              type="text" 
                              placeholder="搜索收藏件名称..." 
                              className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm outline-none focus:bg-white focus:border-blue-200"
                           />
                        </div>

                        {SEARCH_FAVORITES.map((fav) => (
                          <div 
                            key={fav.id}
                            className="p-6 bg-white border border-slate-100 rounded-3xl shadow-sm hover:shadow-md transition-all group cursor-pointer border-l-4 border-l-transparent hover:border-l-blue-500"
                            onClick={() => {
                              setAppliedSearchFavorite(fav);
                              setShowSearchFavoritePicker(false);
                            }}
                          >
                             <div className="flex items-start justify-between mb-4">
                                <h4 className="text-[15px] font-black text-slate-800 leading-tight group-hover:text-blue-600 transition-colors">{fav.name}</h4>
                             </div>
                             <div className="space-y-1.5 mb-4">
                                {fav.conditions.map((c, i) => (
                                  <p key={i} className="text-[11px] text-slate-500 line-clamp-1 opacity-70 group-hover:opacity-100 transition-opacity">
                                    {c}
                                  </p>
                                ))}
                             </div>
                             <div className="flex items-center gap-3 text-[11px] text-slate-400">
                                <span>共 <span className="text-blue-600 font-bold">{fav.recordCount}</span> 份病历</span>
                                <span>来源于 {fav.patientCount} 个患者</span>
                                <div className="ml-auto text-blue-600 font-black flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                  引用 <ChevronRight size={14} />
                                </div>
                             </div>
                          </div>
                        ))}

                        <div className="py-10 text-center">
                          <p className="text-slate-400 text-xs font-medium">没有更多收藏了</p>
                        </div>
                      </div>

                      <div className="p-6 border-t border-slate-50 bg-slate-50/50 flex justify-end">
                         <button 
                          onClick={() => setShowSearchFavoritePicker(false)}
                          className="px-8 py-2.5 text-slate-500 font-bold hover:bg-slate-100 rounded-xl transition-all"
                         >
                           关闭
                         </button>
                      </div>
                    </motion.div>
                  </div>
                )}

                {/* Data Insight Subscription & Cohort Save Modal */}
                {isInsightSubscriptionModalOpen && (
                  <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onClick={() => setIsInsightSubscriptionModalOpen(false)}
                      className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                    />
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: 20 }}
                      className="relative w-full max-w-lg bg-white rounded-[32px] shadow-2xl overflow-hidden flex flex-col"
                    >
                      <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-slate-900 to-indigo-950 text-white">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-blue-600/30 border border-blue-400/30 flex items-center justify-center">
                            <Bell className="text-blue-400" size={20} />
                          </div>
                          <div>
                            <h3 className="text-base font-black">存为队列并开启动态订阅</h3>
                            <p className="text-xs text-slate-300 mt-0.5">自动跟踪符合纳排条件的新增入组患者</p>
                          </div>
                        </div>
                        <button 
                          onClick={() => setIsInsightSubscriptionModalOpen(false)}
                          className="p-2 hover:bg-white/10 rounded-full transition-colors text-slate-400 hover:text-white"
                        >
                          <X size={18} />
                        </button>
                      </div>

                      <div className="p-8 space-y-5">
                        <div>
                          <label className="block text-xs font-bold text-slate-600 mb-1.5">订阅队列名称</label>
                          <input 
                            type="text"
                            defaultValue="食管癌术后复发风险队列 (精简主方案)"
                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 outline-none focus:bg-white focus:border-blue-500 transition-all"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-600 mb-1.5">关联归属功能域</label>
                          <div className="grid grid-cols-2 gap-3">
                            <div className="p-3 rounded-xl border-2 border-blue-500 bg-blue-50/40 flex items-center gap-2.5 cursor-pointer">
                              <div className="w-4 h-4 rounded-full border-4 border-blue-600 bg-white" />
                              <div>
                                <div className="text-xs font-black text-slate-800">课题管理 (纳排条件)</div>
                                <div className="text-[10px] text-slate-400">自动同步至专病课题条件</div>
                              </div>
                            </div>
                            <div className="p-3 rounded-xl border border-slate-200 bg-white flex items-center gap-2.5 cursor-pointer hover:border-blue-300">
                              <div className="w-4 h-4 rounded-full border border-slate-300 bg-white" />
                              <div>
                                <div className="text-xs font-black text-slate-800">患者收藏 (动态分组)</div>
                                <div className="text-[10px] text-slate-400">存入个人患者收藏夹</div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-600 mb-1.5">推送提醒频率 (Notification Frequency)</label>
                          <div className="grid grid-cols-3 gap-3">
                            {[
                              { id: 'weekly', label: '每周推送', desc: '每周一早晨汇总' },
                              { id: 'monthly', label: '每月推送', desc: '每月1号生成月报' },
                              { id: 'realtime', label: '实时提醒', desc: '新患者归档即刻通知' }
                            ].map((item) => (
                              <button
                                key={item.id}
                                onClick={() => setInsightSubFreq(item.id as any)}
                                className={`p-3 rounded-xl border text-left transition-all ${
                                  insightSubFreq === item.id 
                                    ? 'border-blue-500 bg-blue-50/50 text-blue-900 font-bold' 
                                    : 'border-slate-200 hover:border-slate-300 text-slate-700'
                                }`}
                              >
                                <div className="text-xs font-bold">{item.label}</div>
                                <div className="text-[10px] opacity-70 mt-0.5">{item.desc}</div>
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
                          <div>
                            <div className="text-xs font-bold text-slate-800">自动入组至课题数据集</div>
                            <div className="text-[10px] text-slate-400">检测到新患者符合条件时，自动将其挂载至课题样本库</div>
                          </div>
                          <button 
                            onClick={() => setInsightAutoEnroll(!insightAutoEnroll)}
                            className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                              insightAutoEnroll ? 'bg-blue-600' : 'bg-slate-300'
                            }`}
                          >
                            <div className={`w-5 h-5 bg-white rounded-full transition-transform shadow-sm ${
                              insightAutoEnroll ? 'translate-x-5' : 'translate-x-0'
                            }`} />
                          </button>
                        </div>
                      </div>

                      <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex items-center justify-end gap-3">
                        <button 
                          onClick={() => setIsInsightSubscriptionModalOpen(false)}
                          className="px-5 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition-all"
                        >
                          取消
                        </button>
                        <button 
                          onClick={() => {
                            setIsInsightSubscriptionModalOpen(false);
                            setToastMessage("队列【食管癌术后复发风险队列】已保存，并成功开启动态订阅通知！");
                          }}
                          className="px-6 py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all shadow-md shadow-blue-500/20 active:scale-95"
                        >
                          保存并确认订阅
                        </button>
                      </div>
                    </motion.div>
                  </div>
                )}

                {/* Modal: Observed / Focus Metrics Selection (3-Pane Selector Modal) */}
                {isObservedMetricsModalOpen && (
                  <div className="fixed inset-0 z-[220] flex items-center justify-center p-4">
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onClick={() => setIsObservedMetricsModalOpen(false)}
                      className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                    />
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: 20 }}
                      className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[80vh] border border-slate-200"
                    >
                      {/* Modal Header */}
                      <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-slate-900 to-indigo-950 text-white">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center">
                            <Settings className="text-blue-400" size={20} />
                          </div>
                          <div>
                            <h3 className="text-base font-black">设定关注指标 / 观察维度字段</h3>
                            <p className="text-xs text-slate-300 mt-0.5">勾选需要在多个患者收藏分组之间对比横向填充率的核心研究变量</p>
                          </div>
                        </div>
                        <button 
                          onClick={() => setIsObservedMetricsModalOpen(false)}
                          className="p-2 hover:bg-white/10 rounded-full transition-colors text-slate-400 hover:text-white cursor-pointer"
                        >
                          <X size={18} />
                        </button>
                      </div>

                      {/* 3-Pane Body Layout */}
                      <div className="flex-1 grid grid-cols-12 overflow-hidden bg-slate-50/50">
                        {/* Pane 1: Data Table Categories (3/12) */}
                        <div className="col-span-3 border-r border-slate-200 bg-slate-50 p-3 space-y-1 overflow-y-auto dataset-scroll">
                          <div className="px-3 py-2 text-[10px] font-black uppercase text-slate-400 tracking-wider">
                            指标分类库
                          </div>
                          {METRIC_LIBRARY_DATA.map((cat) => {
                            const isSelectedCategory = selectedMetricCategory === cat.category;
                            const countInCat = cat.fields.filter(f => tempSelectedMetricIds.includes(f.id)).length;
                            return (
                              <button
                                key={cat.category}
                                onClick={() => setSelectedMetricCategory(cat.category)}
                                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                                  isSelectedCategory
                                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20 font-black'
                                    : 'text-slate-700 hover:bg-slate-200/60'
                                }`}
                              >
                                <span className="truncate">{cat.category}</span>
                                {countInCat > 0 && (
                                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-black ${
                                    isSelectedCategory ? 'bg-white text-blue-600' : 'bg-blue-100 text-blue-700'
                                  }`}>
                                    {countInCat}
                                  </span>
                                )}
                              </button>
                            );
                          })}
                        </div>

                        {/* Pane 2: Fields List under Selected Category (5/12) */}
                        <div className="col-span-5 border-r border-slate-200 bg-white p-4 overflow-y-auto space-y-3 dataset-scroll">
                          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                            <span className="text-xs font-black text-slate-800">{selectedMetricCategory} - 字段明细</span>
                            <div className="flex gap-2 text-[11px]">
                              <button 
                                onClick={() => {
                                  const currentCatObj = METRIC_LIBRARY_DATA.find(c => c.category === selectedMetricCategory);
                                  if (currentCatObj) {
                                    const fieldIds = currentCatObj.fields.map(f => f.id);
                                    const newSelected = Array.from(new Set([...tempSelectedMetricIds, ...fieldIds]));
                                    setTempSelectedMetricIds(newSelected);
                                  }
                                }}
                                className="text-blue-600 hover:underline font-bold cursor-pointer"
                              >
                                全选本类
                              </button>
                            </div>
                          </div>

                          <div className="space-y-1.5">
                            {METRIC_LIBRARY_DATA.find(c => c.category === selectedMetricCategory)?.fields.map((field) => {
                              const isChecked = tempSelectedMetricIds.includes(field.id);
                              return (
                                <label
                                  key={field.id}
                                  className={`flex items-center justify-between p-2.5 rounded-xl border text-xs cursor-pointer transition-all ${
                                    isChecked
                                      ? 'bg-blue-50/80 border-blue-300 text-blue-900 shadow-2xs font-bold'
                                      : 'bg-white border-slate-200/80 text-slate-700 hover:bg-slate-50'
                                  }`}
                                >
                                  <div className="flex items-center gap-2.5">
                                    <input
                                      type="checkbox"
                                      checked={isChecked}
                                      onChange={() => {
                                        if (isChecked) {
                                          setTempSelectedMetricIds(tempSelectedMetricIds.filter(id => id !== field.id));
                                        } else {
                                          setTempSelectedMetricIds([...tempSelectedMetricIds, field.id]);
                                        }
                                      }}
                                      className="w-4 h-4 text-blue-600 rounded border-slate-300"
                                    />
                                    <span>{field.name}</span>
                                  </div>
                                  <span className="text-[10px] text-slate-400 font-mono">
                                    {field.type || '字段'}
                                  </span>
                                </label>
                              );
                            })}
                          </div>
                        </div>

                        {/* Pane 3: Selected Metrics Summary Tags (4/12) */}
                        <div className="col-span-4 bg-slate-50/80 p-4 overflow-y-auto flex flex-col justify-between dataset-scroll">
                          <div className="space-y-3">
                            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                              <div className="flex items-center gap-1.5">
                                <CheckCircle2 size={15} className="text-blue-600" />
                                <span className="text-xs font-black text-slate-800">已选关注指标</span>
                              </div>
                              <button
                                onClick={() => setTempSelectedMetricIds([])}
                                className="text-[11px] text-rose-500 hover:underline cursor-pointer font-bold"
                              >
                                清空
                              </button>
                            </div>

                            <div className="text-xs text-slate-500">
                              共选入 <strong className="text-blue-600 font-black">{tempSelectedMetricIds.length}</strong> 项观察指标：
                            </div>

                            <div className="flex flex-wrap gap-1.5 max-h-[360px] overflow-y-auto dataset-scroll p-1">
                              {tempSelectedMetricIds.map((id) => {
                                const fieldObj = METRIC_LIBRARY_DATA.flatMap(c => c.fields).find(f => f.id === id);
                                if (!fieldObj) return null;
                                return (
                                  <span
                                    key={id}
                                    className="inline-flex items-center gap-1 px-2.5 py-1 bg-white border border-blue-300 text-blue-800 text-[11px] font-bold rounded-lg shadow-2xs"
                                  >
                                    <span>{fieldObj.name}</span>
                                    <button
                                      onClick={() => setTempSelectedMetricIds(tempSelectedMetricIds.filter(i => i !== id))}
                                      className="text-slate-400 hover:text-rose-500 cursor-pointer ml-0.5"
                                    >
                                      <X size={12} />
                                    </button>
                                  </span>
                                );
                              })}
                            </div>
                          </div>

                          <div className="pt-4 border-t border-slate-200 space-y-2">
                            <button
                              onClick={() => {
                                setSelectedMetricIds(tempSelectedMetricIds);
                                setIsObservedMetricsModalOpen(false);
                                setToastMessage(`已保存 ${tempSelectedMetricIds.length} 个关注指标并刷新横向对比矩阵！`);
                              }}
                              className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-blue-500/20 active:scale-95 cursor-pointer text-center"
                            >
                              确认应用并刷新矩阵
                            </button>
                            <button
                              onClick={() => setIsObservedMetricsModalOpen(false)}
                              className="w-full py-2 bg-white hover:bg-slate-100 text-slate-600 rounded-xl text-xs font-bold border border-slate-200 cursor-pointer text-center"
                            >
                              取消
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                )}

                {/* Modal: Select Contrast Scheme from Favorites or Search History */}
                {isSelectSchemeModalOpen && (
                  <div className="fixed inset-0 z-[210] flex items-center justify-center p-4">
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onClick={() => setIsSelectSchemeModalOpen(false)}
                      className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                    />
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: 20 }}
                      className="relative w-full max-w-2xl bg-white rounded-[32px] shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
                    >
                      <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-slate-900 to-indigo-950 text-white">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-indigo-500/30 border border-indigo-400/30 flex items-center justify-center">
                            <Bookmark className="text-indigo-300" size={20} />
                          </div>
                          <div>
                            <h3 className="text-base font-black">从【检索收藏 / 检索历史】导入对比方案</h3>
                            <p className="text-xs text-slate-300 mt-0.5">选择过往构建的检索方案引入控制台，实时横向评估样本量与填充率</p>
                          </div>
                        </div>
                        <button 
                          onClick={() => setIsSelectSchemeModalOpen(false)}
                          className="p-2 hover:bg-white/10 rounded-full transition-colors text-slate-400 hover:text-white"
                        >
                          <X size={18} />
                        </button>
                      </div>

                      {/* Modal Sub-Tabs */}
                      <div className="px-8 pt-4 bg-slate-50 border-b border-slate-100 flex items-center gap-4">
                        <button
                          onClick={() => setSchemeSourceTab('favorites')}
                          className={`pb-3 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 ${
                            schemeSourceTab === 'favorites'
                              ? 'border-indigo-600 text-indigo-600 font-black'
                              : 'border-transparent text-slate-500 hover:text-slate-800'
                          }`}
                        >
                          <Star size={14} />
                          <span>检索收藏库 (4)</span>
                        </button>
                        <button
                          onClick={() => setSchemeSourceTab('history')}
                          className={`pb-3 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 ${
                            schemeSourceTab === 'history'
                              ? 'border-indigo-600 text-indigo-600 font-black'
                              : 'border-transparent text-slate-500 hover:text-slate-800'
                          }`}
                        >
                          <History size={14} />
                          <span>检索历史记录 (6)</span>
                        </button>
                      </div>

                      {/* Modal Content List */}
                      <div className="p-8 overflow-y-auto space-y-4 dataset-scroll flex-1">
                        {schemeSourceTab === 'favorites' && [
                          {
                            title: '食管癌精准外科方案',
                            source: '来自于【检索收藏】: 2026-07-28 严选组',
                            patients: 875,
                            records: 904,
                            tagColor: 'blue',
                            conditions: ['诊断：食管癌 C15.9 (精准匹配)', '包含：手术切除记录 + 术后随访>6个月', '排除：合并第二原发恶性肿瘤']
                          },
                          {
                            title: '食管鳞癌放宽时间窗方案',
                            source: '来自于【检索收藏】: 2026-07-15 扩增库',
                            patients: 1717,
                            records: 1855,
                            tagColor: 'emerald',
                            conditions: ['诊断：食管癌全类型包含', '包含：含新辅助化疗/放疗病例', '排除：仅排除未进行任何治疗者']
                          },
                          {
                            title: '全食管肿瘤宽泛大样本队列',
                            source: '来自于【检索收藏】: 2026-07-02 探索队列',
                            patients: 2794,
                            records: 3228,
                            tagColor: 'amber',
                            conditions: ['诊断：包含疑似及门诊临床诊断', '包含：任意治疗阶段病例', '无严格排除条件']
                          },
                          {
                            title: '食管癌免疫治疗 (PD-1/PD-L1) 受试队列',
                            source: '来自于【检索收藏】: 2026-06-18 靶向专题',
                            patients: 420,
                            records: 485,
                            tagColor: 'indigo',
                            conditions: ['诊断：食管癌 C15.9', '包含：PD-1/PD-L1使用记录 & 随访>3个月', '排除：严重自身免疫病病史']
                          }
                        ].map((item, idx) => (
                          <div key={idx} className="p-4 bg-slate-50 hover:bg-slate-100/80 rounded-2xl border border-slate-200/80 transition-all flex items-start justify-between gap-4">
                            <div className="space-y-1.5 flex-1">
                              <div className="flex items-center gap-2">
                                <h4 className="text-xs font-black text-slate-800">{item.title}</h4>
                                <span className="text-[10px] px-2 py-0.5 rounded font-bold bg-white text-slate-500 border border-slate-200">{item.source}</span>
                              </div>
                              <div className="text-[11px] text-slate-600 font-medium">
                                规则要点：{item.conditions.join('；')}
                              </div>
                              <div className="flex items-center gap-4 text-[11px] font-bold text-slate-500 pt-1">
                                <span>匹配患者：<strong className="text-indigo-600 font-mono font-black">{item.patients.toLocaleString()}</strong> 位</span>
                                <span>符合病历：<strong className="text-slate-700 font-mono font-black">{item.records.toLocaleString()}</strong> 份</span>
                              </div>
                            </div>

                            <button
                              onClick={() => {
                                const targetSlot = schemeToReplaceSlot || 'compare1';
                                const updated = insightSchemes.map(s => {
                                  if (s.id === targetSlot) {
                                    return {
                                      ...s,
                                      name: item.title,
                                      source: item.source,
                                      patients: item.patients,
                                      records: item.records,
                                      conditions: item.conditions
                                    };
                                  }
                                  return s;
                                });
                                setInsightSchemes(updated);
                                setIsSelectSchemeModalOpen(false);
                                setToastMessage(`已成功从收藏库导入【${item.title}】至对比控制台！`);
                              }}
                              className="shrink-0 px-4 py-2 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm active:scale-95 flex items-center gap-1"
                            >
                              <Plus size={14} />
                              <span>载入此方案对比</span>
                            </button>
                          </div>
                        ))}

                        {schemeSourceTab === 'history' && [
                          {
                            title: '食管癌 C15.9 + WES全外显子检测组',
                            source: '来自于【检索历史】: 2026-08-03 18:30',
                            patients: 612,
                            records: 640,
                            tagColor: 'blue',
                            conditions: ['诊断：食管癌 C15.9', '包含：包含WES基因检测报告', '排除：测序质控未通过']
                          },
                          {
                            title: '食管癌 + 术前ALT/AST肝功能正常组',
                            source: '来自于【检索历史】: 2026-08-02 11:15',
                            patients: 1120,
                            records: 1210,
                            tagColor: 'emerald',
                            conditions: ['诊断：食管癌', '包含：术前肝功能指标完备', '排除：急性肝炎及肝硬化']
                          },
                          {
                            title: '食管癌 + 无第二原发恶性肿瘤组',
                            source: '来自于【检索历史】: 2026-08-01 14:20',
                            patients: 2240,
                            records: 2480,
                            tagColor: 'amber',
                            conditions: ['诊断：食管恶性肿瘤', '包含：首发原发癌', '排除：5年内合并其他恶性肿瘤']
                          }
                        ].map((item, idx) => (
                          <div key={idx} className="p-4 bg-slate-50 hover:bg-slate-100/80 rounded-2xl border border-slate-200/80 transition-all flex items-start justify-between gap-4">
                            <div className="space-y-1.5 flex-1">
                              <div className="flex items-center gap-2">
                                <h4 className="text-xs font-black text-slate-800">{item.title}</h4>
                                <span className="text-[10px] px-2 py-0.5 rounded font-bold bg-white text-slate-500 border border-slate-200">{item.source}</span>
                              </div>
                              <div className="text-[11px] text-slate-600 font-medium">
                                规则要点：{item.conditions.join('；')}
                              </div>
                              <div className="flex items-center gap-4 text-[11px] font-bold text-slate-500 pt-1">
                                <span>匹配患者：<strong className="text-indigo-600 font-mono font-black">{item.patients.toLocaleString()}</strong> 位</span>
                                <span>符合病历：<strong className="text-slate-700 font-mono font-black">{item.records.toLocaleString()}</strong> 份</span>
                              </div>
                            </div>

                            <button
                              onClick={() => {
                                const targetSlot = schemeToReplaceSlot || 'compare2';
                                const updated = insightSchemes.map(s => {
                                  if (s.id === targetSlot) {
                                    return {
                                      ...s,
                                      name: item.title,
                                      source: item.source,
                                      patients: item.patients,
                                      records: item.records,
                                      conditions: item.conditions
                                    };
                                  }
                                  return s;
                                });
                                setInsightSchemes(updated);
                                setIsSelectSchemeModalOpen(false);
                                setToastMessage(`已成功从历史记录导入【${item.title}】至对比控制台！`);
                              }}
                              className="shrink-0 px-4 py-2 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm active:scale-95 flex items-center gap-1"
                            >
                              <Plus size={14} />
                              <span>载入此方案对比</span>
                            </button>
                          </div>
                        ))}
                      </div>

                      <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex items-center justify-end">
                        <button 
                          onClick={() => setIsSelectSchemeModalOpen(false)}
                          className="px-5 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition-all"
                        >
                          关闭
                        </button>
                      </div>
                    </motion.div>
                  </div>
                )}

                {/* 添加统计模块弹窗 */}
                {isAddModuleModalOpen && (
                  <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-slate-100 flex flex-col">
                      {/* Modal Header */}
                      <div className="p-5 border-b border-slate-100 flex items-center justify-between relative bg-gradient-to-r from-blue-50/50 via-white to-white">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center font-bold shadow-2xs">
                            <Plus size={18} />
                          </div>
                          <div>
                            <h3 className="text-base font-black text-slate-800 tracking-tight">添加统计模块</h3>
                            <p className="text-xs text-slate-400 mt-0.5">选择指标并设置名称，直观拓展业务统计看板</p>
                          </div>
                        </div>
                        <button
                          onClick={() => setIsAddModuleModalOpen(false)}
                          className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                        >
                          <X size={18} />
                        </button>
                      </div>

                      {/* Modal Body */}
                      <div className="p-6 space-y-4">
                        {/* 模块内容分类 */}
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                            <span className="text-red-500">*</span> 模块内容
                          </label>
                          <select
                            value={newModuleContentType}
                            onChange={(e) => {
                              const val = e.target.value as '常用指标' | '自定义指标';
                              setNewModuleContentType(val);
                              if (val === '常用指标') {
                                setNewModuleMetricId('surg');
                                setNewModuleTitle('手术top10');
                              } else {
                                setNewModuleTitle('');
                                setNewCustomMetricField('检验报告/就诊类型');
                                setNewCustomStatType('按频次统计 (人次)');
                                setNewCustomStatRange('全部数据');
                              }
                            }}
                            className="w-full h-10 px-3 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all cursor-pointer"
                          >
                            <option value="常用指标">常用指标</option>
                            <option value="自定义指标">自定义指标</option>
                          </select>
                        </div>

                        {newModuleContentType === '常用指标' ? (
                          <>
                            {/* 选择统计指标 */}
                            <div className="space-y-1.5">
                              <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                                <span className="text-red-500">*</span> 选择统计指标
                              </label>
                              <select
                                value={newModuleMetricId}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  setNewModuleMetricId(val);
                                  const preset = BIZ_METRIC_PRESETS[val];
                                  if (preset) {
                                    setNewModuleTitle(preset.defaultTitle);
                                  }
                                }}
                                className="w-full h-10 px-3 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all cursor-pointer"
                              >
                                {Object.values(BIZ_METRIC_PRESETS).map((p) => (
                                  <option key={p.id} value={p.id}>
                                    {p.name}
                                  </option>
                                ))}
                              </select>
                            </div>

                            {/* 模块名称 */}
                            <div className="space-y-1.5">
                              <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                                <span className="text-red-500">*</span> 模块名称
                              </label>
                              <input
                                type="text"
                                value={newModuleTitle}
                                onChange={(e) => setNewModuleTitle(e.target.value)}
                                placeholder="请输入模块名称"
                                className="w-full h-10 px-3 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-slate-300"
                              />
                            </div>
                          </>
                        ) : (
                          <>
                            {/* 模块名称 */}
                            <div className="space-y-1.5">
                              <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                                <span className="text-red-500">*</span> 模块名称
                              </label>
                              <input
                                type="text"
                                value={newModuleTitle}
                                onChange={(e) => setNewModuleTitle(e.target.value)}
                                placeholder="请输入模块名称"
                                className="w-full h-10 px-3 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-slate-300"
                              />
                            </div>

                            {/* 选择指标 */}
                            <div className="space-y-1.5">
                              <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                                <span className="text-red-500">*</span> 选择指标
                              </label>
                              <select
                                value={newCustomMetricField}
                                onChange={(e) => setNewCustomMetricField(e.target.value)}
                                className="w-full h-10 px-3 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all cursor-pointer"
                              >
                                <option value="检验报告/就诊类型">检验报告/就诊类型</option>
                                <option value="检查报告/项目名称">检查报告/项目名称</option>
                                <option value="诊断记录/主要诊断">诊断记录/主要诊断</option>
                                <option value="用药明细/药品名称">用药明细/药品名称</option>
                                <option value="患者费用/自费金额">患者费用/自费金额</option>
                                <option value="手术记录/手术名称">手术记录/手术名称</option>
                              </select>
                            </div>

                            {/* 统计方式 */}
                            <div className="space-y-1.5">
                              <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                                <span className="text-red-500">*</span> 统计方式
                              </label>
                              <select
                                value={newCustomStatType}
                                onChange={(e) => setNewCustomStatType(e.target.value)}
                                className="w-full h-10 px-3 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all cursor-pointer"
                              >
                                <option value="按频次统计 (人次)">按频次统计 (人次)</option>
                                <option value="按数值求和">按数值求和</option>
                                <option value="按平均值">按平均值</option>
                                <option value="按比例分布 (%)">按比例分布 (%)</option>
                              </select>
                            </div>

                            {/* 统计范围 */}
                            <div className="space-y-1.5">
                              <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                                <span className="text-red-500">*</span> 统计范围
                              </label>
                              <select
                                value={newCustomStatRange}
                                onChange={(e) => setNewCustomStatRange(e.target.value)}
                                className="w-full h-10 px-3 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all cursor-pointer"
                              >
                                <option value="全部数据">全部数据</option>
                                <option value="近30天数据">近30天数据</option>
                                <option value="本年度数据">本年度数据</option>
                                <option value="门诊数据">门诊数据</option>
                                <option value="住院数据">住院数据</option>
                              </select>
                            </div>
                          </>
                        )}
                      </div>

                      {/* Modal Footer */}
                      <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-3">
                        <button
                          type="button"
                          onClick={() => setIsAddModuleModalOpen(false)}
                          className="px-5 py-2 border border-slate-200 hover:bg-slate-100 text-slate-600 font-bold text-xs rounded-lg transition-all cursor-pointer"
                        >
                          取消
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            const isCustom = newModuleContentType === '自定义指标';
                            const titleToUse = newModuleTitle.trim() || (
                              isCustom ? (newCustomMetricField || '自定义指标模块') : (BIZ_METRIC_PRESETS[newModuleMetricId]?.defaultTitle || '常用指标模块')
                            );
                            const newCard: BizStatCard = {
                              id: `card-${Date.now()}`,
                              contentType: newModuleContentType,
                              metricId: isCustom ? 'lab' : newModuleMetricId,
                              title: titleToUse,
                            };
                            setBizStatCards([...bizStatCards, newCard]);
                            setIsAddModuleModalOpen(false);
                            setToastMessage(`成功添加模块「${newCard.title}」！`);
                          }}
                          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-lg shadow-md shadow-blue-500/20 transition-all cursor-pointer"
                        >
                          确定添加
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* 数据补录 (替换原 ETL 清洗数据池 Modal，为全屏高保真在线补录数据网格) */}
                {showEtlModal && (
                  <div className="fixed inset-0 z-50 bg-slate-50 flex flex-col overflow-hidden animate-fadeIn">
                    {/* 1. 顶部 Header 栏 */}
                    <div className="bg-white border-b border-slate-200/80 px-6 py-3 flex items-center justify-between shadow-2xs shrink-0">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => setShowEtlModal(false)}
                          className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
                        >
                          <ArrowLeft size={16} />
                          <span>返回</span>
                        </button>
                        <h2 className="text-xl font-bold text-slate-800 border-l border-slate-200 pl-4 py-0.5">
                          待清洗数据
                        </h2>
                      </div>

                      {/* 提示 Banner */}
                      <div className="bg-amber-50/90 border border-amber-200/80 text-amber-800 rounded-xl px-4 py-2 text-xs flex items-center gap-2 shadow-2xs">
                        <AlertCircle size={15} className="text-amber-500 shrink-0" />
                        <span>补录的数据将进行数据清洗，清洗完成后请在患者列表中查看，请第二天查看。</span>
                      </div>
                    </div>

                    {/* 2. 二级 Tab 标签与工具栏 */}
                    <div className="bg-white border-b border-slate-200/60 px-6 py-3 flex flex-wrap items-center justify-between gap-3 shrink-0">
                      {/* 左侧 Report Type Tabs */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setEtlReportType('check')}
                          className={`px-4 py-1.5 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                            etlReportType === 'check'
                              ? 'bg-white border-slate-200 text-slate-800 shadow-2xs'
                              : 'bg-transparent border-transparent text-slate-500 hover:text-slate-800'
                          }`}
                        >
                          检查报告
                        </button>
                        <button
                          onClick={() => setEtlReportType('test')}
                          className={`px-4 py-1.5 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                            etlReportType === 'test'
                              ? 'bg-white border-slate-200 text-slate-800 shadow-2xs'
                              : 'bg-transparent border-transparent text-slate-500 hover:text-slate-800'
                          }`}
                        >
                          检验报告
                        </button>
                      </div>

                      {/* 右侧动作控制栏 */}
                      <div className="flex flex-wrap items-center gap-2">
                        <button
                          onClick={() => setToastMessage("数据筛选面板已激活")}
                          className="px-3.5 py-1.5 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
                        >
                          <Filter size={14} className="text-slate-500" />
                          <span>数据筛选</span>
                        </button>
                      </div>
                    </div>

                    {/* 3. 在线补录电子数据表格 (Grid Spreadsheet) */}
                    <div className="flex-1 overflow-auto p-4 bg-slate-100/60">
                      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
                        <table className="w-full text-left border-collapse font-sans text-xs">
                          <thead>
                            <tr className="bg-slate-100/80 border-b border-slate-200 text-slate-700 font-bold">
                              <th className="p-3 w-10 text-center border-r border-slate-200/60">
                                <input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                              </th>
                              <th className="p-3 border-r border-slate-200/60">
                                <div className="flex items-center justify-between">
                                  <span>患者编号</span>
                                  <div className="flex items-center gap-1 text-slate-400">
                                    <ArrowUpDown size={12} />
                                    <Filter size={12} />
                                  </div>
                                </div>
                              </th>
                              <th className="p-3 border-r border-slate-200/60">
                                <div className="flex items-center justify-between">
                                  <span>记录编号</span>
                                  <div className="flex items-center gap-1 text-slate-400">
                                    <ArrowUpDown size={12} />
                                    <Filter size={12} />
                                  </div>
                                </div>
                              </th>
                              <th className="p-3 border-r border-slate-200/60 min-w-[140px]">
                                <div className="flex items-center justify-between">
                                  <span>录入日期</span>
                                  <div className="flex items-center gap-1 text-slate-400">
                                    <ArrowUpDown size={12} />
                                    <Filter size={12} />
                                  </div>
                                </div>
                              </th>
                              <th className="p-3 border-r border-slate-200/60 min-w-[120px]">
                                <div className="flex items-center justify-between">
                                  <span>字段1</span>
                                  <div className="flex items-center gap-1 text-slate-400">
                                    <ArrowUpDown size={12} />
                                    <Filter size={12} />
                                  </div>
                                </div>
                              </th>
                              <th className="p-3 border-r border-slate-200/60 min-w-[120px]">
                                <div className="flex items-center justify-between">
                                  <span>字段2</span>
                                  <div className="flex items-center gap-1 text-slate-400">
                                    <ArrowUpDown size={12} />
                                    <Filter size={12} />
                                  </div>
                                </div>
                              </th>
                              <th className="p-3 border-r border-slate-200/60 min-w-[120px]">
                                <div className="flex items-center justify-between">
                                  <span>字段3</span>
                                  <div className="flex items-center gap-1 text-slate-400">
                                    <ArrowUpDown size={12} />
                                    <Filter size={12} />
                                  </div>
                                </div>
                              </th>
                              <th className="p-3 border-r border-slate-200/60 min-w-[120px]">
                                <div className="flex items-center justify-between">
                                  <span>字段4</span>
                                  <div className="flex items-center gap-1 text-slate-400">
                                    <ArrowUpDown size={12} />
                                    <Filter size={12} />
                                  </div>
                                </div>
                              </th>
                              <th className="p-3 min-w-[120px]">
                                <div className="flex items-center justify-between">
                                  <span>字段5</span>
                                  <div className="flex items-center gap-1 text-slate-400">
                                    <ArrowUpDown size={12} />
                                  </div>
                                </div>
                              </th>
                            </tr>
                          </thead>

                          <tbody className="divide-y divide-slate-200/60 font-mono">
                            {etlGridRows.map((row) => (
                              <tr key={row.id} className="hover:bg-blue-50/20 transition-colors">
                                <td className="p-3 text-center border-r border-slate-200/60 bg-slate-50/30">
                                  <input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                                </td>

                                {/* 患者编号 */}
                                <td className="p-2 border-r border-slate-200/60 font-bold text-slate-800">
                                  <input
                                    type="text"
                                    value={row.patNo}
                                    placeholder="请输入"
                                    onChange={(e) => {
                                      const val = e.target.value;
                                      setEtlGridRows(etlGridRows.map(r => r.id === row.id ? { ...r, patNo: val } : r));
                                    }}
                                    className="w-full px-2 py-1 bg-transparent border border-transparent hover:border-slate-300 focus:border-blue-500 rounded outline-none transition-colors text-slate-800 placeholder:text-slate-300"
                                  />
                                </td>

                                {/* 记录编号 */}
                                <td className="p-2 border-r border-slate-200/60 text-slate-700">
                                  <input
                                    type="text"
                                    value={row.recNo}
                                    placeholder="请输入"
                                    onChange={(e) => {
                                      const val = e.target.value;
                                      setEtlGridRows(etlGridRows.map(r => r.id === row.id ? { ...r, recNo: val } : r));
                                    }}
                                    className="w-full px-2 py-1 bg-transparent border border-transparent hover:border-slate-300 focus:border-blue-500 rounded outline-none transition-colors text-slate-800 placeholder:text-slate-300"
                                  />
                                </td>

                                {/* 录入日期 */}
                                <td className="p-2 border-r border-slate-200/60">
                                  <div className="relative flex items-center">
                                    <input
                                      type="text"
                                      value={row.date}
                                      placeholder="年 / 月 / 日"
                                      onChange={(e) => {
                                        const val = e.target.value;
                                        setEtlGridRows(etlGridRows.map(r => r.id === row.id ? { ...r, date: val } : r));
                                      }}
                                      className="w-full pl-2 pr-7 py-1 bg-transparent border border-transparent hover:border-slate-300 focus:border-blue-500 rounded outline-none transition-colors text-slate-800 placeholder:text-slate-300"
                                    />
                                    <Calendar size={13} className="absolute right-2 text-slate-400 pointer-events-none" />
                                  </div>
                                </td>

                                {/* 字段1 */}
                                <td className="p-2 border-r border-slate-200/60">
                                  <input
                                    type="text"
                                    value={row.f1}
                                    placeholder="请输入"
                                    onChange={(e) => {
                                      const val = e.target.value;
                                      setEtlGridRows(etlGridRows.map(r => r.id === row.id ? { ...r, f1: val } : r));
                                    }}
                                    className="w-full px-2 py-1 bg-transparent border border-transparent hover:border-slate-300 focus:border-blue-500 rounded outline-none transition-colors text-slate-700 placeholder:text-slate-300"
                                  />
                                </td>

                                {/* 字段2 */}
                                <td className="p-2 border-r border-slate-200/60">
                                  <input
                                    type="text"
                                    value={row.f2}
                                    placeholder="请输入"
                                    onChange={(e) => {
                                      const val = e.target.value;
                                      setEtlGridRows(etlGridRows.map(r => r.id === row.id ? { ...r, f2: val } : r));
                                    }}
                                    className="w-full px-2 py-1 bg-transparent border border-transparent hover:border-slate-300 focus:border-blue-500 rounded outline-none transition-colors text-slate-700 placeholder:text-slate-300"
                                  />
                                </td>

                                {/* 字段3 */}
                                <td className="p-2 border-r border-slate-200/60">
                                  <input
                                    type="text"
                                    value={row.f3}
                                    placeholder="请输入"
                                    onChange={(e) => {
                                      const val = e.target.value;
                                      setEtlGridRows(etlGridRows.map(r => r.id === row.id ? { ...r, f3: val } : r));
                                    }}
                                    className="w-full px-2 py-1 bg-transparent border border-transparent hover:border-slate-300 focus:border-blue-500 rounded outline-none transition-colors text-slate-700 placeholder:text-slate-300"
                                  />
                                </td>

                                {/* 字段4 */}
                                <td className="p-2 border-r border-slate-200/60">
                                  <input
                                    type="text"
                                    value={row.f4}
                                    placeholder="请输入"
                                    onChange={(e) => {
                                      const val = e.target.value;
                                      setEtlGridRows(etlGridRows.map(r => r.id === row.id ? { ...r, f4: val } : r));
                                    }}
                                    className="w-full px-2 py-1 bg-transparent border border-transparent hover:border-slate-300 focus:border-blue-500 rounded outline-none transition-colors text-slate-700 placeholder:text-slate-300"
                                  />
                                </td>

                                {/* 字段5 */}
                                <td className="p-2">
                                  <input
                                    type="text"
                                    value={row.f5}
                                    placeholder="请输入"
                                    onChange={(e) => {
                                      const val = e.target.value;
                                      setEtlGridRows(etlGridRows.map(r => r.id === row.id ? { ...r, f5: val } : r));
                                    }}
                                    className="w-full px-2 py-1 bg-transparent border border-transparent hover:border-slate-300 focus:border-blue-500 rounded outline-none transition-colors text-slate-700 placeholder:text-slate-300"
                                  />
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}

                {/* 图1高保真: 【表单配置】 Modal */}
                {showFormConfigModal && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: 10 }}
                      className="bg-white rounded-3xl shadow-2xl border border-slate-100 w-full max-w-3xl overflow-hidden flex flex-col p-8 space-y-6 my-auto"
                    >
                      {/* Modal Header */}
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-black text-slate-900">表单配置</h3>
                          <p className="text-xs text-slate-400 mt-1">配置该科研所使用的 CRF 表单及患者录入权限</p>
                        </div>

                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => {
                              const newName = prompt('请输入新表单名称:');
                              if (newName) {
                                setCrfFormConfigs([...crfFormConfigs, {
                                  id: String(Date.now()),
                                  name: newName,
                                  category: '未分类 (不挂载)',
                                  selfEntry: true,
                                  expireDate: '2027-12-31'
                                }]);
                              }
                            }}
                            className="px-3.5 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-600 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
                          >
                            <Plus size={14} /> 添加表单
                          </button>
                          <button
                            onClick={() => setShowFormConfigModal(false)}
                            className="p-1.5 hover:bg-slate-100 text-slate-400 hover:text-slate-600 rounded-xl transition-colors cursor-pointer"
                          >
                            <X size={18} />
                          </button>
                        </div>
                      </div>

                      {/* 表单配置分组树状列表 */}
                      <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
                        {Array.from(new Set(crfFormConfigs.map(c => c.category))).map(catName => (
                          <div key={catName} className="space-y-2">
                            {/* 分组 Category Header */}
                            <div className="text-xs font-bold text-slate-500 flex items-center gap-1.5 bg-slate-50 p-2 rounded-lg border border-slate-100/80">
                              <Folder size={14} className="text-slate-400" />
                              <span>{catName}</span>
                            </div>

                            {/* 分组下的各表单项 */}
                            <div className="space-y-2 pl-2">
                              {crfFormConfigs.filter(item => item.category === catName).map(item => (
                                <div
                                  key={item.id}
                                  className="flex flex-wrap items-center justify-between gap-3 p-3.5 bg-white rounded-2xl border border-slate-200/80 shadow-2xs hover:border-blue-200 transition-all"
                                >
                                  {/* 表单图标与名称 */}
                                  <div className="flex items-center gap-3 min-w-[200px]">
                                    <div className="w-8 h-8 rounded-xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                                      <FileText size={16} />
                                    </div>
                                    <span className="font-bold text-slate-800 text-xs">{item.name}</span>
                                  </div>

                                  {/* 右侧开关控制、失效时间与移除 */}
                                  <div className="flex items-center gap-6 text-xs">
                                    {/* 患者自助录入 Toggle */}
                                    <div className="flex items-center gap-2">
                                      <span className="text-slate-400 text-[11px] font-medium">患者自助录入</span>
                                      <button
                                        onClick={() => {
                                          setCrfFormConfigs(crfFormConfigs.map(c => c.id === item.id ? { ...c, selfEntry: !c.selfEntry } : c));
                                        }}
                                        className={`w-9 h-5 rounded-full transition-colors p-0.5 relative cursor-pointer ${
                                          item.selfEntry ? 'bg-blue-600' : 'bg-slate-200'
                                        }`}
                                      >
                                        <div className={`w-4 h-4 rounded-full bg-white shadow-xs transition-transform ${
                                          item.selfEntry ? 'translate-x-4' : 'translate-x-0'
                                        }`} />
                                      </button>
                                    </div>

                                    {/* 设置失效时间 */}
                                    <div className="flex items-center gap-1.5">
                                      <span className="text-slate-400 text-[11px] font-medium">设置失效时间</span>
                                      <input
                                        type="text"
                                        value={item.expireDate}
                                        onChange={(e) => {
                                          const val = e.target.value;
                                          setCrfFormConfigs(crfFormConfigs.map(c => c.id === item.id ? { ...c, expireDate: val } : c));
                                        }}
                                        className="w-28 px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono text-slate-700 outline-none focus:border-blue-500 text-center"
                                      />
                                    </div>

                                    {/* 移除按键 */}
                                    <button
                                      onClick={() => {
                                        setCrfFormConfigs(crfFormConfigs.filter(c => c.id !== item.id));
                                      }}
                                      className="text-red-500 hover:text-red-700 font-bold text-xs cursor-pointer px-2 py-1 rounded hover:bg-red-50 transition-colors"
                                    >
                                      移除
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Modal Footer */}
                      <div className="flex justify-end pt-2 border-t border-slate-100">
                        <button
                          onClick={() => {
                            setShowFormConfigModal(false);
                            setToastMessage("表单配置已更新保存");
                          }}
                          className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-black text-sm rounded-2xl shadow-lg shadow-blue-500/20 transition-all cursor-pointer"
                        >
                          完成配置
                        </button>
                      </div>
                    </motion.div>
                  </div>
                )}

                {/* 数据导入 Modal */}
                {showDataImportModal && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.96, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.96, y: 10 }}
                      className="bg-white rounded-3xl shadow-2xl border border-slate-100 w-full max-w-3xl overflow-hidden my-auto"
                    >
                      <div className="flex items-center justify-between px-7 py-5 border-b border-slate-100">
                        <div>
                          <h3 className="text-lg font-black text-slate-900">数据导入</h3>
                          <p className="text-xs text-slate-400 mt-1">按模板整理数据后上传，系统将自动校验并导入</p>
                        </div>
                        <button
                          onClick={() => {
                            setShowDataImportModal(false);
                            setDataImportStep('upload');
                            setDataImportProgress(0);
                          }}
                          className="p-2 hover:bg-slate-100 rounded-xl text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                          aria-label="关闭"
                        >
                          <X size={20} />
                        </button>
                      </div>

                      <div className="px-8 pt-7 pb-8">
                        <div className="max-w-xl mx-auto mb-7">
                          <div className="flex items-center px-12">
                            <span className={`w-5 h-5 rounded-full border-[5px] bg-white shrink-0 ${dataImportStep === 'upload' ? 'border-blue-600' : 'border-blue-600'}`} />
                            <span className={`h-1 flex-1 ${dataImportStep === 'upload' ? 'bg-slate-200' : 'bg-blue-600'}`} />
                            <span className={`w-5 h-5 rounded-full border-[5px] bg-white shrink-0 ${dataImportStep === 'complete' ? 'border-blue-600' : 'border-slate-300'}`} />
                          </div>
                          <div className="grid grid-cols-2 mt-2">
                            <div className="text-center">
                              <p className="text-sm font-bold text-blue-600">上传文件</p>
                              <p className="text-[11px] text-slate-400 mt-1">选择方式并上传模板文件</p>
                            </div>
                            <div className="text-center">
                              <p className={`text-sm font-bold ${dataImportStep === 'complete' ? 'text-blue-600' : 'text-slate-500'}`}>导入完成</p>
                              <p className="text-[11px] text-slate-400 mt-1">完成数据批量导入</p>
                            </div>
                          </div>
                        </div>

                        {dataImportStep === 'upload' ? (
                          <div className="space-y-5">
                            <section>
                              <div className="flex items-center justify-between mb-2.5">
                                <h4 className="text-xs font-black text-slate-700">导入方式</h4>
                                <span className="text-[10px] text-slate-400">请选择一项</span>
                              </div>
                              <div className="grid grid-cols-2 gap-3">
                                {[
                                  { mode: 'in-db' as const, icon: UserCheck, title: '已有患者追加数据', desc: '匹配已有患者，关联就诊并批量追加报告' },
                                  { mode: 'out-db' as const, icon: UserPlus, title: '新患者批量建档', desc: '一次完成患者建档、首次就诊和报告关联' }
                                ].map((item) => {
                                  const Icon = item.icon;
                                  const selected = importPatientMode === item.mode;
                                  return (
                                    <button
                                      key={item.mode}
                                      onClick={() => setImportPatientMode(item.mode)}
                                      aria-pressed={selected}
                                      className={`relative p-4 pr-10 text-left rounded-2xl border-2 transition-all cursor-pointer ${selected ? 'bg-blue-50/60 border-blue-500 shadow-sm' : 'bg-white border-slate-200 hover:border-blue-300'}`}
                                    >
                                      <span className={`absolute right-3.5 top-3.5 w-5 h-5 rounded-full border-2 flex items-center justify-center ${selected ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-300'}`}>
                                        {selected && <Check size={12} strokeWidth={3} />}
                                      </span>
                                      <div className="flex items-center gap-2 text-blue-600 font-black text-sm"><Icon size={17} /><span>{item.title}</span></div>
                                      <p className="text-[11px] text-slate-500 mt-2 leading-relaxed">{item.desc}</p>
                                    </button>
                                  );
                                })}
                              </div>
                            </section>

                            <section className="grid grid-cols-[1fr_auto] items-center gap-4 rounded-2xl border border-blue-100 bg-blue-50/60 px-4 py-3.5">
                              <div className="flex gap-2.5">
                                <CheckCircle2 size={17} className="text-blue-600 shrink-0 mt-0.5" />
                                <div>
                                  <h4 className="text-xs font-black text-slate-700">文件要求</h4>
                                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                                    {importPatientMode === 'in-db'
                                      ? '需包含患者编号或就诊流水号，以及需要追加的报告数据。支持 XLSX、CSV，文件不超过 50MB。'
                                      : '需包含患者身份信息、首次就诊信息和报告数据。导入前会检查重复患者；支持 XLSX、CSV，文件不超过 50MB。'}
                                  </p>
                                </div>
                              </div>
                              <button
                                onClick={() => setToastMessage(importPatientMode === 'out-db' ? '已下载《新患者批量建档模板.xlsx》' : '已下载《已有患者追加数据模板.xlsx》')}
                                className="text-xs text-blue-600 font-bold hover:underline cursor-pointer whitespace-nowrap"
                              >
                                下载模板
                              </button>
                            </section>

                            <button
                              onClick={() => {
                                setDataImportStep('importing');
                                setDataImportProgress(65);
                                window.setTimeout(() => {
                                  setDataImportProgress(100);
                                  setDataImportStep('complete');
                                }, 1200);
                              }}
                              className="w-full border-2 border-dashed border-blue-300 hover:border-blue-500 bg-blue-50/20 hover:bg-blue-50/50 rounded-2xl py-7 flex flex-col items-center justify-center transition-all cursor-pointer"
                            >
                              <Upload size={30} className="text-blue-600 mb-2" />
                              <span className="text-sm font-black text-slate-800">选择文件上传</span>
                              <span className="text-xs text-slate-400 mt-1">也可将文件拖拽至此区域</span>
                            </button>
                          </div>
                        ) : dataImportStep === 'importing' ? (
                          <div className="py-14 px-4">
                            <div className="w-full h-6 rounded-full bg-slate-200 overflow-hidden">
                              <motion.div initial={{ width: 0 }} animate={{ width: `${dataImportProgress}%` }} className="h-full bg-blue-600 rounded-full flex items-center justify-end pr-3 text-[10px] font-bold text-white">
                                {dataImportProgress}%
                              </motion.div>
                            </div>
                            <p className="text-center text-sm text-slate-500 mt-7">正在校验并导入数据，请勿关闭或刷新页面</p>
                            <div className="flex justify-center mt-10">
                              <button disabled className="px-8 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-400 bg-slate-50 cursor-not-allowed">下一步</button>
                            </div>
                          </div>
                        ) : (
                          <div className="py-10 text-center">
                            <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto"><CheckCircle2 size={30} /></div>
                            <h4 className="text-lg font-black text-slate-800 mt-4">数据导入完成</h4>
                            <p className="text-sm text-slate-500 mt-2">
                              {importPatientMode === 'out-db' ? '患者、首次就诊及报告数据已提交，等待系统清洗入库。' : '患者就诊及报告数据已提交，等待系统清洗入库。'}
                            </p>
                            <button
                              onClick={() => {
                                setShowDataImportModal(false);
                                setDataImportStep('upload');
                                setDataImportProgress(0);
                                setToastMessage('导入文件已提交，系统将自动完成数据清洗入库');
                              }}
                              className="mt-9 px-9 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl shadow-md shadow-blue-600/20 cursor-pointer"
                            >
                              完成
                            </button>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  </div>
                )}
</AnimatePresence>
            </div>
          );
        }

