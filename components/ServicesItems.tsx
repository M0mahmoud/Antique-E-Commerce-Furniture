import bag from "@/images/bag.svg";
import returnIcon from "@/images/return.svg";
import support from "@/images/support.svg";
import truck from "@/images/truck.svg";
import Image from "next/image";

const ServicesItems = () => {
  return (
    <section className="why-choose-section servicesItems" id="servicesItems">
      <div className="container">
        <div className="row my-5">
          <div className="col-6 col-md-6 col-lg-3 mb-4">
            <div className="feature">
              <div className="icon">
                <Image src={truck} alt="Image" className="imf-fluid" />
              </div>
              <h3>Fast &amp; Free Shipping</h3>
              <p>
                Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet
                velit. Aliquam vulputate.
              </p>
            </div>
          </div>

          <div className="col-6 col-md-6 col-lg-3 mb-4">
            <div className="feature">
              <div className="icon">
                <Image src={bag} alt="Image" className="imf-fluid" />
              </div>
              <h3>Easy to Shop</h3>
              <p>
                Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet
                velit. Aliquam vulputate.
              </p>
            </div>
          </div>

          <div className="col-6 col-md-6 col-lg-3 mb-4">
            <div className="feature">
              <div className="icon">
                <Image src={support} alt="Image" className="imf-fluid" />
              </div>
              <h3>24/7 Support</h3>
              <p>
                Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet
                velit. Aliquam vulputate.
              </p>
            </div>
          </div>

          <div className="col-6 col-md-6 col-lg-3 mb-4">
            <div className="feature">
              <div className="icon">
                <Image src={returnIcon} alt="Image" className="imf-fluid" />
              </div>
              <h3>Hassle Free Returns</h3>
              <p>
                Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet
                velit. Aliquam vulputate.
              </p>
            </div>
          </div>

          <div className="col-6 col-md-6 col-lg-3 mb-4">
            <div className="feature">
              <div className="icon">
                <Image src={truck} alt="Image" className="imf-fluid" />
              </div>
              <h3>Fast &amp; Free Shipping</h3>
              <p>
                Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet
                velit. Aliquam vulputate.
              </p>
            </div>
          </div>

          <div className="col-6 col-md-6 col-lg-3 mb-4">
            <div className="feature">
              <div className="icon">
                <Image src={bag} alt="Image" className="imf-fluid" />
              </div>
              <h3>Easy to Shop</h3>
              <p>
                Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet
                velit. Aliquam vulputate.
              </p>
            </div>
          </div>

          <div className="col-6 col-md-6 col-lg-3 mb-4">
            <div className="feature">
              <div className="icon">
                <Image src={support} alt="Image" className="imf-fluid" />
              </div>
              <h3>24/7 Support</h3>
              <p>
                Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet
                velit. Aliquam vulputate.
              </p>
            </div>
          </div>

          <div className="col-6 col-md-6 col-lg-3 mb-4">
            <div className="feature">
              <div className="icon">
                <Image src={returnIcon} alt="Image" className="imf-fluid" />
              </div>
              <h3>Hassle Free Returns</h3>
              <p>
                Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet
                velit. Aliquam vulputate.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesItems;
