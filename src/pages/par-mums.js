import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { LayoutTwo } from "../components/Layout";

const AboutUs = () => {
    return (
        <LayoutTwo>

            <div className="about-content  space-mt--r100 space-mb--r100">
                <div className="section-title-container space-mb--40">
                    <Container>
                        <Row>
                            <Col lg={8} className="ml-auto mr-auto">
                                <div className="about-title-container text-center">
                                    <h1 className="title ">
                                        Par mums
                                    </h1>
                                    <h5 className="title-text">
                                        Syform ir augstākās kvalitātes uztura bagātinātāji no Itālijas.

                                        Syform ir sava filozofija, kas ir caurspīdīga, līdzsvarota un veidota no dabas. Dabiski pilnīga. Abi šie vārdi ietver Syform veselā kopuma pamatu. Syform uzdevums ir līdzsvarot spēkus un pozitīvos centienus sportā un ikdienā. Lai garantētu augstu produktu efektivitāti, Syform izmanto savu pieredzi rūpīgi izvēloties izejvielas un veicot stingras kontroles. Turklāt, pētniecības darbs turpinās un šajā sfērā veikti testi piedāvā arvien jaunas idejas, jaunus risinājumus, lai iegūtu arvien efektīvākus uztura bagātinātājus: ievērojot dabas zīmi. Tāpēc Syform produktus izvēlas pasaules un Latvijas labākie sportisti un sporta entuziasti, kam svarīga uztura bagātinātāju kvalitāte.

                                        Syform izmanto izejvielas ar reģistrētām tirdzniecības zīmēm vai ražošanas patentu, kas nozīmē augstu kvalitāti (Creapure®, Alipuretm, Carnipuretm, dds-1tm, Optipep®), izejvielas, kas nesatur GMO, BSE, glutēnu, cukuru, konservantus, un kas nav apstarotas.

                                        Syform produkcija nesatur dopinga vielas un atbilst pasaules antidopinga aģentūras prasībām.
                                    </h5>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        </LayoutTwo>
    );
};

export default AboutUs;
