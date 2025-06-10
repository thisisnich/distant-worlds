# NFT Properties Format

## Standard Properties Template

```
ARTIST: Nick_DibZz
PLANET: [Number]
NAME: [Planet Name]
SCIENTIFIC NAME: [Scientific Name]
TYPE: [Planet Classification]
NICKNAME: [Slang Name]
HABITABLE: [Yes/No/Species-Specific]
YEAR LENGTH: [Days]
DAY LENGTH: [Hours]
ATMOSPHERE: [Atmospheric Description]
PRIMARY RESOURCE: [Main Resource]
```

---

## Example: Aetheris (Planet #001)

```
ARTIST: Nick_DibZz
PLANET: 1
NAME: Aetheris
SCIENTIFIC NAME: Aetheris Invertum
TYPE: Hollow-Core Terrestrial
NICKNAME: The Float
HABITABLE: No
YEAR LENGTH: 412
DAY LENGTH: 31.6
ATMOSPHERE: Oxygen-Nitrogen Particulate
PRIMARY RESOURCE: Crystalline Silicates
```

---

## Example: Solithar (Planet #002)

```
ARTIST: Nick_DibZz
PLANET: 2
NAME: Solithar
SCIENTIFIC NAME: Solithar Brimshalis
TYPE: Dense Desert Terrestrial
NICKNAME: Yellow Hell
HABITABLE: Nhyrex Only
YEAR LENGTH: 847
DAY LENGTH: 19.3
ATMOSPHERE: Sulfur-Silicate Haze
PRIMARY RESOURCE: Brimshale
```

---

## Example: Calyx-Vehl (Planet #003)

```
ARTIST: Nick_DibZz
PLANET: 3
NAME: Calyx-Vehl
SCIENTIFIC NAME: Calyx-Vehl Resonantis
TYPE: Glacial Resin Terrestrial
NICKNAME: The Screamer
HABITABLE: No
YEAR LENGTH: 623
DAY LENGTH: 28.4
ATMOSPHERE: Ion-Heavy Storm Layers
PRIMARY RESOURCE: Glacial Resin
```

---

---

## CSV Upload Format

For bulk NFT uploads, use this CSV structure with angle increments:

### Headers:
```
name,artist,planet,scientific_name,type,nickname,habitable,year_length,day_length,atmosphere,primary_resource,angle
string,string,number,string,string,string,string,number,number,string,string,number
```

### Display Types Row (Required):
Row 2 must specify data types: "string" or "number"

### Angle Pattern:
- 10 renders per planet
- Angles: 36°, 72°, 108°, 144°, 180°, 216°, 252°, 288°, 324°, 360°
- Naming: [Planet Name] #01, #02, etc.

### Sample CSV Row:
```
Solithar #01,Nick_DibZz,2,Solithar Brimshalis,Dense Desert Terrestrial,Yellow Hell,Nhyrex Only,847,19.3,Dense Sulfuric Clouds,Brimshale,36
```

---

## Notes

- Keep property names consistent across all planets
- Use title case for proper nouns
- Keep values concise but descriptive
- Habitable field can be: "Yes", "No", or "[Species] Only"
- Atmosphere should be 2-4 words maximum
- Primary Resource should be the most valuable/unique material
- Each planet gets 10 renders at 36° increments starting from 36°
