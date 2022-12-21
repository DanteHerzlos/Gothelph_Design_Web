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
          <h2>Приветствия</h2>
          <p>Описание и всё такое.</p>
          <p>
            AIGUL KASSYMOVA – это бренд одежды, созданный в 2006 году дизайнером
            Айгуль Касымовой. Компания начала свой пусть в 1997 году с создания
            ателье, которое успешно функционирует и по сей день. Бренд
            производит и продает женскую одежду и аксессуары в Казахстане и за
            его пределами. Отдельной линией AIGUL KASSYMOVA выделяет
            национальную одежду, интегрируя ее в современном мире, а также
            создание свадебных платьев.
          </p>
          <p>
            За тринадцать лет существования зарекомендовал себя как узнаваемый и
            динамично развивающийся бренд. Также AIGUL KASSYMOVA участвовал в
            международных неделях моды по всему миру. Бренд стремительно
            приобретает известность на мировом уровне с 2016 года представлен на
            выставке Pitti Super в Милане.
          </p>
          <p>
            Мы очень ценим доверие наших клиентов, поэтому всегда стремимся к
            отличному сервису и качеству наших изделий.
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
