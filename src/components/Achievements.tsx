import { useState } from "react";
import { Calendar, Trophy, X } from "lucide-react";

const achievements = [
  {
    title: "Giải Vovinam Con Đường Võ Đạo Lần 1",
    year: "20/8/2026 - 23/8/2026",
    description:
      "Những thành tích và trải nghiệm đáng nhớ trong quá trình tập luyện và thi đấu Vovinam.",
    image: "/achievements/vo1.jpg",
    medal: "/achievements/Huychuong1.png",
  },
    {
    title: "Giải vô địch các clb Vovinam Nghệ An lần thứ IV",
    year: "23/10/2025 – 26/10/2025",
    description:
      "Cọ sát và học hỏi kinh nghiệm thi đấu",
    image: "/achievements/vo2.jpg",
    medal: "/achievements/Huychuong2.png",
  },
  {
    title: "Giải bóng đã do xã Kim Liên tổ chức",
    year: "14/072026 - 30/07/2026",
    description:
      "Giành giải ba trong giải bóng đá do xã Kim Liên tổ chức, trải nghiệm và học hỏi kinh nghiệm thi đấu.",
    image: "/achievements/bong1.jpg",
    medal: "/achievements/Huychuong3.png",
  },
  {
    title: "Dự án cá nhân",
    year: "2025 - 2026",
    description:
      "Những website, ứng dụng và sản phẩm công nghệ được tự lên ý tưởng và phát triển.",
    image: "/achievements/du-an.jpg",
  },
  {
    title: "Cuộc thi & hoạt động",
    year: "2024 - 2026",
    description:
      "Những trải nghiệm trong các cuộc thi, hoạt động học tập và công nghệ.",
    image: "/achievements/cuoc-thi.jpg",
  },
];

export default function Achievements() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <>
      <section id="achievements" className="section achievements-section">
        <div className="container">
          <div className="achievements-heading">
            <span className="eyebrow">
              <span className="eyebrow-dot" />
              03 / THÀNH TỰU
            </span>

            <h2>
              Những dấu mốc <em>đáng nhớ.</em>
            </h2>

            <p>
              Trong hành trình học tập và theo đuổi công nghệ, mình đã từng
              bước tích lũy nhiều trải nghiệm thông qua lập trình, thể thao
              và các hoạt động sáng tạo. Mỗi thành tựu là một dấu mốc ghi lại
              quá trình học hỏi và phát triển bản thân.
            </p>
          </div>

          <div className="achievement-grid">
            {achievements.map((item) => (
              <article className="achievement-card" key={item.title}>
                <div className="achievement-image">
                  <img
                    src={item.image}
                    alt={item.title}
                    onClick={() => setSelectedImage(item.image)}
                  />

                  {item.medal && (
                    <img
                      className="achievement-medal"
                      src={item.medal}
                      alt="Huy chương Vovinam Nghệ An"
                    />
                  )}

                  <button
                    type="button"
                    className="achievement-view"
                    onClick={() => setSelectedImage(item.image)}
                  >
                    Xem ảnh
                  </button>
                </div>

                <div className="achievement-content">
                  <div className="achievement-meta">
                    <span className="achievement-icon">
                      <Trophy size={16} />
                    </span>

                    <span>
                      <Calendar size={14} />
                      {item.year}
                    </span>
                  </div>

                  <h3>{item.title}</h3>

                  <p>{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {selectedImage && (
        <div
          className="achievement-lightbox"
          onClick={() => setSelectedImage(null)}
        >
          <button
            type="button"
            className="achievement-close"
            onClick={() => setSelectedImage(null)}
            aria-label="Đóng ảnh"
          >
            <X size={24} />
          </button>

          <img
            src={selectedImage}
            alt="Thành tựu"
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}