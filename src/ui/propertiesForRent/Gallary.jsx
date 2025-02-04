import { Carousel } from "react-bootstrap";

export default function Gallary() {
  return (
    <Carousel fade className="gallary">
      <Carousel.Item>
        <img src="/images/prop1.png" />
      </Carousel.Item>
      <Carousel.Item>
        <img src="/images/prop1.png" />
      </Carousel.Item>
      <Carousel.Item>
        <img src="/images/prop1.png" />
      </Carousel.Item>
    </Carousel>
  );
}
