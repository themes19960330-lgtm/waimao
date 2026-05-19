export type Locale = 'en' | 'zh';

export interface Dictionary {
  nav: {
    works: string;
    pricing: string;
    contact: string;
    clientPortal: string;
  };
  splash: {
    enter: string;
    entering: string;
    tagline: string;
    subSlogan: string;
    enterBtn: string;
  };
  hero: {
    greeting: string;
    title: string;
    subtitle: string;
    cta: string;
    scrollHint: string;
  };
  gallery: {
    title: string;
    subtitle: string;
    filterAll: string;
    filterBranding: string;
    filterDigital: string;
    filterPrint: string;
    viewProject: string;
  };
  pricing: {
    title: string;
    subtitle: string;
    description: string;
    toggleLabel: string;
    graphicDesign: string;
    viDesign: string;
    ecommerceDesign: string;
    withAfterSales: string;
    withoutAfterSales: string;
    popular: string;
    secureSlot: string;
    features: {
      revisions: string;
      sourceFile: string;
      commercialUse: string;
      research: string;
      concepts: string;
      moodboard: string;
      presentation: string;
      printReady: string;
      digitalAssets: string;
      styleGuide: string;
      brandStrategy: string;
      extendedSupport: string;
      productMockups: string;
      storeSetup: string;
      productListing: string;
      marketingAssets: string;
    };
  };
  contact: {
    title: string;
    subtitle: string;
    name: string;
    email: string;
    message: string;
    send: string;
    sending: string;
    success: string;
    error: string;
    placeholder: string;
    placeholderIdea: string;
  };
  footer: {
    rights: string;
    madeWith: string;
    slogan: string;
  };
  clientPortal: {
    title: string;
    orderId: string;
    status: string;
    deposit: string;
    finalPayment: string;
    download: string;
    preview: string;
    messages: string;
    statusLabels: {
      inProgress: string;
      review: string;
      completed: string;
    };
  };
}

const en: Dictionary = {
  nav: {
    works: 'Works',
    pricing: 'Investments',
    contact: 'Inquire',
    clientPortal: 'Client Portal',
  },
  splash: {
    enter: 'Enter',
    entering: 'Awakening...',
    tagline: 'Great design takes a little longer.',
    subSlogan: 'Wait a minute... Great design takes a little longer.',
    enterBtn: 'Begin the Visual Narrative',
  },
  hero: {
    greeting: '— WAM Visuals —',
    title: 'Wait a minute...',
    subtitle: 'We believe the most memorable designs are the ones that took a little longer to craft. No rush. No templates. Just honest, thoughtful visual storytelling.',
    cta: 'Explore Our Works',
    scrollHint: 'Scroll',
  },
  gallery: {
    title: 'Selected Works',
    subtitle: 'Each project is a conversation. Here are some of our recent dialogues with brands that refused to blend in.',
    filterAll: 'All',
    filterBranding: 'Branding',
    filterDigital: 'Digital',
    filterPrint: 'Print',
    viewProject: 'View Project',
  },
  pricing: {
    title: 'Investments',
    subtitle: 'Transparent pricing for thoughtful design. No hidden fees, no surprises.',
    description: 'Every design proposal is a long-term investment in your brand equity.',
    toggleLabel: 'Include After-sales Support',
    graphicDesign: 'Graphic Design',
    viDesign: 'Visual Identity',
    ecommerceDesign: 'E-commerce',
    withAfterSales: 'With After-sales',
    withoutAfterSales: 'Without After-sales',
    popular: 'Most Chosen',
    secureSlot: 'Secure Your Creative Slot',
    features: {
      revisions: 'Up to 3 rounds of revisions',
      sourceFile: 'Editable source files',
      commercialUse: 'Full commercial usage rights',
      research: 'In-depth market & competitor research',
      concepts: '3 unique design concepts',
      moodboard: 'Curated moodboard',
      presentation: 'Brand presentation deck',
      printReady: 'Print-ready files',
      digitalAssets: 'Digital asset package',
      styleGuide: 'Comprehensive brand guidelines',
      brandStrategy: 'Brand strategy workshop',
      extendedSupport: 'Extended support (3 months)',
      productMockups: 'Product mockups',
      storeSetup: 'Store setup assistance',
      productListing: 'Product listing optimization',
      marketingAssets: 'Marketing collateral suite',
    },
  },
  contact: {
    title: 'Let\'s Create Something',
    subtitle: 'Tell us about your vision. We\'ll take it from there.',
    name: 'Your Name',
    email: 'Your Email',
    message: 'Your Message',
    send: 'Send Inquiry',
    sending: 'Sending...',
    success: 'Thank you! We\'ll be in touch within 24 hours.',
    error: 'Something went wrong. Please try again.',
    placeholder: 'Tell us about your project, timeline, and budget...',
    placeholderIdea: 'Describe your vision, and we\'ll bring it to life.',
  },
  footer: {
    rights: 'All rights reserved.',
    madeWith: 'Crafted with patience',
    slogan: 'In an age of fast food, we choose to slow down and polish that 1% of irreplaceability.',
  },
  clientPortal: {
    title: 'Client Portal',
    orderId: 'Order ID',
    status: 'Status',
    deposit: 'Deposit',
    finalPayment: 'Final Payment',
    download: 'Download Files',
    preview: 'Preview',
    messages: 'Messages',
    statusLabels: {
      inProgress: 'In Progress',
      review: 'Awaiting Review',
      completed: 'Completed',
    },
  },
};

