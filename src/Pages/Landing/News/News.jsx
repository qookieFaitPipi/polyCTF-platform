import React, { useEffect, useState } from 'react';
import styles from './News.module.scss';

// axios
import axios from 'axios';

import vector from './../../../Assets/images/background/newsVector.svg';

// import required modules
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import './styles.scss';

// redux
import { useDispatch } from 'react-redux';
import { selectNews } from '../../../Redux/slices/NewsSlice';

const News = () => {
  const dispatch = useDispatch();
  const [newsList, setNewsList] = useState([]);
  useEffect(() => {
    try {
      axios.get('https://hosting.alexavr.ru/api/get_news').then((response) => {
        if(response.status === 200) {
          setNewsList(response.data);
        }
      });
    } catch(err) {
      console.log(err);
    }
  }, []);


  const viewDetails = (title, text, image) => {
    dispatch(selectNews({
      detailModalState: true,
      title: title,
      text: text,
      image: image,
    }));
  }


  return (
    <div className={styles.news} style={{backgroundImage: `url(${vector})`}} id='scrollNews'>
      <div className={styles.content}>
        <div className={styles.title}>НОВОСТИ</div>
        <Swiper
          slidesPerView={'auto'}
          centeredSlides={true}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className="swiper2"
        >
          {newsList.map((obj) => {
            return <SwiperSlide onClick={() => viewDetails(obj.title, obj.text, obj.image)} style={{display: 'flex', flexDirection: 'column', width: 'auto', cursor: 'grab'}}>
              <img className={styles.image} src={obj.image} alt="" />
              <div className={styles.newsTitle}>{obj.title}</div>
              <hr className={styles.hr} />
            </SwiperSlide>
          })}
        </Swiper>
      </div>
    </div>
  )
}

export default React.memo(News);