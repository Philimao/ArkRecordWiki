import React, { useEffect, useState } from "react";
import Pagination from "react-bootstrap/Pagination";
import FloatingInputBox from "../../shared/FloatingInputBox";
import Modal from "../../shared/Modal";
import { toast } from "react-toastify";

export default function OperatorComp() {
  const [operators, setOperators] = useState();
  const [operatorArray, setOperatorArray] = useState([]);
  const [isOperatorsModified, updatePage] = useState(true);
  const [query, setQuery] = useState("");

  const [page, setPage] = useState(1);
  const [pageArray, setPageArray] = useState([]);
  const [maxPage, setMaxPage] = useState(0);
  const recordsPerPage = 20;

  const [_id, setId] = useState();
  const [code, setCode] = useState("");
  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");
  const [opClass, setOPClass] = useState("");
  const [star, setStar] = useState("1");

  useEffect(() => {
    fetch("/operator/operators").then((resRaw) => {
      if (resRaw.ok) {
        resRaw.json().then((res) => {
          setOperators(res);
        });
      }
    });
  }, [isOperatorsModified]);

  useEffect(() => {
    if (operators) {
      const newArray = operators.filter((operator) => {
        return (
          operator.name1.indexOf(query) > -1 ||
          operator.name2.indexOf(query) > -1 ||
          operator.class.indexOf(query) > -1
        );
      });
      setOperatorArray(newArray);
    }
  }, [operators, query]);

  useEffect(() => {
    if (operatorArray) {
      setMaxPage(Math.ceil(operatorArray.length / recordsPerPage));
    }
  }, [operatorArray, recordsPerPage]);

  useEffect(() => {
    if (maxPage > 4) {
      if (page < 3) {
        setPageArray([1, 2, 3, 4, 5]);
      } else if (page > maxPage - 2) {
        setPageArray([
          maxPage - 4,
          maxPage - 3,
          maxPage - 2,
          maxPage - 1,
          maxPage,
        ]);
      } else {
        setPageArray([page - 2, page - 1, page, page + 1, page + 2]);
      }
    } else {
      setPageArray(Array.from(Array(maxPage).keys()).map((i) => i + 1));
    }
  }, [maxPage, page]);

  function MyPage() {
    return (
      <div className="d-flex justify-content-center">
        <Pagination>
          <Pagination.First onClick={() => setPage(1)} />
          <Pagination.Prev
            onClick={() => {
              if (page > 1) setPage(page - 1);
            }}
          />
          {/*<Pagination.Ellipsis />*/}
          {pageArray.map((item, index) => (
            <Pagination.Item
              active={item === page}
              key={"Page-" + index}
              onClick={() => setPage(item)}
            >
              {item}
            </Pagination.Item>
          ))}
          {/*<Pagination.Ellipsis />*/}
          <Pagination.Next
            onClick={() => {
              if (page < maxPage) setPage(page + 1);
            }}
          />
          <Pagination.Last onClick={() => setPage(maxPage)} />
        </Pagination>
      </div>
    );
  }

  const update_operator_form = () => {
    return (
      <form>
        <FloatingInputBox
          value={code}
          onChange={(evt) => setCode(evt.target.value)}
          label={"??????"}
          id="code"
          required={true}
        />
        <FloatingInputBox
          value={name1}
          onChange={(evt) => setName1(evt.target.value)}
          label={"????????????"}
          id="name1"
          required={true}
        />
        <FloatingInputBox
          value={name2}
          onChange={(evt) => setName2(evt.target.value)}
          label={"????????????"}
          id="name2"
          required={true}
        />
        <FloatingInputBox
          value={opClass}
          onChange={(evt) => setOPClass(evt.target.value)}
          label={"????????????"}
          id="class"
          required={true}
        />
        <FloatingInputBox
          type="number"
          value={star.toString()}
          onChange={(evt) => setStar(evt.target.value)}
          label={"????????????"}
          id="star"
          min={1}
          required={true}
        />
      </form>
    );
  };

  async function handleUpdate() {
    const data = {
      code: code,
      name1: name1,
      name2: name2,
      class: opClass,
      star: parseInt(star),
      _id: _id,
    };
    const resRaw = await fetch("/operator/update-operator", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!resRaw.ok) {
      const res = await resRaw.text();
      toast.warning(res);
    } else {
      toast.info("???????????????");
      updatePage((prev) => !prev);
    }
  }

  function OperatorDetail({ operator }) {
    return (
      <tr>
        <th scope="row">{operator.code}</th>
        <td>{operator.name1}</td>
        <td>{operator.name2}</td>
        <td>{operator.class}</td>
        <td>{operator.star}</td>
        <td>
          <i
            className="bi bi-pencil me-2"
            role="button"
            data-bs-toggle="modal"
            data-bs-target="#update_operator_form"
            onClick={() => {
              setId(operator._id);
              setName1(operator.name1);
              setName2(operator.name2);
              setCode(operator.code);
              setOPClass(operator.class);
              setStar(operator.star);
            }}
          />
          <i
            className="bi bi-trash"
            role="button"
            onClick={async () => {
              if (window.confirm("?????????????????????")) {
                if (window.confirm("?????????????????????????????????")) {
                  const resRaw = await fetch("/operator/delete-operator", {
                    method: "DELETE",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      _id: operator._id,
                    }),
                  });
                  if (!resRaw.ok) {
                    const res = await resRaw.text();
                    toast.warning(res);
                  } else {
                    toast.info("???????????????");
                    updatePage((prev) => !prev);
                  }
                }
              }
            }}
          />
        </td>
      </tr>
    );
  }

  return (
    <div>
      <div className="d-flex justify-content-end mb-3">
        <button
          data-bs-toggle="modal"
          data-bs-target="#update_operator_form"
          className="btn btn-primary"
          onClick={() => {
            setId(undefined);
            setName1("");
            setName2("");
            setCode("");
            setOPClass("");
            setStar("1");
          }}
        >
          ????????????
        </button>
      </div>
      <FloatingInputBox
        value={query}
        onChange={(evt) => {
          setQuery(evt.target.value);
        }}
        id="query"
        label="??????????????????"
      />
      <div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">??????</th>
              <th scope="col">????????????</th>
              <th scope="col">????????????</th>
              <th scope="col">????????????</th>
              <th scope="col">????????????</th>
              <th scope="col">??????</th>
            </tr>
          </thead>
          <tbody>
            {operatorArray
              .filter((operator, index) => {
                return (
                  (page - 1) * recordsPerPage - 1 < index &&
                  index < page * recordsPerPage
                );
              })
              .map((operator) => (
                <OperatorDetail operator={operator} key={operator.name2} />
              ))}
          </tbody>
        </table>
      </div>
      <MyPage />
      <Modal
        id="update_operator_form"
        header="??????/??????????????????"
        handleSubmit={handleUpdate}
        Content={update_operator_form}
      />
    </div>
  );
}
