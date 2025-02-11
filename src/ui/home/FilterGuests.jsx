export default function FilterGuests() {
  return (
    <div>
      <p>يسع هذا المنزل 2 ضيوفبخلاف الرضع و لا يسمح باحضار الحيوانات الاليفه</p>
      <p>
        اشار المضيف الي ن مسكنه يخختوي علي مميزات غير ملائمه للاطفالالصغار و اذا
        لازلت مهتما يرجى ارسال طلب حجز للمضيف للحصول علي المزيد من التفاصيل{" "}
      </p>
      <div className="body">
        <div className="counter-field">
          <h6>
            <span>بالغون</span>
            <span>العمر +13</span>
          </h6>
          <div className="counter-input">
            <button>
              <i className="fa-regular fa-minus"></i>
            </button>
            <input type="number" value={1} />
            <button>
              <i className="fa-regular fa-plus"></i>
            </button>
          </div>
        </div>
        <div className="counter-field">
          <h6>
            <span>الاطفال</span>
            <span>الاعمار من 2 الي 12</span>
          </h6>
          <div className="counter-input">
            <button>
              <i className="fa-regular fa-minus"></i>
            </button>
            <input type="number" value={1} />
            <button>
              <i className="fa-regular fa-plus"></i>
            </button>
          </div>
        </div>

        <div className="counter-field">
          <h6>
            <span>الحيوانات الاليفه</span>
            <span>هل ستحضر حيوانات اليفه</span>
          </h6>
          <div className="counter-input">
            <button>
              <i className="fa-regular fa-minus"></i>
            </button>
            <input type="number" value={1} />
            <button>
              <i className="fa-regular fa-plus"></i>
            </button>
          </div>
        </div>
        <div className="counter-field">
          <h6>
            <span>الرضع</span>
            <span>اصغر من 2</span>
          </h6>
          <div className="counter-input">
            <button>
              <i className="fa-regular fa-minus"></i>
            </button>
            <input type="number" value={1} />
            <button>
              <i className="fa-regular fa-plus"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
