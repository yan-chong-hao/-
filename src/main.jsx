import { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './style.css'
import './gallery.css'

const workFolders = {
  '风景': 'dji_fly_20251025_173724_0248_1761478870384_photo.jpg|dji_fly_20251025_173640_0246_1761478802868_photo.jpg|dji_fly_20251025_173724_0248_1761478870384_photo_副本.jpg|DJI_20250830173522_0158_D.jpg',
  '婚礼': 'DSC_7003.jpg|DSC_7489.jpg|DSC_7066.jpg|DSC_7067.jpg|DSC_7110.jpg|DSC_6949.jpg|DSC_7060.jpg|DJI_20251019111728_0226_D.jpg|DSC_7088.jpg|DSC_7442.jpg|DSC_6986.jpg|DSC_7109.jpg|DSC_7108.jpg|DSC_7081.jpg|DSC_7057.jpg|DSC_7080.jpg|DSC_7490.jpg|DSC_7024.jpg|DSC_7033.jpg',
  '人像': '战国袍/IMG_4391.jpg|亲子/9f3570d19sd9ffbccf7ffe73f27bed55.jpg|亲子/a44d5032an07fef260426aa6a95a9972.jpg|亲子/8a83f65bbv71428930c78da22d12dcb7.jpg|亲子/6df8c0950vb16b97c232d3f52010ff2f.jpg|亲子/73c487912kca8225aefc9d2a9ab4956c.jpg|亲子/49c295b29i7b3670beb7d409e29f2e99.jpg|亲子/8d20d8634mf7f6cb25dbe95173bc0900.jpg|亲子/d2711b2c4o452f38e2525e6dc17b7e7b.jpg|个人/kk/0bdc1b766hd412438ecbf48f5295045b.jpg|个人/kk/397ba275ev4629be603a45f70eb40ba8.jpg|个人/kk/26f73bdd3sfb308714180393314f2f93.jpg|个人/kk/fbd68b210se3a2376da0b9b281970ab3.jpg|个人/柚子/DSC_2382.jpg|个人/柚子/DSC_2446.jpg|个人/柚子/DSC_2444.jpg|个人/柚子/DSC_2403.jpg|个人/小鹏/c6fdefbcbh95b7407090f5f480526928.jpg|个人/小鹏/8e8d5bfb9l861134b12f7e2c6819bb36.jpg|个人/小鹏/505c16dd7r50fd7c7c36373a430d0d04.jpg|个人/小鹏/a790e8f13n59986d193bebdc7d1518e8.jpg|个人/嘉怡/825d4cc2bn310596382351fb135116e6.jpg|个人/嘉怡/f20da9ee4j2364032a8d51855a6c0379.jpg|个人/嘉怡/cf7ea463fo807d0b57ff69e9303082da.jpg|个人/嘉怡/1a768811fj4893d41792c6f2d9383368.jpg|个人/星月/DSC_1211.jpg|个人/星月/DSC_1199.jpg|个人/星月/DSC_1204.jpg|个人/星月/DSC_1169.jpg|个人/伟墨/60.jpg|个人/伟墨/49.jpg|个人/伟墨/57.jpg|个人/伟墨/54.jpg|个人/伟墨/47.jpg|个人/伟墨/52.jpg|个人/小羊/0877a8a43o74f5d016204401c7fef8a1.jpg|个人/小羊/a58589d6en735557d0cf7dbc14134cd8.jpg|个人/小羊/8f6b51c5dhb3b492d4cf0ac1e93b5bf2.jpg|个人/小羊/d1b8c6952o2a3aa39b20838dd3115ebc.jpg|个人/星星/DSC_3699.jpg|个人/星星/DSC_3855.jpg|个人/星星/DSC_3705.jpg|个人/星星/DSC_3890.jpg|个人/星星/DSC_3853.jpg|个人/星星/DSC_3759.jpg|个人/星星/DSC_3834.jpg|个人/星星/DSC_3829.jpg|个人/星星/DSC_3753.jpg|个人/星星/DSC_3784.jpg|个人/星星/DSC_3807.jpg|个人/星星/DSC_3741.jpg|个人/星星/DSC_3849.jpg|个人/星星/DSC_3727.jpg|个人/星星/DSC_3876.jpg|个人/星星/DSC_3725.jpg',
  '建筑': '公区选片DSCF9764.jpg|公区选片DSCF9981.jpg|公区选片DSCF9659.jpg|DJI_20250103115927_0180_D 拷贝.jpg|公区选片DSCF9662.jpg|DSC01870.jpg|公区选片DSCF9678.jpg|公区选片DSCF9734.jpg|公区选片DSCF9975.jpg|DJI_20250103195230_0201_D.jpg|公区选片DSCF9740.jpg|公区选片DSCF9743.jpg'
}
const works = Object.entries(workFolders).flatMap(([category, names]) => names.split('|').map((name) => ({ category, name, path: `/works/${category}/${name}`, collection: name.split('/').slice(0, -1).join(' / ') || category })))

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState('全部')
  const [activeImage, setActiveImage] = useState(null)
  useEffect(() => {
    const reveal = new IntersectionObserver((items) => items.forEach((item) => item.isIntersecting && item.target.classList.add('in')), { threshold: .12 })
    document.querySelectorAll('.reveal').forEach((el) => reveal.observe(el))
    return () => reveal.disconnect()
  }, [])
  const go = (id) => { document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' }); setMenuOpen(false) }
  const visibleWorks = activeCategory === '全部' ? works : works.filter((work) => work.category === activeCategory)
  return <main>
    <section className="hero" id="top">
      <video className="hero-video" autoPlay muted loop playsInline poster="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=2000&q=85">
        <source src="https://cdn.coverr.co/videos/coverr-a-camera-lens-in-the-dark-1578/1080p.mp4" type="video/mp4" />
      </video>
      <div className="hero-shade" />
      <nav className="nav wrap"><a className="mark" href="#top">YCH<span>®</span></a><div className={'nav-links '+(menuOpen?'show':'')}><button onClick={()=>go('#about')}>ABOUT</button><button onClick={()=>go('#work')}>WORK</button><button onClick={()=>go('#capabilities')}>CAPABILITIES</button></div><button className="contact-chip" onClick={()=>go('#contact')}>START A CONVERSATION <i>↗</i></button><button className="menu" onClick={()=>setMenuOpen(!menuOpen)} aria-label="菜单">☰</button></nav>
      <div className="hero-copy wrap"><p className="eyebrow">PHOTOGRAPHY / FILM / VISUAL STORYTELLING</p><h1><span>FRAME</span><em>THE</em><span>UNSEEN.</span></h1><div className="hero-bottom"><p>严崇豪<br/>摄影摄像 / SHENZHEN</p><button className="circle-button" onClick={()=>go('#work')}>EXPLORE<br/><b>↓</b></button></div></div>
      <div className="scanline" />
    </section>

    <section className="about section wrap" id="about"><div className="section-label reveal"><span>01</span> ABOUT / 个人经历</div><div className="about-grid"><div className="portrait reveal"><img src="/profile/yan-chonghao.jpg" alt="严崇豪"/><small>YAN CHONGHAO<br/>PHOTOGRAPHY / FILM</small></div><div className="about-text reveal"><p className="large">以镜头捕捉人物的情绪与空间里的微光。<br/>从视觉表达出发，把每一次拍摄变成有温度的叙事。</p><div className="bio"><p>严崇豪，视觉传达设计专业背景，专注摄影摄像。拥有独立摄影工作室运营经验，亦曾在深圳梅沙实业有限公司从事摄影工作。</p><p>擅长人像写真、旅拍与自然光影表达；覆盖前期沟通与方案策划、现场拍摄、后期修图及视频制作，也具备小红书、抖音内容运营经验。</p></div><button className="text-link" onClick={()=>go('#contact')}>合作咨询 <span>↗</span></button></div></div><div className="metrics reveal"><div><b>88<span>%</span></b><p>摄影</p></div><div><b>80<span>%</span></b><p>摄像</p></div><div><b>76<span>%</span></b><p>汽车改装</p></div><div><b>66<span>%</span></b><p>数码产品</p></div></div></section>

    <section className="work section" id="work"><div className="wrap"><div className="section-label reveal"><span>02</span> SELECTED WORK / 作品集</div><div className="work-heading reveal"><h2>SELECTED<br/><i>FRAMES</i></h2><p>已导入 {works.length} 张真实作品。<br/>按你的原始文件夹分类浏览。</p></div><div className="filters reveal">{['全部', ...Object.keys(workFolders)].map((category) => <button key={category} className={activeCategory === category ? 'active' : ''} onClick={() => setActiveCategory(category)}>{category}<span>{category === '全部' ? works.length : works.filter((work) => work.category === category).length}</span></button>)}</div><div className="gallery">{visibleWorks.map((work, index) => <button className="gallery-item reveal" key={work.path} onClick={() => setActiveImage(work)}><img src={work.path} alt={`${work.category} ${work.collection}`} loading={index < 12 ? 'eager' : 'lazy'}/><span><i>{work.category}</i><b>{work.collection}</b><em>VIEW ↗</em></span></button>)}</div></div></section>

    <section className="capabilities section wrap" id="capabilities"><div className="section-label reveal"><span>03</span> CAPABILITIES / 个人优势</div><div className="cap-head reveal"><h2>FROM IDEA<br/>TO <i>IMAGE.</i></h2><p>从沟通、策划到交付，以完整流程服务每一个拍摄现场。</p></div><div className="cap-grid">{[['01','PHOTOGRAPHY','人像写真、旅拍与自然光影的观察及表达。'],['02','FILM & POST','摄影摄像与视频后期；熟悉 Lightroom、Photoshop 等工具。'],['03','PROJECT FLOW','客户沟通、方案策划与项目落地协同。'],['04','CONTENT SENSE','理解小红书、抖音等内容平台的视觉传播节奏。']].map(([n,t,d])=><article className="cap-card reveal" key={n}><span>{n}</span><h3>{t}</h3><p>{d}</p><i>✦</i></article>)}</div></section>

    <section className="contact" id="contact"><div className="contact-orb"/><div className="contact-inner wrap reveal"><p className="eyebrow">LET'S MAKE SOMETHING THAT LASTS</p><h2>LET'S<br/><i>CONNECT.</i></h2><p className="contact-note">欢迎就摄影、摄像及内容创作合作沟通。<br/>具体联系方式可替换为简历中的电话、邮箱或社交账号。</p><a className="contact-cta" href="#top">BACK TO TOP <span>↑</span></a><footer><span>© 2026 YAN CHONGHAO</span><span>PHOTOGRAPHY / FILM</span></footer></div></section>{activeImage && <div className="lightbox" role="dialog" aria-label="作品预览" onClick={() => setActiveImage(null)}><button className="lightbox-close" onClick={() => setActiveImage(null)}>CLOSE ×</button><img src={activeImage.path} alt={`${activeImage.category} ${activeImage.collection}`} onClick={(event) => event.stopPropagation()}/><p>{activeImage.category} / {activeImage.collection}</p></div>}
  </main>
}

createRoot(document.getElementById('root')).render(<App />)
