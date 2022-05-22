import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { LayoutTwo } from "../components/Layout";

const PaymentAndDelivery = () => {
    return (
        <LayoutTwo>

            <div className="about-content space-mt--r100 space-mb--r100">
                <Container>
                    <Row>
                        <Col lg={8} className="ml-auto mr-auto">
                            <div className="about-title-container ">
                                <h1 className="title text-center mb-5">
                                    Apmaksa
                                </h1>
                                <h5 className="title-text">
                                    <u>Pastāv divi apmaksas veidi:</u>
                                    <br />
                                    <br />
                                    <b>1. Ar pārskaitījumu.</b>
                                    <br />
                                    Pēc pasūtījuma veikšanas, jūs saņemsiet rēķinu savā norādītajā e-pastā.
                                    Jums ir jāveic preces apmaksa ar pārskaitījumu uz norādīto firmas maksājumu kontu, norādot pasūtījuma numuru.
                                    <br />
                                    <b>2. Skaidrā naudā</b>
                                    <br />
                                    Saņemot preci Syform Latvija ofisā ir iespēja norēķināties uz vietas.
                                    Apmaksas veidu lūgums norādīt komentāros.
                                </h5>
                                <br />
                                <br />
                                <h1 className="title text-center mb-5">
                                    Piegāde
                                </h1>
                                <h5 className="title-text">
                                    <u>Pastāv trīs preču saņemšanas veidi:</u>
                                    <br />
                                    <br />
                                    <b>1. Syform Latvija ofisā, Grostonas ielā 6b-410kab, Rīga (Olimpiskais Sporta Centrs), iepriekš zvanot uz 27101020 vai 26476677 - BEZMAKSAS.</b>
                                    <br /><br />
                                    <b>2. Ar Omniva kurjerpastu: piegāde Rīgas teriotorijā: 3.00 Eur; piegāde pārējā Latvijas teritorijā: 5.00 - 8.00 Eur.</b>
                                    <br /><br />
                                    <b>3. Omniva pakomātā: 3.00 - 5.00 Eur</b>
                                    <br /><br />
                                    <ul>
                                        <li>Preču piegāde tiek veikta 1-2 darba dienu laikā, ja pasūtītā prece pieejama noliktavā.</li>
                                        <li>Savu izvēlēto preču piegādes veidu (pakomāta adresi) norādiet komentāros pie preču pasūtījuma.</li>
                                        <li>Syform Latvija tirdzniecības pārstāvji pasūtījuma veikšanas brīdī informēs Jūs par precīziem piegādes laikiem.</li>
                                        <li>Pasūtījumam virs 70 Euro - piegāde bez maksas.</li>
                                    </ul>
                                </h5>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </LayoutTwo>
    );
};

export default PaymentAndDelivery;
