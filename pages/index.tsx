import { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import Image from "next/image";
import logo from "@public/logo.png";
import EditCategoryPanel from "@components/EditCategoryPanel";
import HomeMenu from "@components/HomeMenu";
import Triangle from "@components/Shapes/Triangle";
import ImgSlider from "@components/ImgSlider";
import Footer from "@components/layouts/Footer";
import useElementOnScreenOnce from "@hooks/useElementOnScreenOnce";
import { useAppDispatch, useAppSelector } from "@hooks/redux";
import { setCategory } from "@store/reducers/category/categorySlice";
import { ICategory } from "types/ICategory";
import { CategoryType } from "types/CategoryType";
import cl from "@styles/Home.module.sass";
import description_img from "@public/second_section_photo.jpg";

interface HomeProps {
  fetchedCategories: ICategory[];
  type: CategoryType;
}

const Home: React.FC<HomeProps> = ({ fetchedCategories, type }) => {
  const [scroll, setScroll] = useState<number>(0);
  const [animRef, isVisible] = useElementOnScreenOnce({
    root: null,
    rootMargin: "-100px",
    treshold: 1.0,
  });
  const dispatch = useAppDispatch();
  const { categories } = useAppSelector((state) => state.categoryReducer);

  useEffect(() => {
    dispatch(setCategory(fetchedCategories));
  }, [dispatch, fetchedCategories]);

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
          priority
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
          >
            <Image
              className={cl.description_img__img}
              fill
              sizes="50vw"
              src={description_img}
              alt=""
            />
          </div>
          <Triangle
            fill="true"
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
          <h1>Gothelph Design</h1>
          <p>Gothelph - жуткий кошмар любого мидгардского сметрного.</p>
          <p>
            Дэто не типичная коммерческая организация с пресным обслуживанием и
            трепетным отношением к клиентам, а сверхмрачный творческий проект с
            широким спектром услуг, магазин готической одежды для самых
            бурзумных и безбашенных смертных.
          </p>
          <p>
            Здесь перетягивают мотосиденья и рули автомобиля; рисуют портреты и
            эскизы; создают специфичную одежду, вдохновляясь готикой, тяжелой
            музыкой, культурой азиатских и скандинавских стран.{" "}
          </p>
          <p>
            Также здесь можно закастомить свою одежду, сделав из обычного
            повседневного атрибута предмет искусства и восхищения целевой массы.
          </p>
        </div>
      </div>
      <div className={cl.third_section}>
        <h2 className={cl.textXL}>ПРЕИМУЩЕСТВА</h2>
        <EditCategoryPanel className={cl.edit_panel} type={type} addBtn />
        <ImgSlider type={type} categories={categories || []} />
      </div>
      <div className={cl.footer}>
        <Footer />
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const type = "benefits";
  const res = await fetch(process.env.API_URL + "/category?type=" + type);
  const data = await res.json();
  return { props: { fetchedCategories: data, type: type } };
};

export default Home;
