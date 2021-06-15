import React, { useEffect, useState } from "react";
import RecordComp from "../shared/RecordComp";
import LoadingComp from "../shared/LoadingComp";
import { toast } from "react-toastify";
import FloatingInputBox from "../shared/FloatingInputBox";

export default function CardPreview({ operators }) {
  const [filter, setFilter] = useState("");
  const [imageArray, setImageArray] = useState();
  const [record, setRecord] = useState({
    raider: "明日方舟少人Wiki",
    team: ["Castle-3"],
    url: "https://arkrec.herokuapp.com",
    remark1: `卡背预览用
下方显示了目前所有可用的卡背
点击对应干员可以替换此处的预览`,
    story: "危机合约",
    episode: "#5光谱行动",
    operation: "常驻图上半",
    level: 33,
    backOP: "Castle-3",
    OPSkin: "e1",
  });

  useEffect(() => {
    if (!operators) return;
    fetch("/api/background-operators")
      .then((resRaw) => {
        if (!resRaw.ok) {
          toast.warning("获取图片列表失败");
        } else {
          return resRaw.json();
        }
      })
      .then((res) => {
        const temp = [];
        for (let file of Array.from(res)) {
          const array = file.split(".")[0].split("_");
          let flag = true;
          for (let operator of operators) {
            if (operator.name2 === array[0]) {
              let diff;
              if (array[1] === "e1") diff = "精英一";
              else if (array[1] === "e2") diff = "精英二";
              else if (array[1] === "skin1") diff = "皮肤一";
              else if (array[1] === "skin2") diff = "皮肤二";
              else if (array[1] === "skin3") diff = "皮肤三";
              temp.push([operator.name1, diff, array[1]]);
              flag = false;
              break;
            }
          }
          if (flag) console.log(file);
        }
        setImageArray(temp);
      });
  }, [operators]);

  if (!imageArray) return <LoadingComp />;
  return (
    <div className="container">
      <h4 className="fw-bold mb-5">卡背预览</h4>
      <div className="mb-5">
        <RecordComp record={record} operators={operators} />
      </div>
      <div className="d-flex justify-content-end">
        <div style={{ minWidth: "300px" }}>
          <FloatingInputBox
            value={filter}
            onChange={(evt) => setFilter(evt.target.value)}
            id="quick_filter"
            label="快速搜索干员"
          />
        </div>
      </div>
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">干员名称</th>
            <th scope="col">皮肤类型</th>
          </tr>
        </thead>
        <tbody>
          {imageArray
            .filter((image) => image[0].includes(filter))
            .map((image, index) => (
              <tr
                key={image.join("+")}
                role="button"
                onClick={() => {
                  setRecord((prev) => {
                    const temp = JSON.parse(JSON.stringify(prev));
                    temp.team = [image[0]];
                    temp.backOP = image[0];
                    temp.OPSkin = image[2];
                    return temp;
                  });
                }}
              >
                <th scope="row">{index + 1}</th>
                <th>{image[0]}</th>
                <th>{image[1]}</th>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
