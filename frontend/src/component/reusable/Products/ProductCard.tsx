import React from "react";
import "../../css/ProductCard.css";

type ProductCardProps = {
  title: string;
  subtitle: string;
  price: string;
  image: string;
  link: string;
  colorCount: string;
  hideFilters?: boolean;
};

const ProductCard: React.FC<ProductCardProps> = ({
  title,
  subtitle,
  price,
  image,
  link,
  colorCount,
  hideFilters = false,
}) => {
  return (
    <div className={`product-card ${hideFilters ? 'product-card--expanded' : ''}`}>
      <div className="product-card__body">
        <figure>
          <a className="product-card__link-overlay" href={link} tabIndex={-1}>
            {title}
          </a>
          <a
            aria-label={title}
            className="product-card__img-link-overlay"
            href={link}
          >
            <div className="wall-image-loader">
              <img
                alt={subtitle}
                className={`product-card__hero-image ${hideFilters ? 'product-card__hero-image--expanded' : ''}`}
                src={image}
              />
            </div>
          </a>
          <div className="product-card__info">
            <div className="product_msg_info">
              <div className="product-card__titles">
                <div className={`product-card__title ${hideFilters ? 'product-card__title--expanded' : ''}`}>{title}</div>
                <div className={`product-card__subtitle ${hideFilters ? 'product-card__subtitle--expanded' : ''}`}>{subtitle}</div>
              </div>
            </div>
            <div className="product-card__count-wrapper">
              <div className="product-card__count-item">
                <button className="product-card__colorway-btn" type="button">
                  <div className={`product-card__product-count ${hideFilters ? 'product-card__product-count--expanded' : ''}`}>
                    {colorCount}
                  </div>
                </button>
              </div>
            </div>
            <div className="product-card__price-wrapper">
              <div className={`product-card__price ${hideFilters ? 'product-card__price--expanded' : ''}`}>MRP : {price}</div>
            </div>
          </div>
        </figure>
      </div>
    </div>
  );
};

export default ProductCard;