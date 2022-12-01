import cl from "../styles/Home.module.sass";
import logo from "../public/logo.png";
import Image from "next/image";
import { useEffect, useState } from "react";
import HomeMenu from "../components/HomeMenu";
import Triangle from "../components/Shapes/Triangle";
import ImgSlider from "../components/ImgSlider";
import Footer from "../components/Footer";
import useElementOnScreenOnce from "../hooks/useElementOnScreenOnce";

export default function Home() {
  const [scroll, setScroll] = useState<number>(0);
  const [animRef, isVisible] = useElementOnScreenOnce({
    root: null,
    rootMargin: "-100px",
    treshold: 1.0,
  });
  

  useEffect(() => {
    document.addEventListener("scroll", () => {
      const s =
        document.scrollingElement!.scrollTop /
        document.scrollingElement!.clientHeight /
        4;
      setScroll(s);
    });
  }, []);


  return (
    <>
      <div className={cl.scroll_animation}>
        <div className={cl.logo_background}></div>
        <Image
          style={{ animationDelay: -scroll + "s" }}
          className={cl.logo}
          src={logo}
          alt=""
        />
        <div style={{ animationDelay: -scroll + "s" }} className={cl.title}>
          <span>УСЛУГИ</span>
        </div>
        <HomeMenu scroll={scroll} />
      </div>
      <div className={cl.second_section}>
        <div className={cl.description_img}>
          <div
            ref={animRef}
            className={isVisible ? [cl.img, cl._anim].join(" ") : cl.img}
          ></div>
          <Triangle
            className={
              isVisible ? [cl.triangle1, cl._anim].join(" ") : cl.triangle1
            }
          />
          <Triangle
            className={
              isVisible ? [cl.triangle2, cl._anim].join(" ") : cl.triangle2
            }
          />
        </div>
        <div className={cl.description}>
          <span className={cl.textXL}>Приветствия</span>
          <p>
            Описание и всё такое.
            <br />
            <br />
            AIGUL KASSYMOVA – это бренд одежды, созданный в 2006 году дизайнером
            Айгуль Касымовой. Компания начала свой пусть в 1997 году с создания
            ателье, которое успешно функционирует и по сей день. Бренд
            производит и продает женскую одежду и аксессуары в Казахстане и за
            его пределами. Отдельной линией AIGUL KASSYMOVA выделяет
            национальную одежду, интегрируя ее в современном мире, а также
            создание свадебных платьев.
            <br />
            <br />
            За тринадцать лет существования зарекомендовал себя как узнаваемый и
            динамично развивающийся бренд. Также AIGUL KASSYMOVA участвовал в
            международных неделях моды по всему миру. Бренд стремительно
            приобретает известность на мировом уровне с 2016 года представлен на
            выставке Pitti Super в Милане.
            <br />
            <br />
            Мы очень ценим доверие наших клиентов, поэтому всегда стремимся к
            отличному сервису и качеству наших изделий.
          </p>
        </div>
      </div>
      <div className={cl.third_section}>
        <h2 className={cl.textXL}>ПРЕИМУЩЕСТВА</h2>
        <ImgSlider />
      </div>
      <div style={{ backgroundColor: "#fff", position: "sticky" }}>
        <Footer />
      </div>
    </>
  );
}