const zh: Dictionary = {
  nav: {
    works: '作品',
    pricing: '投资',
    contact: '咨询',
    clientPortal: '客户中心',
  },
  splash: {
    enter: '进入',
    entering: '正在唤醒...',
    tagline: '既然是好东西，晚一点，也没关系。',
    subSlogan: 'Wait a minute... Great design takes a little longer.',
    enterBtn: '开启视觉叙事',
  },
  hero: {
    greeting: '— 晚一点 视觉设计 —',
    title: '晚一点，是为了给视觉留出觉醒的时间。',
    subtitle: 'WAM Visuals 致力于为先锋品牌提供极致、纯粹且具有时间张力的视觉表达。',
    cta: '探索作品',
    scrollHint: '向下滚动',
  },
  gallery: {
    title: '精选作品',
    subtitle: '每一个项目都是一场对话。以下是我们与那些不愿随波逐流的品牌，最近的一些交流。',
    filterAll: '全部',
    filterBranding: '品牌',
    filterDigital: '数字',
    filterPrint: '印刷',
    viewProject: '查看项目',
  },
  pricing: {
    title: '诚意与投入',
    subtitle: '透明的定价，深思熟虑的设计。没有隐藏费用，没有意外。',
    description: '每一份设计方案都是关于品牌资产的长期投资。',
    toggleLabel: '包含售后保障',
    graphicDesign: '平面设计',
    viDesign: '视觉识别',
    ecommerceDesign: '电商设计',
    withAfterSales: '含售后',
    withoutAfterSales: '不含售后',
    popular: '最受欢迎',
    secureSlot: '预约创作席位',
    features: {
      revisions: '最多 3 轮修改',
      sourceFile: '可编辑源文件',
      commercialUse: '完整商业使用权',
      research: '深度市场与竞品调研',
      concepts: '3 个独特设计方案',
      moodboard: '定制情绪板',
      presentation: '品牌提案演示',
      printReady: '印刷就绪文件',
      digitalAssets: '数字资产包',
      styleGuide: '完整品牌指南手册',
      brandStrategy: '品牌策略工作坊',
      extendedSupport: '延长售后支持（3个月）',
      productMockups: '产品样机',
      storeSetup: '店铺搭建协助',
      productListing: '产品上架优化',
      marketingAssets: '营销物料套件',
    },
  },
  contact: {
    title: '预约创作席位',
    subtitle: '告诉我们你的愿景，剩下的交给我们。',
    name: '你的姓名',
    email: '你的邮箱',
    message: '你的留言',
    send: '发送咨询',
    sending: '发送中...',
    success: '感谢！我们将在 24 小时内与你联系。',
    error: '出了点问题，请重试。',
    placeholder: '请描述你的项目、时间线和预算...',
    placeholderIdea: '描述您的愿景，我们一起将其实现。',
  },
  footer: {
    rights: '版权所有。',
    madeWith: '用心打磨',
    slogan: '在这个快餐时代，我们选择慢下来，去打磨那 1% 的不可替代。',
  },
  clientPortal: {
    title: '客户中心',
    orderId: '订单编号',
    status: '状态',
    deposit: '定金',
    finalPayment: '尾款',
    download: '下载文件',
    preview: '预览',
    messages: '消息',
    statusLabels: {
      inProgress: '进行中',
      review: '待审核',
      completed: '已完成',
    },
  },
};

export const dictionaries: Record<Locale, Dictionary> = { en, zh };
