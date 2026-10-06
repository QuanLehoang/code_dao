export const profile = {
  name: "Hoàng Quân",
  initials: "HQ",
  role: "Student • Developer • Creator",
  email: "hello@example.com",
  intro: "Một học sinh đam mê công nghệ và sáng tạo.",
  about: "Mình là một học sinh thích biến những ý tưởng nhỏ thành sản phẩm có thể chạm vào và sử dụng. Mỗi dòng code, mỗi bản thiết kế và mỗi lần thử sai đều là một phần thú vị của hành trình lớn lên.",
  nowLearning: "React & thiết kế trải nghiệm",
  nowBuilding: "Một vài dự án nhỏ xinh",
  stats: [{ value: "06+", label: "Dự án thử nghiệm" }, { value: "02+", label: "Năm học hỏi" }, { value: "09+", label: "Công nghệ khám phá" }],
};

export const socials = [
  { name: "Facebook", url: "https://facebook.com/your-username", icon: "facebook" },
  { name: "GitHub", url: "https://github.com/your-username", icon: "github" },
  { name: "Instagram", url: "https://instagram.com/your-username", icon: "instagram" },
  { name: "TikTok", url: "https://tiktok.com/@your-username", icon: "tiktok" },
  { name: "YouTube", url: "https://youtube.com/@your-username", icon: "youtube" },
  { name: "Discord", url: "https://discord.gg/your-invite", icon: "discord" },
];

export const passions = [
  { icon: "code", title: "Lập trình Web", description: "Tạo những góc nhỏ hữu ích trên internet.", interest: "Rất yêu thích", width: "w-[90%]", color: "blue" },
  { icon: "brain", title: "AI & công nghệ", description: "Tò mò về cách công nghệ thay đổi mọi thứ.", interest: "Đang khám phá", width: "w-[72%]", color: "yellow" },
  { icon: "palette", title: "Thiết kế UI/UX", description: "Làm cho trải nghiệm vừa đẹp vừa dễ dùng.", interest: "Rất yêu thích", width: "w-[86%]", color: "pink" },
  { icon: "rocket", title: "Sản phẩm cá nhân", description: "Từ ý tưởng trong đầu đến phiên bản đầu tiên.", interest: "Rất yêu thích", width: "w-[88%]", color: "green" },
  { icon: "bot", title: "Discord Bot / Server", description: "Xây cộng đồng và tự động hóa điều hay ho.", interest: "Đang phát triển", width: "w-[70%]", color: "lilac" },
  { icon: "video", title: "Sáng tạo nội dung", description: "Chia sẻ điều mình học theo cách của mình.", interest: "Đang khám phá", width: "w-[62%]", color: "peach" },
];

export const skills = [
  { category: "Ngôn ngữ", items: [{ name: "HTML & CSS", level: "Thành thạo" }, { name: "JavaScript / TypeScript", level: "Khá" }, { name: "Python", level: "Đang học" }] },
  { category: "Công nghệ", items: [{ name: "React", level: "Khá" }, { name: "Node.js", level: "Đang học" }, { name: "Docker", level: "Đang học" }] },
  { category: "Công cụ", items: [{ name: "Git & GitHub", level: "Khá" }, { name: "Figma", level: "Khá" }, { name: "VS Code", level: "Thành thạo" }] },
];

export type Project = { id: number; title: string; description: string; detail: string; status: "Đang phát triển" | "Hoàn thành" | "Ý tưởng"; stack: string[]; icon: string; color: string; github?: string; demo?: string };
export const projects: Project[] = [
  { id: 1, title: "Student Portfolio", description: "Một góc internet kể câu chuyện của mình.", detail: "Portfolio cá nhân để lưu lại hành trình học tập, các thử nghiệm và những dự án mình đang ấp ủ. Thiết kế theo tinh thần trẻ trung, gần gũi và luôn sẵn sàng để cập nhật.", status: "Đang phát triển", stack: ["React", "TypeScript", "Tailwind"], icon: "✳", color: "blue", github: "https://github.com/your-username/student-portfolio" },
  { id: 2, title: "Locket-style Photo App", description: "Chia sẻ những khoảnh khắc thật gần nhau.", detail: "Một ý tưởng ứng dụng chia sẻ ảnh nhanh dành cho bạn bè thân thiết, tập trung vào những khoảnh khắc tự nhiên trong ngày.", status: "Ý tưởng", stack: ["React", "Node.js", "Figma"], icon: "◉", color: "pink" },
  { id: 3, title: "Discord Bot System", description: "Một người bạn tự động cho cộng đồng.", detail: "Bot hỗ trợ quản lý server, chào thành viên mới và tạo các tương tác thú vị cho cộng đồng Discord.", status: "Đang phát triển", stack: ["JavaScript", "Node.js", "Discord"], icon: "⌘", color: "lilac", github: "https://github.com/your-username/discord-bot" },
  { id: 4, title: "Dictionary Web", description: "Học từ mới theo cách đơn giản hơn.", detail: "Trang tra cứu từ vựng nhỏ gọn với giao diện dễ tập trung, giúp việc học ngoại ngữ trở nên nhẹ nhàng hơn.", status: "Hoàn thành", stack: ["HTML", "CSS", "JavaScript"], icon: "Aa", color: "yellow", github: "https://github.com/your-username/dictionary-web" },
  { id: 5, title: "Exam Study Platform", description: "Không gian ôn tập dành cho học sinh.", detail: "Ý tưởng nền tảng gom tài liệu, câu hỏi luyện tập và mục tiêu học tập vào cùng một nơi cho bạn bè cùng ôn thi.", status: "Ý tưởng", stack: ["React", "TypeScript", "Figma"], icon: "✎", color: "green" },
  { id: 6, title: "Home Server Dashboard", description: "Theo dõi chiếc server nhỏ ở nhà.", detail: "Bảng điều khiển thử nghiệm giúp quan sát các dịch vụ, trạng thái hoạt động và tài nguyên của home server.", status: "Đang phát triển", stack: ["Docker", "React", "Node.js"], icon: "▦", color: "peach", github: "https://github.com/your-username/home-server-dashboard" },
];

export const journey = [
  { year: "2024", title: "Bắt đầu khám phá", description: "Lần đầu viết những dòng HTML, CSS và nhận ra: mình có thể tạo ra thứ gì đó từ con số không.", tags: ["HTML & CSS", "Trang web đầu tiên"], lesson: "Bắt đầu nhỏ cũng là bắt đầu." },
  { year: "2025", title: "Xây dựng nhiều dự án", description: "Thử JavaScript, Python, thiết kế giao diện và làm những dự án đầu tiên cùng bạn bè.", tags: ["JavaScript", "Python", "Dự án nhóm"], lesson: "Thử sai là một phần của việc học." },
  { year: "2026", title: "Phát triển sản phẩm cá nhân", description: "Tập trung vào trải nghiệm người dùng và biến ý tưởng thành những sản phẩm thật sự dùng được.", tags: ["React", "UI/UX", "Sản phẩm cá nhân"], lesson: "Làm tốt hơn một chút, mỗi ngày." },
];

export const bank = { name: "BANK_NAME", accountNumber: "ACCOUNT_NUMBER", accountName: "ACCOUNT_NAME", content: "UNG HO PORTFOLIO" };
