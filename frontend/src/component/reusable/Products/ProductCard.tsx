import React from "react";

type ProductCardProps = {
  title: string;
  subtitle: string;
  message: string;
  price: string;
  image: string;
  link: string;
  colorCount: string;
};

const ProductCard: React.FC<ProductCardProps> = ({
  title,
  subtitle,
  message,
  price,
  image,
  link,
  colorCount,
}) => {
  return (
    <div className="product-card">
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
                className="product-card__hero-image"
                src={image}
              />
            </div>
          </a>
          <div className="product-card__info">
            <div className="product_msg_info">
              <div className="product-card__messaging">{message}</div>
              <div className="product-card__titles">
                <div className="product-card__title">{title}</div>
                <div className="product-card__subtitle">{subtitle}</div>
              </div>
            </div>
            <div className="product-card__count-wrapper">
              <div className="product-card__count-item">
                <button className="product-card__colorway-btn" type="button">
                  <div className="product-card__product-count">
                    {colorCount}
                  </div>
                </button>
              </div>
            </div>
            <div className="product-card__price-wrapper">
              <div className="product-card__price">MRP : {price}</div>
            </div>
          </div>
        </figure>
      </div>
    </div>
  );
};

export default ProductCard;
