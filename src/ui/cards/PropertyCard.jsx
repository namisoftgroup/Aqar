export default function PropertyCard() {
  return (
    <div className="properties">
      <div className="image_card">
        <img src="/images/proparty.png" />
        <button>
          <i className="fa-light fa-heart"></i>
        </button>
      </div>
      <div className="card_info">
        <h2>فيلا للأيجار</h2>
        <section className="info">
          <p>
            <span> 250,000 ريال / سنوي</span>
          </p>
          <div className="flat-details">
            <span>
              100 <i className="fa-sharp fa-light fa-bath"></i>
            </span>
            <span>
              5 <i className="fa-thin fa-bed-front"></i>
            </span>
            <span>
              3 <i className="fa-regular fa-couch"></i>
            </span>
            <span>
              3 <i className="fa-sharp fa-light fa-bath"></i>
            </span>
          </div>

          <p>
            <span>شارع الحمسه،حي الرياض، فيلا ١٨</span>
          </p>
        </section>
      </div>
    </div>
  );
}
