import { useState, useEffect } from "react";

export default function App() {
  const [spaceType, setSpaceType] = useState("展厅");
  const [styleTags, setStyleTags] = useState(["清晨", "黄昏", "夜景"]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [progress, setProgress] = useState(0);
  const [toast, setToast] = useState("");
  const [material, setMaterial] = useState("混凝土");
  const [uploadedImage, setUploadedImage] = useState(null);
  const [creativeDescription, setCreativeDescription] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [structuralScore, setStructuralScore] = useState(0);
  const [isGeneratingPPT, setIsGeneratingPPT] = useState(false);
  const [showPPTPreview, setShowPPTPreview] = useState(false);

  const handleGeneratePPT = () => {
    setIsGeneratingPPT(true);
    setTimeout(() => {
      setIsGeneratingPPT(false);
      setShowPPTPreview(true);
    }, 2400);
  };

  const handleDownloadPPT = () => {
    const link = document.createElement('a');
    link.href = '/港口灯塔打卡装置设计.pptx';
    link.download = '港口灯塔打卡装置设计.pptx';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const handleUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);

    const img = new Image();
    img.onload = () => {
      setUploadedImageRatio(img.width >= img.height ? "landscape" : "portrait");
      setUploadedImage(imageUrl);
      setToast("草图已上传");
      setTimeout(() => setToast(""), 1600); 
    };
    img.src = imageUrl;
  };

  const tags = ["清晨",  "正午", "黄昏", "夜景", "雨天"];
  const spaces = ["艺术装置", "展厅", "大堂", "剧场"];

  const [uploadedImageRatio, setUploadedImageRatio] = useState("landscape");
  const [conceptRatio, setConceptRatio] = useState("portrait");

  const toggleTag = (tag) => {
    setStyleTags((prev) =>
      prev.includes(tag) ? prev.filter((item) => item !== tag) : [...prev, tag]
    );
  };
  const handleConceptLoad = (event) => {
    const img = event.currentTarget;
    setConceptRatio(img.naturalWidth >= img.naturalHeight ? "landscape" : "portrait");
  };
  const handleGenerate = () => {
    if (!uploadedImage) {
      setToast("请先上传草图");
      setTimeout(() => setToast(""), 1800);
      return;
    }
    setIsGenerating(true);
    setGenerated(false);
    setProgress(0);
    setStructuralScore(0);
  };

  useEffect(() => {
    if (!isGenerating) return;
    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = Math.min(prev + Math.random() * 3 + 1, 100);
        return next;
      });
    }, 80);
    return () => clearInterval(timer);
  }, [isGenerating]);

  useEffect(() => {
    if (progress >= 100 && isGenerating) {
      setIsGenerating(false);
      setGenerated(true);
      setToast("空间概念已生成");
      setTimeout(() => setToast(""), 1800);
    }
  }, [progress]);

  useEffect(() => {
    if (!isGenerating) {
      if (generated) setStructuralScore(82);
      return;
    }
    const timer = setInterval(() => {
      setStructuralScore(Math.floor(Math.random() * 41) + 50);
    }, 120);
    return () => clearInterval(timer);
  }, [isGenerating, generated]);

  const handleSync = () => {
    setToast("已将结构化空间意图同步至 AHOLO");
    setTimeout(() => setToast(""), 2200);
  };

  return (
    <div className="min-h-screen bg-[#050807] text-white px-8 py-6">
      {toast && (
        <div className="fixed top-6 left-1/2 z-50 -translate-x-1/2 rounded-full border border-emerald-400/40 bg-emerald-500/15 px-6 py-3 text-sm text-emerald-300 backdrop-blur">
          {toast}
        </div>
      )}

      {showPreview && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-8"
          onClick={() => setShowPreview(false)}
        >
          <div className="relative max-h-full max-w-full">
            <img
              src="/concept.jpg"
              alt="概念图预览"
              className="max-h-[90vh] max-w-[90vw] rounded-2xl object-contain"
            />
            <button
              onClick={() => setShowPreview(false)}
              className="absolute -top-3 -right-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/80 text-white/70 hover:bg-red-500/80 hover:text-white transition-colors"
              title="关闭预览"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {showPPTPreview && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-6"
          onClick={() => setShowPPTPreview(false)}
        >
          <div
            className="relative w-full max-w-4xl overflow-hidden rounded-2xl border border-white/10 bg-zinc-950 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/10 bg-zinc-900/80 px-5 py-3">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500/20 text-orange-400">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm6 1.5a.5.5 0 011 0V8h2.5a.5.5 0 010 1H11v2.5a.5.5 0 01-1 0V9H7.5a.5.5 0 010-1H10V5.5z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">港口灯塔打卡装置设计.pptx</p>
                  <p className="text-xs text-zinc-500">PowerPoint 演示文稿 · 1.78 MB</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleDownloadPPT}
                  className="flex items-center gap-2 rounded-xl bg-emerald-400 px-4 py-2 text-sm font-bold text-black transition hover:bg-emerald-300"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                    <path d="M10.75 2.75a.75.75 0 00-1.5 0v8.614L6.295 8.235a.75.75 0 10-1.09 1.03l4.25 4.5a.75.75 0 001.09 0l4.25-4.5a.75.75 0 00-1.09-1.03l-2.955 3.129V2.75z" />
                    <path d="M3.5 12.75a.75.75 0 00-1.5 0v2.5A2.75 2.75 0 004.75 18h10.5A2.75 2.75 0 0018 15.25v-2.5a.75.75 0 00-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5z" />
                  </svg>
                  下载 PPT
                </button>
                <button
                  onClick={() => setShowPPTPreview(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-500 transition hover:bg-white/10 hover:text-white"
                  title="关闭"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                    <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="bg-zinc-100 p-8">
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-gradient-to-br from-slate-800 via-slate-900 to-black shadow-xl">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,.06)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,.06)_1px,transparent_1px)] bg-[size:32px_32px]" />
                <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-emerald-300 via-emerald-500 to-transparent" />

                <div className="relative flex h-full flex-col justify-center px-16">
                  <p className="text-xs font-semibold tracking-[0.4em] text-emerald-400">
                    AHOLO · CONCEPT DESIGN
                  </p>
                  <h2 className="mt-6 text-5xl font-black leading-tight text-white">
                    港口灯塔
                    <br />
                    打卡装置设计
                  </h2>
                  <p className="mt-6 max-w-md text-base text-zinc-400">
                    Harbor Lighthouse Interactive Installation
                  </p>
                  <div className="mt-10 flex items-center gap-3 text-xs text-zinc-500">
                    <span>方案版本 v1.0</span>
                    <span className="h-1 w-1 rounded-full bg-zinc-600" />
                    <span>Spatial Copilot Generated</span>
                  </div>
                </div>

                <div className="absolute bottom-6 right-6 flex h-12 w-12 items-center justify-center rounded-xl border border-emerald-400/40 bg-emerald-400/10">
                  <span className="text-sm font-bold text-emerald-300">01</span>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between text-xs text-zinc-500">
                <span>第 1 页 / 共 12 页</span>
                <span>点击下载查看完整方案</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <header className="mb-6 flex items-start justify-between">
        <div>
          <p className="text-sm font-semibold tracking-widest text-emerald-400">
            灵感飞轮 Alpha
          </p>
          <h1 className="mt-3 text-5xl font-black tracking-tight">
            AHOLO Creative Copilot
          </h1>
          <p className="mt-3 text-lg text-zinc-400">
            一个帮助设计师快速建立“空间意图”的 AI 创意工作台
          </p>
        </div>

        <div className="rounded-2xl border border-emerald-400/25 bg-white/5 px-5 py-3 text-right backdrop-blur">
          <p className="text-xs text-zinc-400">项目状态</p>
          <p className="mt-1 text-sm font-semibold text-emerald-400">
            MVP 原型验证版
          </p>
        </div>
      </header>

      <main className="grid grid-cols-[260px_1fr_300px] gap-5">
        <aside className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
          <label className="mb-6 block cursor-pointer rounded-2xl border border-dashed border-white/20 bg-black/30 p-6 text-center transition hover:border-emerald-400/50 hover:bg-emerald-400/5">
            <input
              type="file"
              accept="image/*"
              onChange={handleUpload}
              onClick={(e) => { e.target.value = '' }}
              className="hidden"
            />

            <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-400/10 text-2xl text-emerald-400">
              +
            </div>

            <p className="text-sm font-semibold">上传草图</p>
            <p className="mt-2 text-xs text-zinc-500">
               支持线稿 / 手绘 / 参考图
            </p>
          </label>

          <div className="mb-6">
            <p className="mb-3 text-sm font-semibold text-zinc-300">空间类型</p>
            <div className="grid grid-cols-2 gap-2">
              {spaces.map((item) => (
                <button
                  key={item}
                  onClick={() => setSpaceType(item)}
                  className={`rounded-xl border px-3 py-2 text-sm transition ${
                    spaceType === item
                      ? "border-emerald-400 bg-emerald-400/15 text-emerald-300"
                      : "border-white/10 bg-white/[0.03] text-zinc-400 hover:border-white/25"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-3 text-sm font-semibold text-zinc-300">风格标签</p>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`rounded-full border px-3 py-1.5 text-xs transition ${
                    styleTags.includes(tag)
                      ? "border-emerald-400 bg-emerald-400/15 text-emerald-300"
                      : "border-white/10 bg-white/[0.03] text-zinc-500"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-6">
            <p className="mb-3 text-sm font-semibold text-zinc-300">材质</p>

            <div className="grid grid-cols-2 gap-2">
              {["混凝土", "金属", "石材", "木材"].map((item) => (
                <button
                   key={item}
                   onClick={() => setMaterial(item)}
                   className={`rounded-xl border px-3 py-2 text-sm transition ${
                     material === item
                       ? "border-emerald-400 bg-emerald-400/15 text-emerald-300"
                       : "border-white/10 bg-white/[0.03] text-zinc-400 hover:border-white/25"
                   }`}
                  >
                   {item}
                </button>
              ))}
           </div>
          </div>
        </aside>

        <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
          <div className="mb-5 flex items-center justify-between">
            <div className="flex items-center gap-3 text-sm">
              <span className="text-emerald-400">草图输入</span>
              <span className="text-zinc-600">→</span>
              <span className="text-emerald-400">空间推演</span>
              <span className="text-zinc-600">→</span>
              <span className="text-emerald-400">概念输出</span>
            </div>

            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="rounded-xl bg-emerald-400 px-5 py-2 text-sm font-bold text-black transition hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isGenerating ? "空间推演中..." : "生成空间概念"}
            </button>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <CanvasCard title="01 Sketch Input" subtitle="极简草图输入">
              <div className="relative">
                <div
                  className={`mx-auto overflow-hidden rounded-2xl bg-zinc-100 p-4 ${
                      uploadedImageRatio === "portrait"
                        ? "h-80 w-56"
                        : "h-80 w-full"
                  }`}
                >
                  {uploadedImage ? (
                     <img
                       src={uploadedImage}
                       alt="上传的草图"
                       className="h-full w-full rounded-xl object-contain bg-white"
                     />
                  ) : (
                     <div className="h-full rounded-xl border-2 border-zinc-300 bg-white">
                       <div className="mx-auto mt-12 h-48 w-32 border-l-2 border-r-2 border-t-2 border-zinc-500" />
                       <div className="mx-auto mt-2 h-20 w-52 border-t-2 border-zinc-400" />
                     </div>
                  )}
                </div>
                {uploadedImage && (
                  <button
                    onClick={() => setUploadedImage(null)}
                    className="absolute top-2 right-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/60 text-white/70 hover:bg-red-500/80 hover:text-white transition-colors"
                    title="删除草图"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                      <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c-.84 0-1.673.025-2.5.075V3.75c0-.69.56-1.25 1.25-1.25h2.5c.69 0 1.25.56 1.25 1.25v.325C11.673 4.025 10.84 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z" clipRule="evenodd" />
                    </svg>
                  </button>
                )}
              </div>
            </CanvasCard>

            <CanvasCard title="02 Reasoning Proxy" subtitle="空间关系识别">
              <div className="relative h-80 overflow-hidden rounded-2xl bg-black">
                {uploadedImage ? (
                  <>
                    {/* 上传的草图作为扫描对象 */}
                    <img
                      src={uploadedImage}
                      alt="草图扫描"
                      className="h-full w-full object-contain opacity-70"
                    />
                    {/* 3D 空间透视幽灵网格 */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ perspective: '600px', perspectiveOrigin: '50% 66.67%' }}>
                      <div
                        className="absolute inset-0 scale-150"
                        style={{
                          transformOrigin: '50% 66.67%',
                          transform: 'rotateX(75deg)',
                          backgroundImage: `
                            linear-gradient(rgba(16,185,129,.40) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(16,185,129,.40) 1px, transparent 1px)
                          `,
                          backgroundSize: '30px 30px',
                        }}
                      />
                    </div>
                    {/* 翠绿染色层 */}
                    <div className="absolute inset-0 bg-emerald-900/20 mix-blend-overlay" />

                    {/* 扫描线发光动画 */}
                    {isGenerating && (
                      <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        {/* 扫描线 - 从顶到底 */}
                        <div className="absolute left-4 right-4 h-[3px] animate-[scan-down_2.8s_ease-in-out_infinite]">
                          <div className="h-full w-full bg-emerald-300 shadow-[0_0_30px_12px_rgba(52,211,153,0.7),0_0_60px_24px_rgba(52,211,153,0.3)]" />
                        </div>
                        {/* 扫描辉光 */}
                        <div className="absolute left-4 right-4 h-48 animate-[scan-down_2.8s_ease-in-out_infinite] bg-gradient-to-b from-transparent via-emerald-400/20 to-transparent pointer-events-none" />
                      </div>
                    )}

                    {/* 扫描完成的扫描线残留（静态） */}
                    {!isGenerating && generated && (
                      <div className="absolute left-4 right-4 bottom-0 h-[2px] pointer-events-none">
                        <div className="h-full w-full bg-emerald-400/40 shadow-[0_0_20px_8px_rgba(52,211,153,0.2)]" />
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    {/* 网格背景 */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,.14)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,.14)_1px,transparent_1px)] bg-[size:24px_24px]" />

                    {/* 空间框线 */}
                    <div className="absolute left-1/2 top-9 h-52 w-32 -translate-x-1/2 border border-emerald-400/80 shadow-[0_0_30px_rgba(16,185,129,.25)]" />
                    <div className="absolute left-20 top-36 h-24 w-56 border border-emerald-400/50" />

                    {/* 节点 */}
                    <div className="absolute left-[42%] top-[28%] h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_14px_rgba(16,185,129,.9)]" />
                    <div className="absolute left-[58%] top-[45%] h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_14px_rgba(16,185,129,.9)]" />
                    <div className="absolute left-[36%] top-[62%] h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_14px_rgba(16,185,129,.9)]" />

                    {/* 动态连接线 */}
                    <svg className="absolute inset-0 h-full w-full">
                      <line x1="42%" y1="28%" x2="58%" y2="45%" className={`${isGenerating ? 'animate-pulse' : 'opacity-40'}`} stroke="rgba(16,185,129,.75)" strokeWidth="1" />
                      <line x1="58%" y1="45%" x2="36%" y2="62%" className={`${isGenerating ? 'animate-pulse' : 'opacity-40'}`} stroke="rgba(16,185,129,.55)" strokeWidth="1" />
                      <line x1="36%" y1="62%" x2="42%" y2="28%" className={`${isGenerating ? 'animate-pulse' : 'opacity-40'}`} stroke="rgba(16,185,129,.35)" strokeWidth="1" />
                    </svg>
                  </>
                )}
              </div>
            </CanvasCard>

            <CanvasCard title="03 Output Concept" subtitle="空间概念意向">
              <div className="h-80 overflow-hidden rounded-2xl bg-gradient-to-br from-zinc-800 via-stone-700 to-zinc-950">
                {isGenerating ? (
                  <div className="flex h-full flex-col items-center justify-center px-6">
                    <div className="w-full max-w-xs rounded-xl border border-emerald-400/25 bg-black/60 p-4 backdrop-blur">
                      <div className="mb-2 flex items-center justify-between text-xs">
                        <span className="text-emerald-300">空间意图解析中</span>
                        <span className="text-zinc-500">{Math.round(progress)}%</span>
                      </div>
                      <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                        <div className="h-full animate-pulse rounded-full bg-emerald-400" style={{ width: `${progress}%` }} />
                      </div>
                      <div className="mt-3 grid grid-cols-3 gap-2 text-[10px] text-zinc-400">
                        <span>墙体关系</span>
                        <span>动线结构</span>
                        <span>采光方向</span>
                      </div>
                    </div>
                  </div>
                ) : generated ? (
                  <div className="relative">
                    <div
                      className={`mx-auto h-80 overflow-hidden rounded-2xl p-3 ${
                       conceptRatio === "portrait" ? "w-56" : "w-full"
                      }`}
                    >
                      <img
                       src="/concept.jpg"
                       alt="空间概念图"
                       onLoad={handleConceptLoad}
                       className="h-full w-full rounded-2xl object-cover"
                      />
                    </div>
                    <div className="absolute top-2 right-2 flex gap-2">
                      <button
                        onClick={() => setShowPreview(true)}
                        className="flex h-7 w-7 items-center justify-center rounded-full bg-black/60 text-white/70 hover:bg-blue-500/80 hover:text-white transition-colors"
                        title="放大预览"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                          <path d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" />
                          <circle cx="9" cy="9" r="1.5" />
                        </svg>
                      </button>
                      <button
                        onClick={() => {
                          const link = document.createElement('a');
                          link.href = '/concept.jpg';
                          link.download = 'concept-output.jpg';
                          document.body.appendChild(link);
                          link.click();
                          document.body.removeChild(link);
                        }}
                        className="flex h-7 w-7 items-center justify-center rounded-full bg-black/60 text-white/70 hover:bg-emerald-500/80 hover:text-white transition-colors"
                        title="下载概念图"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                          <path d="M10.75 2.75a.75.75 0 00-1.5 0v8.614L6.295 8.235a.75.75 0 10-1.09 1.03l4.25 4.5a.75.75 0 001.09 0l4.25-4.5a.75.75 0 00-1.09-1.03l-2.955 3.129V2.75z" />
                          <path d="M3.5 12.75a.75.75 0 00-1.5 0v2.5A2.75 2.75 0 004.75 18h10.5A2.75 2.75 0 0018 15.25v-2.5a.75.75 0 00-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => setGenerated(false)}
                        className="flex h-7 w-7 items-center justify-center rounded-full bg-black/60 text-white/70 hover:bg-red-500/80 hover:text-white transition-colors"
                        title="删除概念图"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                          <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c-.84 0-1.673.025-2.5.075V3.75c0-.69.56-1.25 1.25-1.25h2.5c.69 0 1.25.56 1.25 1.25v.325C11.673 4.025 10.84 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ) : null}
              </div>
            </CanvasCard>
          </div>

          <div className="mt-5 rounded-2xl border border-emerald-400/20 bg-emerald-400/5 p-4">
            <p className="text-sm text-zinc-300">
              当前空间意图：

              <span className="text-emerald-300">
                {spaceType}
              </span>

              {" / "}

              <span className="text-emerald-300">
                {styleTags.join(" · ")}
              </span>

              {" / "}

              <span className="text-emerald-300">
                {material}
              </span>
            </p>
          </div>

          <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <p className="mb-2 text-sm font-semibold text-zinc-300">创意描述</p>
            <textarea
              value={creativeDescription}
              onChange={(e) => setCreativeDescription(e.target.value)}
              placeholder="描述你的创意想法..."
              rows={3}
              className="w-full resize-none rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white placeholder-zinc-500 outline-none transition focus:border-emerald-400/50 focus:ring-1 focus:ring-emerald-400/30"
            />
          </div>
        </section>

        <aside className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
          <p className="text-lg font-bold text-emerald-400">Spatial Copilot</p>

          <div className="mt-6 rounded-2xl border border-white/10 bg-black/30 p-4">
            <p className="text-sm text-zinc-400">结构合理性</p>
            <p className="mt-2 text-5xl font-black text-emerald-400">{structuralScore}%</p>
          </div>

          <div className="mt-4 rounded-2xl border border-white/10 bg-black/30 p-4">
            <p className="mb-3 text-sm font-semibold">空间建议</p>
            <ul className="space-y-2 text-sm text-zinc-300">
              {[
                { text: "·增加夜间识别性", threshold: 25 },
                { text: "·优化停留界面", threshold: 55 },
                { text: "·强化立面呼应", threshold: 85 },
              ].map((item) => {
                const visible = generated || progress >= item.threshold;
                return (
                  <li
                    key={item.text}
                    className={`transition-all duration-500 ${
                      visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1"
                    }`}
                  >
                    {item.text}
                  </li>
                );
              })}
            </ul>
          </div>


          <button
            onClick={handleGeneratePPT}
            disabled={isGeneratingPPT}
            className="mt-4 w-full rounded-2xl border border-emerald-400/25 bg-emerald-400/10 p-4 text-left transition hover:border-emerald-400/50 hover:bg-emerald-400/20 disabled:cursor-not-allowed"
          >
            <p className="text-sm font-semibold text-emerald-300">
              汇报输出
            </p>
            <p className="mt-2 flex items-center gap-2 text-sm text-zinc-300">
              {isGeneratingPPT ? (
                <>
                  <svg className="h-4 w-4 animate-spin text-emerald-300" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity="0.25" />
                    <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                  <span>正在生成 PPT...</span>
                </>
              ) : (
                <span>点击生成 PPT →</span>
              )}
            </p>
          </button>

          <button
            onClick={handleSync}
            className="mt-6 w-full rounded-2xl bg-emerald-400 py-4 text-base font-black text-black hover:bg-emerald-300"
          >
            Sync to AHOLO
          </button>
        </aside>
      </main>

      <footer className="mt-5 rounded-3xl border border-white/10 bg-white/[0.03] p-5">
        <div className="flex flex-wrap gap-3 text-xs">
          <Badge active>草图理解</Badge>
          <Badge active>空间理解</Badge>
          <Badge active>材质</Badge>
          <Badge active>自动布局</Badge>
          <Badge>空间推演</Badge>
          <Badge>BIM 协同</Badge>
          <Badge>Multi-Agent</Badge>
        </div>
      </footer>
    </div>
  );
}

function CanvasCard({ title, subtitle, children }) {
  return (
    <div>
      <div className="mb-3">
        <p className="text-sm font-bold text-white">{title}</p>
        <p className="text-xs text-zinc-500">{subtitle}</p>
      </div>
      {children}
    </div>
  );
}

function Badge({ active, children }) {
  return (
    <span
      className={`rounded-full border px-3 py-1.5 ${
        active
          ? "border-emerald-400/40 bg-emerald-400/10 text-emerald-300"
          : "border-white/10 bg-white/[0.03] text-zinc-500"
      }`}
    >
      {children}
    </span>
  );
}