// import SectionHeader from "../ui/SectionHeader";
// import InputField from "../ui/form/InputField";
// import SubmitButton from "../ui/form/SubmitButton";
// import TextareaField from "../ui/form/TextareaField";

// export default function BlogsDetails() {
//   return (
//     <>
//       <SectionHeader link="Blog Details" />
//       <section className="blog-details">
//         <div className="container">
//           <div className="row">
//             <div className="col-12 col-xl-8 col-lg-7">
//               <div className="blog-post-details">
//                 <h2>The whimsically named Egg Canvas brainchild</h2>
//                 <div className="post-meta">
//                   <span>
//                     <i className="fa-solid fa-user"></i>
//                     mahmoud
//                   </span>
//                   <span>
//                     <i className="fa-solid fa-message"></i>
//                     15 comments
//                   </span>
//                   <span>
//                     <i className="fa-solid fa-calendar"></i>
//                     4th February 2025
//                   </span>
//                 </div>
//                 <div className="post-image-wrapper">
//                   <img src="/images/post.jpg" />
//                 </div>
//                 <p>
//                   he whimsically named Egg Canvas is the brainchild of Erica
//                   Choi, a design director and photo Sit amet consect velit
//                   integer tincidunt scelerisque volutpat neque fermeny massa
//                   lacus. grapher based in York. Why the name “Egg Canvas Erica
//                   was inspired by her Korean childhood nickname, which means egg
//                   while “canvas” medium with wh art is created. “Egg Canvas
//                   therefore, is her life—creating beautiful things each day a
//                   blank canvas. We have covered many special events such as
//                   fireworks, fairs, parades, races, walks, awards ceremonies,
//                   fashion shows, sporting events, and even a memorial service.
//                 </p>
//               </div>
//               <div className="comments">
//                 <h4 className="comments-heading">02 comments</h4>
//                 <ul className="comments-items-list">
//                   <li>
//                     <div className="auther-image">
//                       <img src="/images/avatar.png" alt="user" />
//                     </div>
//                     <div className="author-info-comment">
//                       <div className="info">
//                         <h5>Maahmoud</h5>
//                         <span>25 january 2021</span>
//                       </div>

//                       <p className="comment-text">
//                         Lorem ipsum dolor sit amet, consectetur adipisicing
//                         elit, sed do eiusmod tempor incididunt ut labore et
//                         dolore magna. Ut enim ad minim veniam, quis nostrud
//                         laboris nisi ut aliquip ex ea commodo consequat.
//                       </p>
//                     </div>
//                   </li>
//                   <li>
//                     <div className="auther-image">
//                       <img src="/images/avatar.png" alt="user" />
//                     </div>
//                     <div className="author-info-comment">
//                       <div className="info">
//                         <h5>Maahmoud</h5>
//                         <span>25 january 2021</span>
//                       </div>
//                       <div className="comment-text">
//                         <p>
//                           Lorem ipsum dolor sit amet, consectetur adipisicing
//                           elit, sed do eiusmod tempor incididunt ut labore et
//                           dolore magna. Ut enim ad minim veniam, quis nostrud
//                           laboris nisi ut aliquip ex ea commodo consequat.
//                         </p>
//                       </div>
//                     </div>
//                   </li>
//                 </ul>
//               </div>
//               <div className="post-comment">
//                 <h3>Post comment</h3>
//                 <div className="form">
//                   <TextareaField
//                     placeholder="Your Comment"
//                     label={"Enter Your Comment"}
//                   />
//                   <InputField placeholder="Your Name" label={"Your Name"} />
//                   <InputField placeholder="Your Email" label={"Your Email"} />
//                   <div>
//                     <SubmitButton text={"send"} />
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="col-12 col-xl-4 col-lg-5">
//               <div className="sidebar-widget">
//                 <h3>Popular Feeds</h3>

//                 {Array(3)
//                   .fill()
//                   .map((_, i) => (
//                     <div key={i} className="popular-post-card">
//                       <div className="image">
//                         <img src="/images/pp1.jpg" alt="post" />
//                       </div>
//                       <div className="post-content">
//                         <h5>Budget Issues Force The Our To Become</h5>
//                         <p>
//                           <i className="fa-solid fa-calendar"></i> 25 january
//                           2021
//                         </p>
//                       </div>
//                     </div>
//                   ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// }
import { useTranslation } from "react-i18next";
import SectionHeader from "../ui/SectionHeader";
import InputField from "../ui/form/InputField";
import SubmitButton from "../ui/form/SubmitButton";
import TextareaField from "../ui/form/TextareaField";

export default function BlogsDetails() {
  const { t } = useTranslation();

  return (
    <>
      <SectionHeader link={t("blogDetails.pageTitle")} />
      <section className="blog-details">
        <div className="container">
          <div className="row g-3">
            <div className="col-12 col-xl-8 col-lg-7">
              <div className="blog-post-details">
                <h2>The whimsically named Egg Canvas brainchild</h2>
                <div className="post-meta">
                  <span>
                    <i className="fa-solid fa-user"></i>
                    {t("blogDetails.by")} محمود
                  </span>
                  <span>
                    <i className="fa-solid fa-message"></i>
                    15 {t("blogDetails.comments")}
                  </span>
                  <span>
                    <i className="fa-solid fa-calendar"></i>
                    {t("blogDetails.publishedOn")} 4 فبراير 2025
                  </span>
                </div>
                <div className="post-image-wrapper">
                  <img src="/images/post.jpg" />
                </div>
                <p>{/* Your blog content remains here */}</p>
              </div>
              <div className="comments">
                <h4 className="comments-heading">
                  02 {t("blogDetails.comments")}
                </h4>
                <ul className="comments-items-list">
                  <li>
                    <div className="auther-image">
                      <img src="/images/avatar.png" alt="user" />
                    </div>
                    <div className="author-info-comment">
                      <div className="info">
                        <h5>Mahmoud</h5>
                        <span>25 january 2021</span>
                      </div>

                      <p className="comment-text">
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit, sed do eiusmod tempor incididunt ut labore et
                        dolore magna. Ut enim ad minim veniam, quis nostrud
                        laboris nisi ut aliquip ex ea commodo consequat.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="auther-image">
                      <img src="/images/avatar.png" alt="user" />
                    </div>
                    <div className="author-info-comment">
                      <div className="info">
                        <h5>Maahmoud</h5>
                        <span>25 january 2021</span>
                      </div>
                      <div className="comment-text">
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna. Ut enim ad minim veniam, quis nostrud
                          laboris nisi ut aliquip ex ea commodo consequat.
                        </p>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="post-comment">
                <h3>{t("blogDetails.postComment")}</h3>
                <div className="form">
                  <TextareaField
                    placeholder={t("blogDetails.writeComment")}
                    label={t("blogDetails.writeComment")}
                  />
                  <InputField
                    placeholder={t("blogDetails.name")}
                    label={t("blogDetails.name")}
                  />
                  <InputField
                    placeholder={t("blogDetails.email")}
                    label={t("blogDetails.email")}
                  />
                  <div>
                    <SubmitButton text={t("blogDetails.send")} />
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 col-xl-4 col-lg-5">
              <div className="sidebar-widget">
                <h3>{t("blogDetails.popularFeeds")}</h3>
                {Array(3)
                  .fill()
                  .map((_, i) => (
                    <div key={i} className="popular-post-card">
                      <div className="image">
                        <img src="/images/pp1.jpg" alt="post" />
                      </div>
                      <div className="post-content">
                        <h5>Budget Issues Force The Our To Become</h5>
                        <p>
                          <i className="fa-solid fa-calendar"></i> 25 يناير 2021
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
