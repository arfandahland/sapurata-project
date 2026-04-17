
import React, { useState, useMemo, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { GoogleGenAI } from "@google/genai";
import html2pdf from 'html2pdf.js';
import { 
  Crown, Hammer, Layout, PaintBucket, Zap, Plus, Trash2, Printer, 
  MessageCircle, Copy, Sparkles, ChevronRight, X, Download, 
  Home, User, Layers, Share2, ClipboardCheck, Edit3, Waves,
  ShieldCheck, Calculator, Calendar, Globe, MapPin, Phone,
  Wrench, Droplets, Lightbulb, Grid, Brush, Settings, Search,
  Menu, ChevronDown, CheckCircle2, Star, Info, FileText, Smartphone,
  HardHat, Construction, Trees, Sofa, Settings2
} from 'lucide-react';

// Initialize AI
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// --- LOGO URL ---
const SULTAN_LOGO = "https://bengkelsultan.com/wp-content/uploads/2023/10/logo-bengkel-sultan.png"; // Placeholder URL atau gunakan logo.png jika lokal

// --- FULL RESTORED & EXPANDED DATABASE (V10.2) ---
const DATABASE = {
  steel_works: {
    label: "Bengkel Las",
    icon: Wrench,
    items: [
      { id: 'sw1', name: 'Pagar Laser Cut (Plat 3mm + Hollow 4x4)', unit: 'm2', price: 1950000 },
      { id: 'sw2', name: 'Pagar Minimalis Hollow Galvalum', unit: 'm2', price: 750000 },
      { id: 'sw3', name: 'Kanopi Kaca Tempered 10mm', unit: 'm2', price: 1750000 },
      { id: 'sw4', name: 'Kanopi Alderon Double Layer', unit: 'm2', price: 950000 },
      { id: 'sw5', name: 'Railing Tangga Industrial Steel', unit: 'm1', price: 850000 },
      { id: 'sw6', name: 'Teralis Jendela Besi Nako', unit: 'titik', price: 450000 },
      { id: 'sw7', name: 'Pintu Lipat Toko (Folding Gate)', unit: 'm2', price: 1250000 },
      { id: 'sw8', name: 'Konstruksi Baja WF', unit: 'kg', price: 38000 },
      { id: 'sw9', name: 'Pintu Henderson Besi Premium', unit: 'm2', price: 2150000 },
      { id: 'sw10', name: 'Folding Door PVC Luxury', unit: 'm2', price: 1450000 },
      { id: 'sw11', name: 'Tangga Putar Besi Plat Border', unit: 'set', price: 9500000 },
      { id: 'sw12', name: 'Box Panel Listrik Custom Steel', unit: 'unit', price: 2500000 },
      { id: 'sw13', name: 'Grating Selokan Steel Heavy Duty', unit: 'm1', price: 750000 },
      { id: 'sw14', name: 'Rangka Baliho / Billboard', unit: 'm2', price: 1100000 },
      { id: 'sw15', name: 'Canopy Membrane Agtex 750gsm', unit: 'm2', price: 1350000 },
    ]
  },
  arsitektur: {
    label: "Sipil & Bangunan",
    icon: Construction,
    items: [
      { id: 'as1', name: 'Galian & Pondasi Batu Belah', unit: 'm3', price: 950000 },
      { id: 'as2', name: 'Pasangan Bata Ringan (Hebal) + Aci', unit: 'm2', price: 225000 },
      { id: 'as3', name: 'Sluf / Kolom Beton Bertulang', unit: 'm1', price: 285000 },
      { id: 'as4', name: 'Dak Beton Bondek M8', unit: 'm2', price: 685000 },
      { id: 'as5', name: 'Rangka Atap Baja Ringan Premium', unit: 'm2', price: 275000 },
      { id: 'as6', name: 'Pasang Genteng Metal Pasir', unit: 'm2', price: 125000 },
      { id: 'as7', name: 'Plester & Aci Dinding Halus', unit: 'm2', price: 85000 },
      { id: 'as8', name: 'Pekerjaan Sloof 15/20 Beton', unit: 'm1', price: 175000 },
      { id: 'as9', name: 'Pasang Dinding Batako Press', unit: 'm2', price: 145000 },
      { id: 'as10', name: 'Septic Tank Bio Tech Premium', unit: 'lot', price: 6500000 },
      { id: 'as11', name: 'Pasang Kusen Aluminium 4 Inch', unit: 'm1', price: 145000 },
      { id: 'as12', name: 'Pengecoran Deck Plat Beton t=12cm', unit: 'm3', price: 4200000 },
      { id: 'as13', name: 'Pasang Pintu Aluminium + Kaca', unit: 'unit', price: 2250000 },
    ]
  },
  finishing: {
    label: "Lantai & Dinding",
    icon: Grid,
    items: [
      { id: 'f1', name: 'Pasang Granit 60x60 Kualitas A', unit: 'm2', price: 285000 },
      { id: 'f2', name: 'Pasang Keramik Kamar Mandi', unit: 'm2', price: 195000 },
      { id: 'f3', name: 'Cat Dinding Jotun/Dulux Premium', unit: 'm2', price: 85000 },
      { id: 'f4', name: 'Batu Alam Andesit Bakar', unit: 'm2', price: 485000 },
      { id: 'f5', name: 'Lantai Vinyl / SPC 5mm', unit: 'm2', price: 325000 },
      { id: 'f6', name: 'Wallpaper Dinding Vinyl Emboss', unit: 'm2', price: 95000 },
      { id: 'f7', name: 'Pasang Mozaik Kitchen Backsplash', unit: 'm2', price: 450000 },
      { id: 'f8', name: 'Cat Plafon Emulsion Standard', unit: 'm2', price: 35000 },
      { id: 'f9', name: 'Polish Lantai Granit / Marmer', unit: 'm2', price: 65000 },
      { id: 'f10', name: 'Pasang Parquet Kayu Jati Solid', unit: 'm2', price: 1250000 },
      { id: 'f11', name: 'Plint Granit 10x60', unit: 'm1', price: 45000 },
      { id: 'f12', name: 'Wall Panel 3D PVC Mural', unit: 'm2', price: 350000 },
    ]
  },
  interior: {
    label: "Interior & Custom",
    icon: Layout,
    items: [
      { id: 'i1', name: 'Kitchen Set HPL High Gloss', unit: 'm1', price: 3250000 },
      { id: 'i2', name: 'Wardrobe / Lemari Pakaian Plafon', unit: 'm2', price: 2950000 },
      { id: 'i3', name: 'Backdrop TV WPC + Marble Sheet', unit: 'm2', price: 2650000 },
      { id: 'i4', name: 'Plafon PVC High End', unit: 'm2', price: 215000 },
      { id: 'i5', name: 'Partisi Ruangan Kisi-kisi Kayu', unit: 'm2', price: 2250000 },
      { id: 'i6', name: 'Meja Bar / Mini Island Marble', unit: 'm1', price: 4500000 },
      { id: 'i7', name: 'Plafon Gypsum Jayaboard + List', unit: 'm2', price: 145000 },
      { id: 'i8', name: 'Mirror Wall / Cermin Besar', unit: 'm2', price: 1250000 },
      { id: 'i9', name: 'Headboard Tempat Tidur Custom', unit: 'unit', price: 3500000 },
      { id: 'i10', name: 'Lemari Bawah Tangga Custom', unit: 'm2', price: 2450000 },
      { id: 'i11', name: 'Custom Vanity Kamar Mandi', unit: 'unit', price: 5500000 },
      { id: 'i12', name: 'Meja Kerja / Study Desk HPL', unit: 'm1', price: 1850000 },
    ]
  },
  exterior: {
    label: "Exterior & Taman",
    icon: Trees,
    items: [
      { id: 'ex1', name: 'Pasang Paving Block K-300', unit: 'm2', price: 185000 },
      { id: 'ex2', name: 'Pembuatan Taman Minimalis (Paket)', unit: 'lot', price: 5500000 },
      { id: 'ex3', name: 'Kolam Ikan Koi Minimalis', unit: 'm2', price: 3500000 },
      { id: 'ex4', name: 'Dinding Fasad Granite 60x120', unit: 'm2', price: 650000 },
      { id: 'ex5', name: 'Pasang Rumput Gajah Mini / Jepang', unit: 'm2', price: 65000 },
      { id: 'ex6', name: 'Instalasi Vertical Garden', unit: 'm2', price: 1750000 },
      { id: 'ex7', name: 'Lampu Taman Tenaga Surya', unit: 'titik', price: 450000 },
      { id: 'ex8', name: 'Decking WPC Kolam Renang', unit: 'm2', price: 850000 },
      { id: 'ex9', name: 'Pasang Batu Sikat Carport', unit: 'm2', price: 350000 },
      { id: 'ex10', name: 'Water Wall Waterfall Custom', unit: 'lot', price: 12500000 },
    ]
  },
  furniture: {
    label: "Furniture & Sofa",
    icon: Sofa,
    items: [
      { id: 'fur1', name: 'Sofa Custom L-Shape Premium', unit: 'set', price: 12500000 },
      { id: 'fur2', name: 'Meja Makan Kayu Jati Solid', unit: 'set', price: 8500000 },
      { id: 'fur3', name: 'Tempat Tidur / Divan Cushion', unit: 'unit', price: 4500000 },
      { id: 'fur4', name: 'Kursi Kerja Ergonomis Leather', unit: 'unit', price: 3250000 },
      { id: 'fur5', name: 'Meja Console Luxury Gold', unit: 'unit', price: 5500000 },
      { id: 'fur6', name: 'Rak Buku Industrial Minimalis', unit: 'unit', price: 2750000 },
      { id: 'fur7', name: 'Buffet TV Klasik Modern', unit: 'unit', price: 4850000 },
      { id: 'fur8', name: 'Sofa 3 Seater Velvet Blue', unit: 'unit', price: 7500000 },
      { id: 'fur9', name: 'Set Meja Teras Rattan Sintetis', unit: 'set', price: 3500000 },
      { id: 'fur10', name: 'Coffee Table Marble / Tempered', unit: 'unit', price: 2250000 },
    ]
  },
  mep: {
    label: "Listrik & Air",
    icon: Zap,
    items: [
      { id: 'm1', name: 'Titik Lampu & Saklar (Standard)', unit: 'titik', price: 195000 },
      { id: 'm2', name: 'Instalasi Pipa Air Bersih PPR', unit: 'm1', price: 95000 },
      { id: 'm3', name: 'Pemasangan Toilet / Sanitari', unit: 'unit', price: 750000 },
      { id: 'm4', name: 'Panel Listrik 4 Group', unit: 'lot', price: 1250000 },
      { id: 'm5', name: 'Pasang Tandon Air 1000L + Tower', unit: 'lot', price: 3500000 },
      { id: 'm6', name: 'Instalasi Water Heater Listrik', unit: 'unit', price: 1250000 },
      { id: 'm7', name: 'Pasang Pompa Air Otomatis', unit: 'unit', price: 1850000 },
      { id: 'm8', name: 'Instalasi Listrik Power AC', unit: 'titik', price: 350000 },
      { id: 'm9', name: 'Pasang CCTV 4 Kamera (Paket)', unit: 'lot', price: 4500000 },
      { id: 'm10', name: 'Grounding Listrik Penangkal Petir', unit: 'lot', price: 2500000 },
    ]
  },
  service: {
    label: "Servis & Perbaikan",
    icon: Settings2,
    items: [
      { id: 'srv1', name: 'Servis Kebocoran Atap / Dak', unit: 'lot', price: 1500000 },
      { id: 'srv2', name: 'Pengecatan Ulang Pagar/Gerbang', unit: 'm2', price: 125000 },
      { id: 'srv3', name: 'Bongkar Pasang Keramik', unit: 'm2', price: 155000 },
      { id: 'srv4', name: 'Pembersihan Kaca Gedung (m2)', unit: 'm2', price: 45000 },
      { id: 'srv5', name: 'Restorasi Kayu Kusen / Furniture', unit: 'lot', price: 2500000 },
      { id: 'srv6', name: 'Servis Pintu Macet / Engsel', unit: 'unit', price: 350000 },
      { id: 'srv7', name: 'Bongkar Plafon / Partisi', unit: 'm2', price: 55000 },
      { id: 'srv8', name: 'Relokasi Outdoor AC', unit: 'unit', price: 450000 },
      { id: 'srv9', name: 'Kuras Toren Air / Ground Tank', unit: 'unit', price: 250000 },
      { id: 'srv10', name: 'Anti Rayap (Suntik/Semprot)', unit: 'm2', price: 35000 },
    ]
  }
};

const App = () => {
  const [view, setView] = useState('estimator'); 
  const [category, setCategory] = useState('steel_works');
  const [catalog, setCatalog] = useState(() => {
    const saved = localStorage.getItem('sultan_v10_catalog');
    return saved ? JSON.parse(saved) : DATABASE;
  });
  const [cart, setCart] = useState<any[]>(() => {
    const saved = localStorage.getItem('sultan_v10_cart');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [inputVals, setInputVals] = useState({ p: '', l: '', qty: '1', price: '', discount: '0' });
  const [isManual, setIsManual] = useState(false);
  const [manualName, setManualName] = useState('');
  const [manualUnit, setManualUnit] = useState('unit');
  const [form, setForm] = useState({ id: '', grade: 'premium' });
  const [newItem, setNewItem] = useState({ name: '', price: '', unit: 'm2' });
  
  const [client, setClient] = useState(() => {
    const saved = localStorage.getItem('sultan_v10_client');
    return saved ? JSON.parse(saved) : { 
      name: '', address: '', project: 'Proyek Baru Sultan', phone: '6285242087934' 
    };
  });

  const [loading, setLoading] = useState(false);
  const [aiVisual, setAiVisual] = useState<string | null>(null);
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiQuoteText, setAiQuoteText] = useState('');

  // --- 10 NEW FEATURED TRAITS STATE ---
  const [taxEnabled, setTaxEnabled] = useState(false);
  const [timelineDays, setTimelineDays] = useState(0);
  const [bankInfo, setBankInfo] = useState({ bank: 'Bank BCA', account: '123-456-7890', owner: 'PT. SULTAN ARSITEK MAKASSAR' });
  const [companyInfo, setCompanyInfo] = useState({ name: 'BENGKEL SULTAN', ig: '@bengkelsultan', email: 'official@bengkelsultan.com' });
  const [expiryDate, setExpiryDate] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate() + 14);
    return date.toISOString().split('T')[0];
  });
  const [projectLocation, setProjectLocation] = useState('');
  const [fixedDiscount, setFixedDiscount] = useState(0);
  const [maintenanceNotes, setMaintenanceNotes] = useState(true);
  const [showSignature, setShowSignature] = useState(true);
  const [priorityOrder, setPriorityOrder] = useState('Standard');

  // Share logic
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sharedData = params.get('q');
    if (sharedData) {
      try {
        const decoded = JSON.parse(atob(sharedData));
        if (decoded.cart) setCart(decoded.cart);
        if (decoded.client) setClient(decoded.client);
        setView('quote');
        // Clean URL to prevent re-loading on refresh if user wants to edit
        window.history.replaceState({}, document.title, "/");
      } catch (e) {
        console.error("Failed to decode share link", e);
      }
    }
  }, []);

  useEffect(() => { localStorage.setItem('sultan_v10_cart', JSON.stringify(cart)); }, [cart]);
  useEffect(() => { localStorage.setItem('sultan_v10_client', JSON.stringify(client)); }, [client]);
  useEffect(() => { localStorage.setItem('sultan_v10_catalog', JSON.stringify(catalog)); }, [catalog]);

  const config = { margin: 15, mobilisasi: 500000 };
  const totals = useMemo(() => {
    const sub = cart.reduce((acc, curr) => acc + curr.total, 0);
    const afterFixedDisc = sub - fixedDiscount;
    const marginAmount = afterFixedDisc * (config.margin / 100);
    const taxAmount = taxEnabled ? (afterFixedDisc + marginAmount) * 0.11 : 0;
    const grand = afterFixedDisc + marginAmount + (cart.length > 0 ? config.mobilisasi : 0) + taxAmount;
    
    // Auto-calculate dynamic timeline
    const estimatedDays = Math.max(7, Math.ceil(grand / 2000000));
    setTimelineDays(estimatedDays);

    return { sub, marginAmount, taxAmount, grand };
  }, [cart, taxEnabled, fixedDiscount]);

  const schedule = useMemo(() => {
    const total = totals.grand;
    return [
      { label: "DP (Uang Muka) - 40%", val: total * 0.4 },
      { label: "Termin 1 (Progres 50%) - 30%", val: total * 0.3 },
      { label: "Termin 2 (Progres 90%) - 25%", val: total * 0.25 },
      { label: "Pelunasan / Retensi - 5%", val: total * 0.05 },
    ];
  }, [totals.grand]);

  const handleInputChange = (field: string, val: string) => {
    if (val === '' || /^\d*\.?\d*$/.test(val)) {
      setInputVals(prev => ({ ...prev, [field]: val }));
    }
  };

  const addItem = () => {
    let newItem;
    const p = parseFloat(inputVals.p) || 0;
    const l = parseFloat(inputVals.l) || 0;
    const qty = parseFloat(inputVals.qty) || 1;
    const customPrice = parseFloat(inputVals.price) || 0;
    const discountPercent = parseFloat(inputVals.discount) || 0;

    if (isManual) {
      if (!manualName || customPrice <= 0) return;
      const baseTotal = customPrice * qty;
      const discAmt = baseTotal * (discountPercent / 100);
      newItem = { 
        id: 'manual-' + Date.now(), 
        name: manualName, 
        unit: manualUnit, 
        price: customPrice,
        volume: qty,
        total: baseTotal - discAmt,
        discount: discAmt,
        discountPercent,
        grade: 'Custom',
        uid: Date.now()
      };
    } else {
      const item = (catalog as any)[category].items.find((i: any) => i.id === form.id);
      if (!item) return;

      let volume = 1;
      if (item.unit === 'm2') volume = p * l;
      else if (item.unit === 'm1') volume = p;
      else volume = qty;

      const gradeMult = form.grade === 'luxury' ? 1.5 : form.grade === 'premium' ? 1.2 : 1;
      const baseItemPrice = item.price * gradeMult;
      const baseTotal = baseItemPrice * volume;
      const discAmt = baseTotal * (discountPercent / 100);
      
      const total = Math.round(baseTotal - discAmt);
      newItem = { ...item, price: baseItemPrice, volume, total, discount: discAmt, discountPercent, grade: form.grade, uid: Date.now() };
    }

    setCart([...cart, newItem]);
    setInputVals({ p: '', l: '', qty: '1', price: '', discount: '0' });
    setForm({ ...form, id: '' });
    setManualName('');
    if (window.navigator.vibrate) window.navigator.vibrate(50);
  };

  const formatIDR = (val: number) => new Intl.NumberFormat('id-ID', { 
    style: 'currency', currency: 'IDR', maximumFractionDigits: 0 
  }).format(val);

  const getWASummary = () => {
    let text = `👑 *BENGKEL SULTAN MAKASSAR* 👑\n`;
    text += `_Estimasi Penawaran Premium_\n`;
    text += `----------------------------------------------\n`;
    text += `👤 *Klien:* ${client.name || '-'}\n`;
    text += `🏗️ *Proyek:* ${client.project || '-'}\n`;
    text += `----------------------------------------------\n\n`;
    cart.forEach((item, i) => {
      text += `${i+1}️⃣ *${item.name.toUpperCase()}*\n`;
      text += `   📐 Vol: ${item.volume.toFixed(1)} ${item.unit} | Spec: ${item.grade.toUpperCase()}\n`;
      if (item.discount > 0) {
        text += `   🏷️ Diskon: ${item.discountPercent}% (-${formatIDR(item.discount)})\n`;
      }
      text += `   💰 Total: ${formatIDR(item.total)}\n\n`;
    });
    text += `----------------------------------------------\n`;
    text += `🏆 *GRAND TOTAL: ${formatIDR(totals.grand)}*\n`;
    text += `\n📅 *PEMBAYARAN:* \n`;
    schedule.forEach(s => text += `• ${s.label}: ${formatIDR(s.val)}\n`);
    text += `\n🌐 *Website:* bengkelsultan.com\n`;
    text += `✅ _Harap konfirmasi untuk penjadwalan survey._`;
    return text;
  };

  const copyToWA = () => {
    const summary = getWASummary();
    const url = `https://wa.me/${client.phone}?text=${encodeURIComponent(summary)}`;
    window.open(url, '_blank');
  };

  const exportToPDF = () => {
    const element = document.getElementById('official-quote');
    if (!element) return;
    
    const opt = {
      margin: 10,
      filename: `Sultan-Quote-${client.name || 'Client'}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { 
        scale: 2, 
        useCORS: true, 
        letterRendering: true,
        backgroundColor: '#ffffff'
      },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    
    // @ts-ignore
    html2pdf().set(opt).from(element).save();
  };

  const generateShareLink = () => {
    const data = btoa(JSON.stringify({ cart, client }));
    const url = `${window.location.origin}/?q=${data}`;
    navigator.clipboard.writeText(url);
    alert('Link Penawaran Sultan berhasil disalin! Kirimkan link ini ke Customer.');
  };

  const addCatalogItem = (catKey: string) => {
    if (!newItem.name || !newItem.price) return;
    const newEntry = {
      id: `${catKey}-${Date.now()}`,
      name: newItem.name,
      unit: newItem.unit,
      price: parseFloat(newItem.price)
    };
    
    const updatedCatalog = { ...catalog };
    (updatedCatalog as any)[catKey].items.push(newEntry);
    setCatalog(updatedCatalog);
    setNewItem({ name: '', price: '', unit: 'm2' });
  };

  const deleteCatalogItem = (catKey: string, itemId: string) => {
    if (!confirm('Hapus item ini dari katalog?')) return;
    const updatedCatalog = { ...catalog };
    (updatedCatalog as any)[catKey].items = (updatedCatalog as any)[catKey].items.filter((i: any) => i.id !== itemId);
    setCatalog(updatedCatalog);
  };

  const polishAI = async () => {
    if (cart.length === 0) return;
    setLoading(true);
    try {
      const prompt = `Buat pembukaan penawaran mewah untuk klien ${client.name} yang memesan ${client.project} di Bengkel Sultan Makassar. Tekankan kualitas premium dan pengalaman kami. Gunakan bahasa Indonesia yang sopan dan meyakinkan.`;
      const response = await ai.models.generateContent({ model: 'gemini-3-flash-preview', contents: prompt });
      setAiQuoteText(response.text || '');
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#020617] text-slate-100 overflow-x-hidden selection:bg-amber-500 selection:text-slate-950">
      
      {/* HEADER SECTION - Integrating Official Logo */}
      <header className="h-24 glass sticky top-0 z-[100] px-4 md:px-12 flex items-center justify-between border-b border-white/5 no-print shadow-2xl">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white p-1 rounded-full flex items-center justify-center shadow-xl border-2 border-amber-500 overflow-hidden group active:scale-95 transition-all">
             {/* Logo resmi Bengkel Sultan */}
             <img src="https://lh3.googleusercontent.com/d/1Xl2fI5b-7_95vWqYt-DkFm_Q-Xz6_5vI" alt="Logo Bengkel Sultan" className="w-full h-full object-contain group-hover:scale-110 transition-transform" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-lg md:text-2xl font-black gold-text uppercase leading-none tracking-tighter">BENGKEL SULTAN</h1>
            <p className="text-[8px] md:text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em] mt-1 italic">MAKASSAR PRIDE • LEGACY V10.2</p>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-6">
           <div className="flex flex-col items-end">
              <span className="text-[9px] font-black text-amber-500 uppercase tracking-widest">OFFICIAL WEB</span>
              <span className="text-xs font-bold text-slate-300">bengkelsultan.com</span>
           </div>
           <div className="w-px h-10 bg-white/10 mx-2"></div>
           <button onClick={() => setView('settings')} className={`p-3 rounded-xl transition-all ${view === 'settings' ? 'bg-amber-500 text-slate-950' : 'bg-white/5 text-amber-500 hover:bg-white/10'}`}>
              <Settings2 className="w-5 h-5" />
           </button>
        </div>
        <div className="md:hidden">
           <button onClick={() => setView('quote')} className="p-3 bg-amber-500 text-slate-950 rounded-2xl shadow-lg active:scale-90 transition-transform">
              <FileText className="w-6 h-6" />
           </button>
        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 pb-24 md:pb-0 overflow-y-auto custom-scrollbar bg-grid-pattern">
        
        {/* ESTIMATOR VIEW */}
        {view === 'estimator' && (
          <div className="p-4 md:p-12 max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
            
            {/* Identity Card */}
            <section className="glass p-8 rounded-[2.5rem] border border-white/10 space-y-6 shadow-xl">
               <h3 className="text-[11px] font-black text-amber-500 uppercase tracking-[0.4em] flex items-center gap-3 italic">
                 <User className="w-5 h-5" /> DATA PELANGGAN PRIORITAS
               </h3>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="space-y-2">
                    <label className="text-[9px] font-black text-slate-500 uppercase ml-2">NAMA KLIEN</label>
                    <input className="w-full bg-slate-950/50 border border-white/5 rounded-2xl p-5 text-sm font-bold focus:border-amber-500 transition-all shadow-inner" placeholder="..." value={client.name} onChange={e => setClient({...client, name: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-black text-slate-500 uppercase ml-2">DATA WHATSAPP</label>
                    <input className="w-full bg-slate-950/50 border border-white/5 rounded-2xl p-5 text-sm font-bold focus:border-amber-500 transition-all shadow-inner" placeholder="08..." value={client.phone} onChange={e => setClient({...client, phone: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-black text-slate-500 uppercase ml-2">NAMA PROYEK</label>
                    <input className="w-full bg-slate-950/50 border border-white/5 rounded-2xl p-5 text-sm font-bold focus:border-amber-500 transition-all shadow-inner" placeholder="..." value={client.project} onChange={e => setClient({...client, project: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-black text-amber-500 uppercase ml-2 flex items-center gap-2"><MapPin className="w-3 h-3"/> LOKASI PENGERJAAN</label>
                    <input className="w-full bg-slate-950/50 border border-white/5 rounded-2xl p-5 text-sm font-bold focus:border-amber-500 transition-all shadow-inner italic" placeholder="Contoh: Jl. Sultan Alauddin No. 1" value={projectLocation} onChange={e => setProjectLocation(e.target.value)} />
                  </div>
               </div>
            </section>

            {/* Category Selector Cards */}
            <section className="space-y-4">
              <h3 className="text-[11px] font-black text-slate-500 uppercase tracking-[0.4em] flex items-center gap-3 italic">
                <Layers className="w-5 h-5" /> KATALOG LAYANAN BENGKEL SULTAN
              </h3>
              <div className="flex overflow-x-auto gap-4 pb-6 no-scrollbar snap-x">
                {Object.entries(catalog).map(([key, val]) => (
                  <button 
                    key={key} 
                    onClick={() => { setCategory(key); setIsManual(false); }} 
                    className={`flex-shrink-0 px-8 py-5 rounded-[2rem] border-2 flex flex-col items-center gap-4 transition-all snap-start w-36 h-36 justify-center ${category === key && !isManual ? 'bg-amber-500 border-amber-500 text-slate-950 shadow-[0_20px_40px_rgba(212,175,55,0.3)] scale-105' : 'bg-slate-900 border-white/5 text-slate-500 hover:border-white/20'}`}
                  >
                    {React.createElement((DATABASE as any)[key].icon, { 
                      className: `w-10 h-10 ${category === key && !isManual ? 'text-slate-950' : 'text-amber-500'}` 
                    })}
                    <span className="text-[10px] font-black uppercase text-center leading-tight tracking-tighter">{val.label}</span>
                  </button>
                ))}
                <button onClick={() => setIsManual(true)} className={`flex-shrink-0 px-8 py-5 rounded-[2rem] border-2 flex flex-col items-center gap-4 transition-all snap-start w-36 h-36 justify-center ${isManual ? 'bg-emerald-600 border-emerald-600 text-white shadow-[0_20px_40px_rgba(16,185,129,0.3)] scale-105' : 'bg-slate-900 border-white/5 text-slate-500 hover:border-white/20'}`}>
                  <Edit3 className={`w-10 h-10 ${isManual ? 'text-white' : 'text-emerald-500'}`} />
                  <span className="text-[10px] font-black uppercase text-center leading-tight tracking-tighter">Manual Input</span>
                </button>
              </div>
            </section>

            {/* Main Calculator Logic */}
            <section className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-32 md:pb-0">
              <div className="md:col-span-7 glass p-10 rounded-[3rem] border border-white/10 space-y-8 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-80 h-80 gold-gradient opacity-5 rounded-full blur-[100px] pointer-events-none"></div>
                
                <div className="flex justify-between items-center mb-4">
                   <h2 className="text-3xl font-black italic gold-text tracking-tighter uppercase leading-none">
                     {isManual ? 'SULTAN CUSTOM' : DATABASE[category as keyof typeof DATABASE].label.toUpperCase()}
                   </h2>
                   <div className="p-4 bg-slate-950 rounded-2xl border border-white/10 shadow-xl">
                      {isManual ? <Edit3 className="w-7 h-7 text-emerald-500" /> : React.createElement(DATABASE[category as keyof typeof DATABASE].icon, { className: "w-7 h-7 text-amber-500" })}
                   </div>
                </div>
                
                {isManual ? (
                  <div className="space-y-6 animate-in slide-in-from-left-6 duration-400">
                     <div className="space-y-2">
                        <label className="text-[9px] font-black text-slate-500 uppercase ml-2 tracking-widest">DESKRIPSI PEKERJAAN</label>
                        <input className="w-full bg-slate-950/80 border border-white/5 rounded-2xl p-6 text-sm font-bold outline-none focus:border-emerald-500 transition-all shadow-inner" placeholder="Contoh: Pengecatan Ulang Pagar..." value={manualName} onChange={e => setManualName(e.target.value)} />
                     </div>
                     <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                           <label className="text-[9px] font-black text-slate-500 uppercase ml-2 tracking-widest">HARGA SATUAN (RP)</label>
                           <input type="number" className="w-full bg-slate-950/80 border border-white/5 rounded-2xl p-6 text-sm font-bold outline-none focus:border-emerald-500" value={inputVals.price} onChange={e => handleInputChange('price', e.target.value)} />
                        </div>
                        <div className="space-y-2">
                           <label className="text-[9px] font-black text-slate-500 uppercase ml-2 tracking-widest">UNIT (m2, m1, set)</label>
                           <input className="w-full bg-slate-950/80 border border-white/5 rounded-2xl p-6 text-sm font-bold outline-none focus:border-emerald-500" value={manualUnit} onChange={e => setManualUnit(e.target.value)} />
                        </div>
                     </div>
                  </div>
                ) : (
                  <div className="space-y-8 animate-in slide-in-from-left-6 duration-400">
                    <div className="space-y-2">
                      <label className="text-[9px] font-black text-slate-500 uppercase ml-2 tracking-widest">PILIH ITEM DARI KATALOG</label>
                      <div className="relative">
                        <select className="w-full bg-slate-950/80 border border-white/10 rounded-[2rem] p-6 text-base font-black focus:border-amber-500 outline-none appearance-none cursor-pointer shadow-inner pr-16" value={form.id} onChange={e => setForm({...form, id: e.target.value})}>
                          <option value="">-- Pilih Item Pekerjaan --</option>
                          {(DATABASE as any)[category].items.map((i: any) => (
                            <option key={i.id} value={i.id}>{i.name} (@ {formatIDR(i.price)}/{i.unit})</option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-6 top-6 w-6 h-6 text-amber-500 pointer-events-none" />
                      </div>
                    </div>
                    <div className="space-y-3">
                       <label className="text-[9px] font-black text-slate-500 uppercase ml-2 tracking-widest">PILIH GRADE SPESIFIKASI</label>
                       <div className="grid grid-cols-3 gap-3">
                          {['standard', 'premium', 'luxury'].map(g => (
                            <button key={g} onClick={() => setForm({...form, grade: g})} className={`py-5 rounded-2xl text-[10px] font-black uppercase border-2 transition-all ${form.grade === g ? 'bg-amber-500 border-amber-500 text-slate-950 shadow-xl shadow-amber-500/30 scale-105' : 'bg-slate-950 border-white/5 text-slate-500 hover:border-white/20'}`}>{g}</button>
                          ))}
                       </div>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-6">
                   <div className="space-y-2">
                      <label className="text-[9px] font-black text-slate-500 uppercase ml-2 tracking-widest">PANJANG (METER)</label>
                      <input type="number" placeholder="0" className="w-full bg-slate-950/80 border border-white/5 rounded-2xl p-6 text-xl font-black focus:border-amber-500 outline-none transition-all shadow-inner" value={inputVals.p} onChange={e => handleInputChange('p', e.target.value)} />
                   </div>
                   <div className="space-y-2">
                      <label className="text-[9px] font-black text-slate-500 uppercase ml-2 tracking-widest">LEBAR (METER)</label>
                      <input type="number" placeholder="0" className="w-full bg-slate-950/80 border border-white/5 rounded-2xl p-6 text-xl font-black focus:border-amber-500 outline-none transition-all shadow-inner" value={inputVals.l} onChange={e => handleInputChange('l', e.target.value)} />
                   </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                   <div className="space-y-2">
                      <label className="text-[9px] font-black text-slate-500 uppercase ml-2 tracking-widest">JUMLAH VOLUME</label>
                      <input type="number" placeholder="1" className="w-full bg-slate-950/80 border border-white/5 rounded-2xl p-6 text-xl font-black focus:border-amber-500 outline-none transition-all shadow-inner" value={inputVals.qty} onChange={e => handleInputChange('qty', e.target.value)} />
                   </div>
                   <div className="space-y-2 relative">
                      <label className="text-[9px] font-black text-emerald-500 uppercase ml-2 tracking-widest">DISKON KHUSUS (%)</label>
                      <input type="number" placeholder="0" className="w-full bg-slate-950/80 border border-white/5 rounded-2xl p-6 text-xl font-black focus:border-emerald-500 outline-none transition-all shadow-inner text-emerald-500" value={inputVals.discount} onChange={e => handleInputChange('discount', e.target.value)} />
                      <div className="absolute right-6 top-12 md:top-14 text-emerald-500 font-black">%</div>
                   </div>
                </div>

                <button onClick={addItem} className={`w-full h-24 rounded-[2rem] font-black text-base transition-all flex items-center justify-center gap-4 active:scale-95 shadow-2xl group ${isManual ? 'bg-emerald-600 text-white shadow-emerald-500/30' : 'gold-gradient text-slate-950 shadow-amber-500/40'}`}>
                  <Plus className="w-8 h-8 group-hover:rotate-90 transition-transform" /> MASUKKAN KE DAFTAR PEKERJAAN
                </button>
              </div>

              {/* Quick Summary Card */}
              <div className="md:col-span-5 space-y-8">
                <div className="glass p-10 rounded-[3rem] border border-white/10 shadow-2xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-48 h-48 gold-gradient opacity-10 rounded-full blur-[100px] -mr-24 -mt-24 group-hover:scale-125 transition-transform duration-1000"></div>
                  <h3 className="text-[11px] font-black text-amber-500 uppercase tracking-[0.5em] mb-10 italic flex items-center gap-3">
                    <Calculator className="w-5 h-5" /> REKAPITULASI INVESTASI
                  </h3>
                  <div className="space-y-6">
                     <div className="flex justify-between items-center text-xs font-bold text-slate-400">
                        <span className="uppercase tracking-widest">JASA & MATERIAL</span>
                        <span className="text-white font-black text-lg">{formatIDR(totals.sub)}</span>
                     </div>
                     <div className="flex justify-between items-center text-xs font-bold text-slate-400">
                        <span className="uppercase tracking-widest">BIAYA MANAGEMENT</span>
                        <span className="text-white font-black text-lg">{formatIDR(totals.marginAmount + config.mobilisasi)}</span>
                     </div>
                     <div className="h-px bg-white/10 my-6"></div>
                     <div className="flex flex-col gap-2">
                        <span className="text-[11px] font-black gold-text uppercase italic tracking-[0.6em]">TOTAL ESTIMASI SULTAN</span>
                        <span className="text-5xl font-black gold-text tracking-tighter leading-none italic">{formatIDR(totals.grand)}</span>
                     </div>
                  </div>
                </div>

                {cart.length > 0 && (
                   <div className="bg-slate-900/50 rounded-[2.5rem] p-8 border border-white/5 space-y-6 shadow-inner backdrop-blur-2xl animate-in slide-in-from-top-6 duration-500">
                      {/* SULTAN PRO SETTINGS - 10 PREMIUM FEATURES */}
                    <div className="bg-slate-950/80 p-10 rounded-[3rem] border border-white/10 space-y-12 shadow-2xl relative overflow-hidden">
                       <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 blur-[80px] rounded-full -mr-32 -mt-32"></div>
                       <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-6 border-b border-white/5">
                          <div className="space-y-2">
                             <h3 className="text-3xl font-black text-white italic tracking-tighter uppercase leading-none">SULTAN PRO SETTINGS</h3>
                             <p className="text-[9px] font-black text-amber-500 uppercase tracking-[0.4em] italic">V10.2 EXCLUSIVE MANAGEMENT CONSOLE</p>
                          </div>
                          <div className="flex gap-4">
                             <button onClick={() => setTaxEnabled(!taxEnabled)} className={`px-6 py-3 rounded-xl font-black text-[9px] uppercase tracking-widest border transition-all flex items-center gap-3 ${taxEnabled ? 'bg-amber-500 text-slate-950 border-amber-500':'bg-transparent border-white/10 text-white/40'}`}>
                                PPN 11% {taxEnabled ? <CheckCircle2 className="w-4 h-4"/> : <X className="w-4 h-4"/>}
                             </button>
                             <button onClick={() => setShowSignature(!showSignature)} className={`px-6 py-3 rounded-xl font-black text-[9px] uppercase tracking-widest border transition-all flex items-center gap-3 ${showSignature ? 'bg-amber-500 text-slate-950 border-amber-500':'bg-transparent border-white/10 text-white/40'}`}>
                                SIGNATURE {showSignature ? <CheckCircle2 className="w-4 h-4"/> : <X className="w-4 h-4"/>}
                             </button>
                          </div>
                       </div>

                       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                          <div className="space-y-4 p-6 bg-black/40 rounded-2xl border border-white/5">
                             <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest">BRANDING: COMPANY NAME</label>
                             <input className="w-full bg-slate-900 border border-white/5 p-4 rounded-xl text-white font-black text-xs italic tracking-widest" value={companyInfo.name} onChange={e => setCompanyInfo({...companyInfo, name: e.target.value})} />
                          </div>
                          <div className="space-y-4 p-6 bg-black/40 rounded-2xl border border-white/5">
                             <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest">BRANDING: INSTAGRAM</label>
                             <input className="w-full bg-slate-900 border border-white/5 p-4 rounded-xl text-amber-500 font-black text-xs italic tracking-widest" value={companyInfo.ig} onChange={e => setCompanyInfo({...companyInfo, ig: e.target.value})} />
                          </div>
                          <div className="space-y-4 p-6 bg-black/40 rounded-2xl border border-white/5">
                             <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest">FINANCE: FIXED DISCOUNT (IDR)</label>
                             <input className="w-full bg-slate-900 border border-white/5 p-4 rounded-xl text-emerald-500 font-black text-xs italic tracking-widest" type="number" value={fixedDiscount} onChange={e => setFixedDiscount(Number(e.target.value))} />
                          </div>
                          <div className="space-y-4 p-6 bg-black/40 rounded-2xl border border-white/5">
                             <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest">FINANCE: ACCOUNT NUMBER</label>
                             <input className="w-full bg-slate-900 border border-white/5 p-4 rounded-xl text-white font-black text-xs italic tracking-widest" value={bankInfo.account} onChange={e => setBankInfo({...bankInfo, account: e.target.value})} />
                          </div>
                          <div className="space-y-4 p-6 bg-black/40 rounded-2xl border border-white/5">
                             <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest">FINANCE: BANK NAME</label>
                             <input className="w-full bg-slate-900 border border-white/5 p-4 rounded-xl text-white font-black text-xs italic tracking-widest uppercase" value={bankInfo.bank} onChange={e => setBankInfo({...bankInfo, bank: e.target.value})} />
                          </div>
                          <div className="space-y-4 p-6 bg-black/40 rounded-2xl border border-white/5">
                             <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest">PROJECT: PRIORITY LEVEL</label>
                             <select className="w-full bg-slate-900 border border-white/5 p-4 rounded-xl text-white font-black text-xs italic uppercase outline-none" value={priorityOrder} onChange={e => setPriorityOrder(e.target.value)}>
                                <option value="Standard">STANDARD (7-14 DAYS)</option>
                                <option value="Express">EXPRESS (+25% SPEED)</option>
                                <option value="Urgent">URGENT (TOP PRIORITY)</option>
                             </select>
                          </div>
                       </div>
                    </div>

                    <div className="flex justify-between items-center">
                         <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] flex items-center gap-3 italic">
                            <Layers className="w-4 h-4" /> ITEM RINCIAN ({cart.length})
                         </h4>
                         <button onClick={() => setCart([])} className="p-3 bg-red-500/10 text-red-500 rounded-xl active:scale-90 transition-transform border border-red-500/20"><Trash2 className="w-5 h-5" /></button>
                      </div>
                      <div className="space-y-4 max-h-[450px] overflow-y-auto custom-scrollbar pr-3">
                         {cart.map((item) => (
                            <div key={item.uid} className="bg-slate-950/80 p-5 rounded-3xl border border-white/5 flex justify-between items-center group hover:border-amber-500/50 transition-all shadow-lg">
                               <div className="space-y-1">
                                  <p className="text-xs font-black text-white uppercase group-hover:text-amber-500 transition-colors tracking-tight">{item.name}</p>
                                  <div className="flex items-center gap-3">
                                    <span className="text-[9px] px-2 py-0.5 rounded-lg bg-amber-500/10 text-amber-500 font-black uppercase tracking-widest">GRADE {item.grade.toUpperCase()}</span>
                                    <span className="text-[9px] text-slate-600 font-black uppercase tracking-tighter">{item.volume.toFixed(1)} {item.unit}</span>
                                    {item.discount > 0 && <span className="text-[9px] text-emerald-500 font-black uppercase tracking-tighter">DISC {item.discountPercent}%</span>}
                                  </div>
                               </div>
                               <div className="flex items-center gap-4">
                                  <span className="text-sm font-black text-white italic tracking-tighter">{formatIDR(item.total)}</span>
                                  <button onClick={() => setCart(cart.filter(c => c.uid !== item.uid))} className="text-slate-700 hover:text-red-500 active:scale-75 transition-all p-1"><X className="w-5 h-5" /></button>
                               </div>
                            </div>
                         ))}
                      </div>
                      <button onClick={copyToWA} className="w-full h-16 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl text-[11px] font-black uppercase flex items-center justify-center gap-4 shadow-[0_15px_30px_rgba(16,185,129,0.3)] active:scale-95 transition-all tracking-widest">
                        <MessageCircle className="w-6 h-6" /> KIRIM RINCIAN KE WA ADMIN
                      </button>
                   </div>
                )}
              </div>
            </section>
          </div>
        )}

        {/* AI STUDIO VIEW */}
        {view === 'ai' && (
          <div className="p-4 md:p-12 max-w-4xl mx-auto space-y-12 animate-in zoom-in duration-500 pb-32">
             <div className="text-center space-y-6">
                <div className="inline-flex items-center gap-3 px-6 py-2.5 bg-blue-500/10 border border-blue-500/20 rounded-full text-[10px] font-black text-blue-500 uppercase tracking-widest shadow-lg"><Sparkles className="w-4 h-4" /> BENGKEL SULTAN AI ENGINE</div>
                <h2 className="text-5xl md:text-8xl font-black gold-text italic tracking-tighter uppercase leading-[0.8] mb-4">IMAGINE <br/><span className="text-white">YOUR DESIGN</span></h2>
                <p className="text-slate-500 text-xs font-black uppercase tracking-[0.4em] leading-loose max-w-lg mx-auto italic">Visualisasikan konsep besi dan arsitektur premium anda secara instan dengan kecerdasan buatan.</p>
             </div>
             <div className="glass p-12 rounded-[4rem] border border-white/10 space-y-10 shadow-2xl relative overflow-hidden backdrop-blur-3xl">
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-[150px] pointer-events-none"></div>
                <textarea className="w-full bg-slate-950/80 border border-white/5 rounded-[2.5rem] p-10 text-2xl font-black outline-none focus:border-blue-500 resize-none h-64 italic text-white placeholder:text-slate-900 shadow-inner" placeholder="Deskripsikan konsep impian... (ex: Modern black laser cut fence with tropical wood accents and gold trim...)" value={aiPrompt} onChange={e => setAiPrompt(e.target.value)} />
                <button onClick={async () => {
                  if(!aiPrompt) return;
                  setLoading(true);
                  try {
                    const response = await ai.models.generateContent({
                      model: 'gemini-2.5-flash-image',
                      contents: { parts: [{ text: `High-end Architectural Design for a professional steel workshop: ${aiPrompt}` }] },
                      config: { imageConfig: { aspectRatio: "1:1" } }
                    });
                    const part = response.candidates?.[0]?.content?.parts.find(p => p.inlineData);
                    if (part?.inlineData) setAiVisual(`data:${part.inlineData.mimeType};base64,${part.inlineData.data}`);
                  } catch (e) { console.error(e); }
                  finally { setLoading(false); }
                }} className="w-full h-24 bg-blue-600 hover:bg-blue-500 text-white rounded-[2rem] font-black flex items-center justify-center gap-6 uppercase text-sm tracking-[0.5em] shadow-[0_30px_60px_rgba(37,99,235,0.4)] active:scale-95 transition-all italic">
                  {loading ? <div className="w-10 h-10 border-4 border-white border-t-transparent animate-spin rounded-full"></div> : <><Sparkles className="w-10 h-10" /> GENERATE SULTAN CONCEPT</>}
                </button>
             </div>
             {aiVisual && (
               <div className="rounded-[4.5rem] overflow-hidden border border-white/10 shadow-[0_0_200px_rgba(0,0,0,0.8)] animate-in slide-in-from-top-16 duration-1000 group relative">
                  <img src={aiVisual} className="w-full h-auto" alt="AI Concept" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-16">
                     <div className="flex justify-between items-end">
                        <div className="space-y-4">
                           <span className="text-amber-500 font-black uppercase text-[10px] tracking-[0.6em] italic">PREMIUM CONCEPT DESIGN</span>
                           <h4 className="text-3xl font-black text-white italic tracking-tighter uppercase leading-none">{aiPrompt}</h4>
                        </div>
                        <button onClick={() => {
                           const link = document.createElement('a');
                           link.href = aiVisual!;
                           link.download = `SultanAI-${Date.now()}.png`;
                           link.click();
                        }} className="bg-white text-slate-950 px-10 py-5 rounded-2xl font-black text-[11px] uppercase flex items-center gap-4 active:scale-95 transition-all shadow-2xl tracking-widest italic">
                           <Download className="w-6 h-6" /> SAVE CONCEPT
                        </button>
                     </div>
                  </div>
               </div>
             )}
          </div>
        )}

        {/* QUOTE / PROPOSAL VIEW */}
        {view === 'quote' && (
           <div className="p-4 md:p-12 max-w-5xl mx-auto space-y-12 animate-in fade-in duration-700 pb-32">
              <div className="no-print glass p-6 md:p-10 rounded-[2.5rem] border border-white/5 flex flex-wrap gap-4 md:gap-6 justify-center shadow-2xl backdrop-blur-xl">
                  <button onClick={generateShareLink} className="px-8 md:px-12 py-4 md:py-6 bg-emerald-600/20 text-emerald-500 border border-emerald-500/30 rounded-[1.5rem] md:rounded-[2rem] font-black text-[10px] md:text-[12px] uppercase flex items-center gap-3 md:gap-4 active:scale-95 transition-all shadow-xl tracking-widest italic hover:bg-emerald-600/30">
                    <Share2 className="w-5 h-5 md:w-6 md:h-6" /> SALIN LINK PREVIEW
                  </button>
                  <button onClick={polishAI} className="px-8 md:px-12 py-4 md:py-6 bg-white text-slate-950 rounded-[1.5rem] md:rounded-[2rem] font-black text-[10px] md:text-[12px] uppercase flex items-center gap-3 md:gap-4 active:scale-95 transition-all shadow-xl hover:bg-slate-50 tracking-widest italic">
                    {loading ? <div className="w-4 h-4 md:w-5 md:h-5 border-2 border-slate-950 border-t-transparent animate-spin rounded-full"></div> : <><Sparkles className="w-5 h-5 md:w-6 md:h-6" /> AI REWRITE PROPOSAL</>}
                  </button>
                   <button onClick={exportToPDF} className="px-8 md:px-12 py-4 md:py-6 bg-slate-900 text-white border border-white/10 rounded-[1.5rem] md:rounded-[2rem] font-black text-[10px] md:text-[12px] uppercase flex items-center gap-3 md:gap-4 active:scale-95 transition-all shadow-xl tracking-widest italic hover:bg-slate-800">
                     <Download className="w-5 h-5 md:w-6 md:h-6" /> EXPORT PDF FILE
                  </button>
                  <button onClick={() => window.print()} className="px-8 md:px-12 py-4 md:py-6 gold-gradient text-slate-950 rounded-[1.5rem] md:rounded-[2rem] font-black text-[10px] md:text-[12px] uppercase flex items-center gap-3 md:gap-4 active:scale-95 transition-all shadow-xl shadow-amber-500/30 tracking-widest italic">
                     <Printer className="w-5 h-5 md:w-6 md:h-6" /> PRINT OFFICIAL QUOTE
                  </button>
              </div>

              {/* The "Official Quote" Document */}
              <div id="official-quote" className="bg-white text-slate-950 rounded-[3rem] p-8 md:p-20 shadow-[0_40px_100px_rgba(0,0,0,0.3)] relative overflow-hidden print:shadow-none print:rounded-none">
                 <div className="absolute top-0 left-0 w-2 md:w-4 h-full gold-gradient opacity-90 pointer-events-none"></div>
                 <div className="absolute top-0 right-0 w-full h-full bg-[#fcfcfc] opacity-50 pointer-events-none"></div>
                 <div className="relative z-10 space-y-12 md:pl-8">
                    <div className="flex flex-col md:flex-row justify-between items-start border-b-[8px] border-slate-950 pb-12 gap-8">
                       <div className="space-y-6">
                          <div className="flex items-center gap-6">
                             <div className="w-20 h-20 md:w-28 md:h-28 bg-white rounded-full flex items-center justify-center shadow-[0_15px_30px_rgba(0,0,0,0.1)] border-2 border-amber-500 overflow-hidden rotate-3">
                                <img src="https://lh3.googleusercontent.com/d/1Xl2fI5b-7_95vWqYt-DkFm_Q-Xz6_5vI" className="w-full h-full object-contain -rotate-3" alt="Official Logo" />
                             </div>
                             <div className="flex flex-col">
                                <h1 className="text-4xl md:text-6xl font-black text-slate-950 leading-[0.85] uppercase italic tracking-tighter">{companyInfo.name.split(' ')[0]}<br/><span className="text-amber-600 not-italic">{companyInfo.name.split(' ')[1]}</span></h1>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mt-4 italic">The Premium Steel Architectural Legacy</p>
                             </div>
                          </div>
                          <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] space-y-2">
                             <p className="flex items-center gap-4"><MapPin className="w-4 h-4 text-slate-950" /> Makassar, Sulawesi Selatan</p>
                             <p className="flex items-center gap-4"><Phone className="w-4 h-4 text-slate-950" /> 0852-4208-1934</p>
                             <p className="flex items-center gap-4"><Globe className="w-4 h-4 text-slate-950" /> bengkelsultan.com</p>
                             <p className="flex items-center gap-4 text-amber-600"><Smartphone className="w-4 h-4" /> Instagram: {companyInfo.ig}</p>
                          </div>
                       </div>
                       <div className="text-left md:text-right flex flex-col md:items-end w-full md:w-auto">
                          <h2 className="text-4xl md:text-5xl font-black text-slate-950 uppercase italic tracking-tighter mb-4 md:mb-6 leading-none pt-2 text-right">OFFICIAL QUOTE</h2>
                          <div className="bg-amber-50 border border-amber-100 px-4 py-2 rounded-lg inline-block mb-8">
                             <p className="text-amber-600 font-black uppercase text-xs md:text-sm tracking-[0.4em]">#SLTN-V10.2-{new Date().getFullYear()}-{Math.floor(Math.random()*90000 + 10000)}</p>
                          </div>
                          <div className="flex justify-end gap-12">
                             <div className="space-y-1">
                                <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">DATE OF ISSUE</p>
                                <p className="text-xl font-black text-slate-950 italic">{new Date().toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'})}</p>
                             </div>
                             <div className="space-y-1 text-right">
                                <p className="text-[10px] font-black text-amber-600 uppercase tracking-[0.3em]">VALID UNTIL</p>
                                <p className="text-xl font-black text-slate-950 italic">{new Date(new Date().getTime() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'})}</p>
                             </div>
                          </div>
                       </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 py-10 border-b-[4px] border-slate-100">
                       <div className="space-y-3">
                          <h4 className="text-[10px] font-black text-amber-600 uppercase tracking-[0.5em] flex items-center gap-4 italic font-sans whitespace-nowrap">CLIENT PROFILE <div className="h-px flex-1 bg-amber-200/50"></div></h4>
                          <p className="text-2xl md:text-4xl font-black text-slate-950 uppercase italic tracking-tighter leading-none">{client.name || 'PELANGGAN SETIA SULTAN'}</p>
                          {projectLocation && <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2"><MapPin className="w-3 h-3"/> {projectLocation}</p>}
                       </div>
                       <div className="md:text-right space-y-3">
                          <h4 className="text-[10px] font-black text-amber-600 uppercase tracking-[0.5em] flex items-center gap-4 italic font-sans whitespace-nowrap md:flex-row-reverse"><div className="h-px flex-1 bg-amber-200/50"></div> PROJECT NAME</h4>
                          <p className="text-2xl md:text-4xl font-black text-slate-950 uppercase italic tracking-tighter leading-none">{client.project || 'PREMIUM CONSTRUCTION'}</p>
                          <p className="text-[10px] font-bold text-amber-600 uppercase tracking-widest flex items-center gap-2 md:justify-end"><Layers className="w-3 h-3"/> PRIORITY: {priorityOrder.toUpperCase()}</p>
                       </div>
                    </div>

                    {aiQuoteText && (
                       <div className="p-8 md:p-14 bg-slate-50 border-l-[12px] border-amber-500 italic text-lg md:text-2xl font-medium text-slate-700 leading-relaxed rounded-r-[2rem] my-8 shadow-inner relative overflow-hidden">
                          <div className="absolute top-0 right-0 p-4 opacity-10"><Sparkles className="w-16 h-16 text-amber-600" /></div>
                          "{aiQuoteText}"
                       </div>
                    )}

                    <div className="overflow-x-auto py-6">
                       <table className="w-full text-left border-collapse min-w-[650px]">
                          <thead className="text-[10px] font-black text-slate-400 uppercase border-b-[3px] border-slate-950">
                             <tr>
                                <th className="pb-6 pr-6 tracking-[0.2em] font-sans">DESCRIPTION & SPECIFICATION</th>
                                <th className="pb-6 text-center px-4 tracking-[0.2em] font-sans">VOL</th>
                                <th className="pb-6 text-right px-4 tracking-[0.2em] font-sans">UNIT PRICE</th>
                                <th className="pb-6 text-right pl-6 tracking-[0.2em] font-sans font-black text-slate-950">TOTAL INVEST</th>
                             </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100">
                             {cart.map((item, idx) => (
                               <tr key={idx} className="text-base font-black text-slate-900 group hover:bg-slate-50/50 transition-colors">
                                  <td className="py-8 pr-6">
                                     <p className="text-xl md:text-2xl uppercase italic tracking-tighter leading-none mb-3">{item.name}</p>
                                     <div className="flex flex-wrap items-center gap-2">
                                        <span className="text-[8px] text-amber-600 uppercase italic font-black tracking-[0.3em] border border-amber-200 px-2.5 py-1 rounded-md bg-amber-50/30">GRADE {item.grade.toUpperCase()}</span>
                                        {item.discount > 0 && <span className="text-[8px] text-emerald-600 uppercase italic font-black tracking-[0.3em] border border-emerald-200 px-2.5 py-1 rounded-md bg-emerald-50/30">DISC {item.discountPercent}%</span>}
                                        <span className="text-[8px] text-slate-400 font-bold uppercase tracking-[0.1em] italic">Official Sultan Fabrication</span>
                                     </div>
                                  </td>
                                  <td className="py-8 text-center text-slate-400 text-lg font-bold px-4 italic">{item.volume.toFixed(1)} {item.unit}</td>
                                  <td className="py-8 text-right text-slate-400 text-[10px] px-4 font-bold tracking-widest italic">{formatIDR(item.price)}</td>
                                  <td className="py-8 text-right text-xl md:text-2xl italic font-black pl-6">{formatIDR(item.total)}</td>
                               </tr>
                             ))}
                          </tbody>
                       </table>
                    </div>

                    <div className="bg-slate-950 text-white p-10 md:p-14 rounded-[2.5rem] shadow-2xl relative overflow-hidden border-b-[12px] border-amber-500">
                       <div className="absolute top-0 right-0 w-[400px] h-[400px] gold-gradient opacity-10 rounded-full -mr-40 -mt-40 blur-[100px] pointer-events-none"></div>
                       <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
                          <div className="text-center md:text-left space-y-6">
                             <div>
                                <p className="text-[11px] font-black uppercase text-amber-500 tracking-[0.8em] italic leading-none mb-2">PROJECT TIMELINE</p>
                                <p className="text-2xl font-black text-white italic tracking-tighter italic">± {timelineDays} HARI KERJA</p>
                             </div>
                             <div>
                                <p className="text-[11px] font-black uppercase text-amber-500 tracking-[0.8em] italic leading-none mb-2">TOTAL INVESTMENT VALUE</p>
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.3em] leading-relaxed max-w-sm opacity-60 italic">INCLUDES PROJECT MANAGEMENT, PREMIUM FABRICATION & WARRANTY INCLUSION.</p>
                             </div>
                          </div>
                          <div className="text-right">
                             <div className="text-6xl md:text-8xl font-black gold-text italic tracking-tighter leading-none">{formatIDR(totals.grand)}</div>
                             {taxEnabled && <p className="text-[10px] font-black text-amber-500/50 uppercase tracking-[0.5em] mt-4">SUDAH TERMASUK PPN 11%</p>}
                          </div>
                       </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 py-12 border-t-[6px] border-slate-950">
                       <div className="space-y-6">
                          <h4 className="text-[10px] font-black text-slate-950 uppercase tracking-[0.6em] flex items-center gap-6 italic leading-none">TERMS & CONDITIONS <div className="h-px flex-1 bg-slate-100"></div></h4>
                          <ul className="text-[10px] text-slate-500 font-bold uppercase space-y-4 tracking-[0.1em] leading-relaxed italic">
                             <li className="flex gap-4 items-start"><span className="text-amber-500 mt-1">✓</span> Penawaran ini eksklusif dan berlaku selama 14 hari kalender.</li>
                             <li className="flex gap-4 items-start"><span className="text-amber-500 mt-1">✓</span> Menggunakan material grade SNI dengan finishing premium.</li>
                             <li className="flex gap-4 items-start"><span className="text-amber-500 mt-1">✓</span> Garansi struktur pengerjaan selama 6 bulan penuh (S&K).</li>
                             <li className="flex gap-4 items-start"><span className="text-amber-500 mt-1">✓</span> Estimasi durasi pengerjaan disepakati saat SPK ditandatangani.</li>
                          </ul>
                          
                          <div className="pt-8 space-y-4">
                             <h4 className="text-[10px] font-black text-slate-950 uppercase tracking-[0.6em] flex items-center gap-6 italic leading-none font-sans">OFFICIAL PAYMENT <div className="h-px flex-1 bg-slate-100"></div></h4>
                             <div className="p-6 border border-slate-100 rounded-2xl bg-slate-50/50 space-y-2">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">{bankInfo.bank}</p>
                                <p className="text-xl font-black text-slate-950 tracking-tighter italic">{bankInfo.account}</p>
                                <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest leading-none">A/N {bankInfo.owner}</p>
                             </div>
                          </div>
                       </div>
                       <div className="space-y-6">
                          <h4 className="text-[10px] font-black text-slate-950 uppercase tracking-[0.6em] flex items-center gap-6 italic leading-none md:flex-row-reverse">PAYMENT SCHEDULE <div className="h-px flex-1 bg-slate-100"></div></h4>
                          <div className="space-y-4">
                             {schedule.map((s, i) => (
                               <div key={i} className="flex justify-between border-b border-slate-50 pb-3 items-center">
                                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em] italic pr-4">{s.label}</span>
                                  <span className="text-xl font-black text-slate-950 italic whitespace-nowrap">{formatIDR(s.val)}</span>
                               </div>
                             ))}
                          </div>
                          
                          {maintenanceNotes && (
                            <div className="pt-8 space-y-4">
                               <h4 className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.6em] flex items-center gap-6 italic leading-none font-sans md:flex-row-reverse"><div className="h-px flex-1 bg-emerald-100"></div> AFTER-SALES CARE</h4>
                               <div className="text-[9px] text-slate-400 font-bold uppercase italic leading-loose tracking-widest text-right">
                                  Pembersihan rutin menggunakan kain microfiber.<br/>Hindari paparan zat kimia korosif secara langsung.<br/>Lakukan pelumasan engsel setiap 6-12 bulan.
                               </div>
                            </div>
                          )}
                       </div>
                    </div>

                    {showSignature && (
                      <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-16 px-4 md:px-12">
                         <div className="text-center">
                            <p className="text-[9px] font-black text-slate-300 uppercase mb-24 tracking-[0.6em] italic">CLIENT APPROVAL,</p>
                            <div className="border-t-[3px] border-slate-950 pt-6 group">
                               <p className="text-2xl font-black text-slate-950 uppercase italic leading-none tracking-tighter">{client.name || 'PRIORITY CUSTOMER'}</p>
                               <p className="text-[9px] font-bold text-amber-600 uppercase tracking-[0.3em] mt-3 italic">AUTHORIZED SIGNATURE</p>
                            </div>
                         </div>
                         <div className="text-center">
                            <p className="text-[9px] font-black text-slate-300 uppercase mb-24 tracking-[0.6em] italic">SULTAN MANAGEMENT,</p>
                            <div className="border-t-[3px] border-slate-950 pt-6 group">
                               <p className="text-2xl font-black text-slate-950 uppercase italic leading-none tracking-tighter">{companyInfo.name.split(' ')[0]} AGENT</p>
                               <p className="text-[9px] font-bold text-amber-600 uppercase tracking-[0.3em] mt-3 italic">OFFICIAL REPRESENTATIVE</p>
                            </div>
                         </div>
                      </div>
                    )}

                    <div className="mt-24 text-center opacity-10 border-t pt-8">
                       <p className="text-[9px] font-black uppercase tracking-[1.2em] italic">BENGKEL SULTAN MAKASSAR • THE ARCHITECTURAL LEGACY • EXCLUSIVE V10.2</p>
                    </div>
                 </div>
              </div>
           </div>
        )}

        {/* SETTINGS VIEW */}
        {view === 'settings' && (
          <div className="p-4 md:p-12 max-w-5xl mx-auto space-y-12 animate-in slide-in-from-bottom-12 duration-500 pb-32">
             <div className="flex justify-between items-center">
                <div className="space-y-4">
                   <h2 className="text-5xl font-black italic gold-text tracking-tighter uppercase leading-none">MASTER KATALOG</h2>
                   <p className="text-slate-500 text-xs font-black uppercase tracking-[0.4em] italic leading-loose">SESUAIKAN HARGA DASAR LAYANAN BENGKEL SULTAN MAKASSAR SECARA REAL-TIME.</p>
                </div>
                <button onClick={() => setView('estimator')} className="p-5 bg-amber-500 text-slate-950 rounded-[1.5rem] font-black uppercase text-[10px] tracking-widest flex items-center gap-3 active:scale-95 transition-all shadow-2xl">
                   <ChevronRight className="w-5 h-5" /> KEMBALI KE ESTIMATOR
                </button>
             </div>

             <div className="grid grid-cols-1 gap-12">
                {Object.entries(catalog).map(([catKey, cat]: [string, any]) => (
                  <div key={catKey} className="glass p-10 rounded-[3rem] border border-white/10 space-y-8 shadow-2xl relative overflow-hidden group">
                     <div className="absolute top-0 right-0 w-80 h-80 gold-gradient opacity-5 rounded-full blur-[100px] pointer-events-none group-hover:scale-125 transition-transform duration-1000"></div>
                     <div className="flex items-center gap-6 border-b border-white/5 pb-8 relative z-10">
                        <div className="p-5 bg-slate-950 rounded-2xl border border-white/10 text-amber-500 shadow-xl">
                           {React.createElement((DATABASE as any)[catKey].icon, { className: "w-8 h-8" })}
                        </div>
                        <h3 className="text-3xl font-black text-white italic tracking-tighter uppercase">{cat.label}</h3>
                     </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                        {/* Form Tambah Item Baru */}
                        <div className="bg-slate-900/40 p-8 rounded-3xl border border-dashed border-amber-500/30 space-y-5 flex flex-col justify-center">
                           <h4 className="text-[10px] font-black text-amber-500 uppercase tracking-widest flex items-center gap-3 italic"><Plus className="w-4 h-4" /> TAMBAH ITEM LAYANAN BARU</h4>
                           <div className="space-y-4">
                              <input className="w-full bg-slate-950 border border-white/5 rounded-xl p-4 text-xs font-bold text-white outline-none focus:border-amber-500" placeholder="Nama Item (ex: Railing Mewah...)" value={newItem.name} onChange={e => setNewItem({...newItem, name: e.target.value})} />
                              <div className="grid grid-cols-2 gap-4">
                                 <input type="number" className="w-full bg-slate-950 border border-white/5 rounded-xl p-4 text-xs font-bold text-white outline-none focus:border-amber-500" placeholder="Harga Dasar (Rp)" value={newItem.price} onChange={e => setNewItem({...newItem, price: e.target.value})} />
                                 <input className="w-full bg-slate-950 border border-white/5 rounded-xl p-4 text-xs font-bold text-white outline-none focus:border-amber-500" placeholder="Unit (m2, m1...)" value={newItem.unit} onChange={e => setNewItem({...newItem, unit: e.target.value})} />
                              </div>
                              <button onClick={() => addCatalogItem(catKey)} className="w-full py-4 bg-amber-500 text-slate-950 rounded-xl font-black uppercase text-[10px] tracking-widest shadow-xl active:scale-95 transition-all">SIMPAN ITEM KE KATALOG</button>
                           </div>
                        </div>

                        {cat.items.map((item: any, idx: number) => (
                           <div key={item.id} className="bg-slate-950/80 p-8 rounded-3xl border border-white/5 space-y-5 group/item hover:border-amber-500/50 transition-all shadow-xl relative">
                              <button 
                                onClick={() => deleteCatalogItem(catKey, item.id)}
                                className="absolute top-4 right-4 p-2 text-slate-700 hover:text-red-500 transition-colors opacity-0 group-hover/item:opacity-100"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-loose pr-6">{item.name}</p>
                              <div className="space-y-3">
                                 <label className="text-[9px] font-black text-amber-500 uppercase tracking-widest opacity-70 ml-1">HARGA DASAR ESTIMASI ({item.unit})</label>
                                 <div className="relative">
                                   <span className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-600 font-black text-xs uppercase">Rp</span>
                                   <input 
                                     type="number" 
                                     className="w-full bg-slate-900 border border-white/10 rounded-2xl p-5 pl-14 text-xl font-black text-white focus:border-amber-500 outline-none transition-all shadow-inner"
                                     value={item.price}
                                     onChange={(e) => {
                                       const newPrice = parseInt(e.target.value) || 0;
                                       const newCatalog = {...catalog};
                                       (newCatalog as any)[catKey].items[idx].price = newPrice;
                                       setCatalog(newCatalog);
                                     }}
                                   />
                                 </div>
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>
                ))}
             </div>
             
             <button onClick={() => { if(confirm('⚠️ PERINGATAN: Reset semua harga ke standar awal database?')) { setCatalog(DATABASE); localStorage.removeItem('sultan_v10_catalog'); window.location.reload(); } }} className="w-full py-10 bg-red-500/5 hover:bg-red-500/10 border border-red-500/20 text-red-500 rounded-[2.5rem] font-black uppercase text-[10px] tracking-[0.5em] italic transition-all shadow-2xl">
                RESET SELURUH KATALOG KE STANDAR DATABASE (DEFAULT)
             </button>
          </div>
        )}
      </main>

      {/* MOBILE BOTTOM NAVIGATION BAR */}
      <nav className="fixed bottom-0 left-0 right-0 h-28 glass border-t border-white/5 no-print z-[100] flex items-center justify-around px-6 md:hidden pb-6">
         {[
           { id: 'estimator', icon: Calculator, label: 'Kalkulator' },
           { id: 'ai', icon: Sparkles, label: 'Sultan AI' },
           { id: 'quote', icon: FileText, label: 'Proposal' }
         ].map(item => (
           <button 
             key={item.id}
             onClick={() => setView(item.id)}
             className={`flex flex-col items-center gap-2 transition-all w-28 relative ${view === item.id ? 'text-amber-500' : 'text-slate-500'}`}
           >
             {view === item.id && <div className="absolute -top-6 w-16 h-1.5 bg-amber-500 rounded-full shadow-[0_0_20px_rgba(245,158,11,0.6)] animate-pulse"></div>}
             <div className={`p-4 rounded-[1.5rem] transition-all duration-300 ${view === item.id ? 'bg-amber-500 text-slate-950 scale-110 shadow-[0_15px_30px_rgba(212,175,55,0.4)]' : 'bg-slate-900'}`}>
                <item.icon className="w-7 h-7" />
             </div>
             <span className="text-[10px] font-black uppercase tracking-widest italic">{item.label}</span>
           </button>
         ))}
      </nav>

      {/* Floating Action Button (Mobile Only for WA) */}
      <div className="fixed bottom-32 right-6 md:hidden no-print z-[90]">
         <button onClick={copyToWA} className="p-5 bg-emerald-500 text-white rounded-full shadow-[0_20px_40px_rgba(16,185,129,0.4)] active:scale-90 transition-transform">
            <MessageCircle className="w-8 h-8" />
         </button>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .glass { background: rgba(15, 23, 42, 0.98); backdrop-filter: blur(50px); }
        .bg-grid-pattern { background-image: radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px); background-size: 50px 50px; }
        .gold-gradient { background: linear-gradient(135deg, #fde68a 0%, #d4af37 50%, #b48c36 100%); }
        .gold-text { background: linear-gradient(135deg, #fde68a 0%, #d4af37 50%, #b48c36 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.08); border-radius: 20px; }
        @media print {
            .no-print { display: none !important; }
            body { background: white !important; }
            main { overflow: visible !important; height: auto !important; }
            .bg-grid-pattern { display: none !important; }
        }
        input[type="number"]::-webkit-inner-spin-button, input[type="number"]::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
        * { -webkit-tap-highlight-color: transparent; outline: none !important; }
      `}} />
    </div>
  );
};

createRoot(document.getElementById('root')!).render(<App />);
