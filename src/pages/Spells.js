import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import "../styles/Spells.css";
import * as GiIcons from "react-icons/gi";

//todo see if i can figure out a way to pass in the level as the default slider level
//todo maybe fix fade in tranistions so that the whole webpage doesnt have to fadein
//todo if default value is passed in as levle required to cast the spell levle marks need to change. Probably best to try to .map on the data after we recieve it

const baseURL = "https://www.dnd5eapi.co/api/spells/";

const Spells = () => {
  const [spell, setSpell] = useState("undefined");
  const [data, setData] = useState(null);
  const [slider, setSliderLevel] = useState(9);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      axios
        .get(baseURL + spell.replace(/ /g, "-").toLowerCase())
        .then((response) => {
          setData(response.data);
        });
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [spell]);

  const levelMarks = {
    2: "2",
    3: "3",
    4: "4",
    5: "5",
    6: "6",
    7: "7",
    8: "8",
    9: "9",
  };

  const mapClasses = () => {
    let classData = [];
    let i;
    for (i = 0; i < data.classes.length; i++) {
      classData += data.classes[i].name + ", ";
    }

    return classData;
  };

  const inputHandler = (event) => {
    setSpell(event.target.value);
  };

  if (!data)
    return (
      <div className="spell-search-box">
        <input
          className="spell-search"
          onChange={inputHandler}
          placeholder="Search for a Spell..."
        />
      </div>
    );
  return (
    <>
      <div className="spell-search-box">
        <input className="spell-search" onChange={inputHandler} />
      </div>
      {typeof data.name !== "undefined" && (
        <>
          <div className="spell-details-box">
            <div className="spell-details">
              <h1>{data.name}</h1>
              <p className="spell-desc">{data.desc}</p>
              <p className="spell-higher-level">{data.higher_level}</p>
            </div>
          </div>
          <div className="spell-info-box">
            <div className="spell-data-box">
              <h3>Range</h3>
              <p>{data.range}</p>
              <h3>Components</h3>
              <p>{data.components}</p>
              {typeof data.damage !== "undefined" && (
                <>
                  <h3>Damage Type</h3>
                  <p>{data.damage.damage_type.name}</p>
                </>
              )}
            </div>
            <div className="spell-data-box">
              <h3>Classes</h3>
              <icons className="icons">
                {mapClasses(data).includes("Wizard") && (
                  <GiIcons.GiWizardStaff title="Wizard" />
                )}
                {mapClasses(data).includes("Paladin") && (
                  <GiIcons.GiCrossShield title="Paladin" />
                )}
                {mapClasses(data).includes("Cleric") && (
                  <GiIcons.GiHolySymbol title="Cleric" />
                )}
                {mapClasses(data).includes("Sorcerer") && (
                  <GiIcons.GiFireball title="Sorcerer" />
                )}
                {mapClasses(data).includes("Warlock") && (
                  <GiIcons.GiSkeletalHand title="Warlock" />
                )}
                {mapClasses(data).includes("Druid") && (
                  <GiIcons.GiFallingLeaf title="Druid" />
                )}
                {mapClasses(data).includes("Ranger") && (
                  <GiIcons.GiPocketBow title="Ranger" />
                )}
                {mapClasses(data).includes("Bard") && (
                  <GiIcons.GiMusicalNotes title="Bard" />
                )}
              </icons>
            </div>
          </div>
        </>
      )}
      {typeof data.damage !== "undefined" && (
        <>
          <div className="slider-box">
            <h3>Damage at slot level</h3>
            <Slider
              className="spell-slider"
              defaultValue={2}
              min={2}
              max={9}
              step={1}
              onChange={(e) => setSliderLevel(e)}
              marks={levelMarks}
            />
          </div>
          <div className="spell-damage">
            {typeof data.damage.damage_at_slot_level !== "undefined" && (
              <h1>{data.damage.damage_at_slot_level[slider]}</h1>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Spells;
