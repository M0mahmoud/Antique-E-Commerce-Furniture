import grid1 from "@/images/img-grid-1.jpg";
import grid2 from "@/images/img-grid-2.jpg";
import grid3 from "@/images/img-grid-3.jpg";
import Image from "next/image";
import Link from "next/link";

const WeHelpSection = () => {
  return (
    <section className="we-help-section">
      <div className="container">
        <div className="row justify-content-between">
          <div className="col-lg-7 mb-5 mb-lg-0">
            <div className="imgs-grid">
              <div className="grid grid-1">
                <Image width={375} height={435} src={grid1} alt="Untree.co" />
              </div>
              <div className="grid grid-2">
                <Image width={160} height={160} src={grid2} alt="Untree.co" />
              </div>
              <div className="grid grid-3">
                <Image width={278} height={333} src={grid3} alt="Untree.co" />
              </div>
            </div>
          </div>
          <div className="col-lg-5 ps-lg-5">
            <h2 className="section-title mb-4">
              We Help You Make Modern Interior Design
            </h2>
            <p>
              Donec facilisis quam ut purus rutrum lobortis. Donec vitae odio
              quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam
              vulputate velit imperdiet dolor tempor tristique. Pellentesque
              habitant morbi tristique senectus et netus et malesuada
            </p>
            <ul className="list-unstyled custom-list my-4">
              <li>Donec vitae odio quis nisl dapibus malesuada</li>
              <li>Donec vitae odio quis nisl dapibus malesuada</li>
              <li>Donec vitae odio quis nisl dapibus malesuada</li>
              <li>Donec vitae odio quis nisl dapibus malesuada</li>
            </ul>
            <Link href={"/"} className="btn">
              Explore
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WeHelpSection;
