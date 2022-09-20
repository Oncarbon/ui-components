import { OncFlightItineraryInfoPopover } from "@oncarbon/ui-components-react";

import question from "./assets/question.svg";

function App() {
  return (
    <div className="App">
      <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br />
      <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <OncFlightItineraryInfoPopover itineraryOncarbonId="MzIwLkhFTC5CQ04uQVkuMTY1My4yMDIyLTAyLTAzVDE3OjA1OjAwfjMyMC5CQ04uTEhSLkJBLjQ3NS4yMDIyLTAyLTA3VDE0OjE1OjAwITMyQi5MSFIuSEVMLkFZLjEzMzguMjAyMi0wMi0wN1QxODoxMDowMA~QCb6wPo1TONm9qttwnfkpWu9Teo">
          <div
            style={{
              display: "inline-flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <div
              style={{
                marginRight: 8,
              }}
            >
              432 kg
            </div>

            <img
              src={question}
              style={{
                width: 16,
                height: 16,
                cursor: "pointer",
              }}
            />
          </div>
        </OncFlightItineraryInfoPopover>
      </div>
      <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br />
      <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br />
      <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br />
      <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br />
    </div>
  );
}

export default App;
