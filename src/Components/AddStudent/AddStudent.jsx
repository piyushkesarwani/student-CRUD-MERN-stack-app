import React, { useEffect, useState } from "react";
import { Header } from "../Header/Header";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import axios from "axios";
import "./AddStudent.css";
import { AiTwotoneEye, AiFillEdit, AiFillDelete } from "react-icons/ai";
import { Table, Tag, Space, Modal, Input } from "antd";

export const AddStudent = ({ setLoginUser, loginUser }) => {
  const [validated, setValidated] = useState(false);
  const [student, setStudent] = useState(
    JSON.parse(localStorage.getItem("student-data")) || []
  );
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [Class, setClass] = useState("");
  const [division, setDivision] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [landmark, setLandmark] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [addStudentActive, setAddStudentActive] = useState(true);
  const [manageStudentActive, setManageStudentActive] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [showingItem, setShowingItem] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  const addStudent = () => {
    if (
      firstName &&
      middleName &&
      lastName &&
      Class &&
      division &&
      rollNumber &&
      address1 &&
      address2 &&
      landmark &&
      city &&
      pincode
    ) {
      let newStudent = {
        id: new Date().toString(),
        firstName: firstName,
        middleName: middleName,
        lastName: lastName,
        Class: Class,
        division: division,
        rollNumber: rollNumber,
        address1: address1,
        address2: address2,
        landmark: landmark,
        city: city,
        pincode: pincode,
      };
      setStudent([...student, newStudent]);
      console.log("student details = ", student);

      setFirstName("");
      setMiddleName("");
      setLastName("");
      setClass("");
      setDivision("");
      setRollNumber("");
      setAddress1("");
      setAddress2("");
      setLandmark("");
      setCity("");
      setPincode("");

      axios
        .post(`http://localhost:9002/addStudent`, newStudent)
        .then((res) => alert(res.data));
    } else {
      alert("invalid Response");
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "firstName",
      key: "key",
    },
    {
      title: "Class",
      dataIndex: "Class",
      key: "key",
    },
    {
      title: "Roll Number",
      dataIndex: "rollNumber",
      key: "key",
    },
    {
      title: "View/Edit/Delete",
      key: "active",
      render: (_, record) => (
        <Space
          size="middle"
          className="d-flex justify-content-around align-items-center"
        >
          <AiTwotoneEye className="fs-6" onClick={() => showItem(record)} />
          <AiFillEdit
            onClick={() => editItem(record)}
            className="fs-6 text-success"
          />
          <AiFillDelete
            onClick={() => deleteItem(record)}
            className="fs-6 text-danger"
          />
        </Space>
      ),
    },
  ];

  const deleteItem = (record) => {
    Modal.confirm({
      title: "Are you sure to delete this Item from the list?",
      onOk: () => {
        setStudent((pre) => {
          return pre.filter((item) => item.id !== record.id);
        });
      },
    });
  };

  const showItem = (record) => {
    setShowModal(true);
    setShowingItem({ ...record });
  };

  const resetShowing = () => {
    setShowModal(false);
    setShowingItem(null);
  };

  const editItem = (record) => {
    setIsEditing(true);
    setEditingItem({ ...record });
  };

  const resetEditing = () => {
    setIsEditing(false);
    setEditingItem(null);
  };

  useEffect(() => {
    localStorage.setItem("student-data", JSON.stringify(student));
  }, [student]);

  return (
    <>
      <Header loginUser={loginUser} />
      <section className="d-flex flex-row justify-content-center align-items-center">
        <div className="sideNavBox">
          <ul className="">
            <li>
              <Button
                variant="primary"
                onClick={() => {
                  if (addStudentActive) {
                    setAddStudentActive(false);
                    setManageStudentActive(true);
                  } else {
                    setAddStudentActive(true);
                    setManageStudentActive(false);
                  }
                }}
              >
                Add Student
              </Button>
            </li>
            <li>
              <Button
                variant="primary"
                onClick={() => {
                  if (manageStudentActive) {
                    setManageStudentActive(false);
                    setAddStudentActive(true);
                  } else {
                    setAddStudentActive(false);
                    setManageStudentActive(true);
                  }
                }}
              >
                Manage Student
              </Button>
            </li>
            <li>
              <Button variant="primary" onClick={() => setLoginUser({})}>
                Logout
              </Button>
            </li>
          </ul>
        </div>
        {addStudentActive && (
          <>
            <div className="p-5 formContainer">
              <h2 className="text-dark fs-4">Add Student</h2>
              {/* {console.log("student Details=", student)} */}
              <Form
                noValidate
                validated={validated}
                className="my-4"
                onSubmit={handleSubmit}
              >
                {/* //1st row for Form Group  */}
                <Row className="mb-3">
                  <Form.Group as={Col} md="4" controlId="validationCustom01">
                    <Form.Control
                      required
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="First name"
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} md="4" controlId="validationCustom02">
                    <Form.Control
                      required
                      type="text"
                      value={middleName}
                      onChange={(e) => setMiddleName(e.target.value)}
                      placeholder="Middle name"
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group
                    as={Col}
                    md="4"
                    controlId="validationCustomUsername"
                  >
                    <InputGroup hasValidation>
                      <Form.Control
                        type="text"
                        placeholder="Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        aria-describedby="inputGroupPrepend"
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Please enter Last Name
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>
                </Row>

                {/* //2nd Row for Form Group  */}

                <Row className="mb-3">
                  <Form.Group as={Col} md="4" controlId="validationCustom01">
                    {/* <Form.Control required type="text" placeholder="Select Class" /> */}
                    <Form.Select
                      aria-label="Default select example"
                      value={Class}
                      onChange={(e) => setClass(e.target.value)}
                    >
                      <option>Select Class</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                      <option value="9">9</option>
                      <option value="10">10</option>
                      <option value="11">11</option>
                      <option value="12">12</option>
                    </Form.Select>
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} md="4" controlId="validationCustom02">
                    {/* <Form.Control required type="text" placeholder="Select Section" /> */}
                    <Form.Select
                      aria-label="Default select example"
                      value={division}
                      onChange={(e) => setDivision(e.target.value)}
                    >
                      <option>Select Division</option>
                      <option value="A">A</option>
                      <option value="B">B</option>
                      <option value="C">C</option>
                      <option value="D">D</option>
                      <option value="E">E</option>
                    </Form.Select>
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group
                    as={Col}
                    md="4"
                    controlId="validationCustomUsername"
                  >
                    <InputGroup hasValidation>
                      <Form.Control
                        type="number"
                        placeholder="Roll Number"
                        value={rollNumber}
                        onChange={(e) => setRollNumber(e.target.value)}
                        aria-describedby="inputGroupPrepend"
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Please Enter 2 Digit Roll Number
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>
                </Row>

                {/* //3rd row for form group  */}

                <Row className="mb-3">
                  <Form.Group as={Col} md="6" className="">
                    <Form.Control
                      as="textarea"
                      aria-label="With textarea"
                      placeholder="Address Line 1"
                      value={address1}
                      onChange={(e) => setAddress1(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group as={Col} md="6">
                    <Form.Control
                      as="textarea"
                      aria-label="With textarea"
                      placeholder="Address Line 2"
                      value={address2}
                      onChange={(e) => setAddress2(e.target.value)}
                    />
                  </Form.Group>
                </Row>

                {/* // 4th Row for form group  */}
                <Row className="mb-3">
                  <Form.Group as={Col} md="6" controlId="validationCustom03">
                    {/* <Form.Label>City</Form.Label> */}
                    <Form.Control
                      type="text"
                      placeholder="Landmark"
                      value={landmark}
                      onChange={(e) => setLandmark(e.target.value)}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid Landmark.
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} md="3" controlId="validationCustom04">
                    {/* <Form.Label>State</Form.Label> */}
                    <Form.Control
                      type="text"
                      placeholder="City"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid City name.
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} md="3" controlId="validationCustom05">
                    {/* <Form.Label>Zip</Form.Label> */}
                    <Form.Control
                      type="text"
                      placeholder="Pincode"
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid 6-digit Pincode.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
                <Button type="submit" onClick={addStudent}>
                  Add Student
                </Button>
              </Form>
            </div>
          </>
        )}
        {manageStudentActive && (
          <>
            <div className="p-5 manageStudentContainer w-100">
              <div className="d-flex justify-content-between align-items-center">
                <h2 className="text-dark fs-4">Manage Student</h2>
                <h3>Total Student = {student.length}</h3>
              </div>
              <Table
                dataSource={student}
                columns={columns}
                // onChange={onChange}
                // pagination={{ pageSize: 5 }}
              />
            </div>
          </>
        )}
        <Modal
          title="Edit Item in the List"
          open={isEditing}
          okText="Save"
          onCancel={() => resetEditing()}
          onOk={() => {
            setStudent((pre) => {
              return pre.map((item) => {
                if (item.id === editingItem.id) {
                  return editingItem;
                } else {
                  return item;
                }
              });
            });
            resetEditing();
          }}
        >
          <Form
            noValidate
            validated={validated}
            className="my-4"
            // onSubmit={handleSubmit}
          >
            {/* //1st row for Form Group  */}
            <Row className="mb-3">
              <Form.Group as={Col} md="4" controlId="validationCustom01">
                {/* <Form.Control
                  required
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="First name"
                /> */}
                <Input
                  value={editingItem?.firstName}
                  placeholder="First Name"
                  onChange={(e) =>
                    setEditingItem((pre) => {
                      return { ...pre, firstName: e.target.value };
                    })
                  }
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustom02">
                <Input
                  value={editingItem?.middleName}
                  placeholder="Middle Name"
                  onChange={(e) =>
                    setEditingItem((pre) => {
                      return { ...pre, middleName: e.target.value };
                    })
                  }
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustomUsername">
                <InputGroup hasValidation>
                  <Input
                    value={editingItem?.lastName}
                    placeholder="Last Name"
                    onChange={(e) =>
                      setEditingItem((pre) => {
                        return { ...pre, lastName: e.target.value };
                      })
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter Last Name
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Row>

            {/* //2nd Row for Form Group  */}

            <Row className="mb-3">
              <Form.Group as={Col} md="4" controlId="validationCustom01">
                {/* <Form.Control required type="text" placeholder="Select Class" /> */}
                <Form.Select
                  aria-label="Default select example"
                  value={editingItem?.Class}
                  placeholder="Class"
                  onChange={(e) =>
                    setEditingItem((pre) => {
                      return { ...pre, Class: e.target.value };
                    })
                  }
                >
                  <option>Select Class</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                </Form.Select>
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustom02">
                {/* <Form.Control required type="text" placeholder="Select Section" /> */}
                <Form.Select
                  aria-label="Default select example"
                  value={editingItem?.division}
                  placeholder="Division"
                  onChange={(e) =>
                    setEditingItem((pre) => {
                      return { ...pre, division: e.target.value };
                    })
                  }
                >
                  <option>Select Division</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                  <option value="E">E</option>
                </Form.Select>
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustomUsername">
                <InputGroup hasValidation>
                  <Input
                    value={editingItem?.rollNumber}
                    placeholder="Roll Number"
                    onChange={(e) =>
                      setEditingItem((pre) => {
                        return { ...pre, rollNumber: e.target.value };
                      })
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    Please Enter 2 Digit Roll Number
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Row>

            {/* //3rd row for form group  */}

            <Row className="mb-3">
              <Form.Group as={Col} md="6" className="">
                <Input
                  value={editingItem?.address1}
                  placeholder="Address Line 1"
                  onChange={(e) =>
                    setEditingItem((pre) => {
                      return { ...pre, address1: e.target.value };
                    })
                  }
                />
              </Form.Group>
              <Form.Group as={Col} md="6">
                <Input
                  value={editingItem?.address2}
                  placeholder="Address Line 2"
                  onChange={(e) =>
                    setEditingItem((pre) => {
                      return { ...pre, address2: e.target.value };
                    })
                  }
                />
              </Form.Group>
            </Row>

            {/* // 4th Row for form group  */}
            <Row className="mb-3">
              <Form.Group as={Col} md="6" controlId="validationCustom03">
                {/* <Form.Label>City</Form.Label> */}
                <Input
                  value={editingItem?.landmark}
                  placeholder="Landmark"
                  onChange={(e) =>
                    setEditingItem((pre) => {
                      return { ...pre, landmark: e.target.value };
                    })
                  }
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid Landmark.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="3" controlId="validationCustom04">
                {/* <Form.Label>State</Form.Label> */}
                <Input
                  value={editingItem?.city}
                  placeholder="City"
                  onChange={(e) =>
                    setEditingItem((pre) => {
                      return { ...pre, city: e.target.value };
                    })
                  }
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid City name.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="3" controlId="validationCustom05">
                {/* <Form.Label>Zip</Form.Label> */}
                <Input
                  value={editingItem?.PinCode}
                  placeholder="Pincode"
                  onChange={(e) =>
                    setEditingItem((pre) => {
                      return { ...pre, PinCode: e.target.value };
                    })
                  }
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid 6-digit Pincode.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
          </Form>
        </Modal>
        <Modal
          title="Student Details"
          open={showModal}
          okText="Save"
          onCancel={() => resetShowing()}
          onOk={() => {
            setStudent((pre) => {
              return pre.map((item) => {
                if (item.id === showingItem.id) {
                  return showingItem;
                } else {
                  return item;
                }
              });
            });
            resetShowing();
          }}
        >
          {/* This is the 1st Row  */}
          <Row className="mb-3">
            <Form.Group as={Col} md="3">
              <Form.Label>
                <p className="m-0" style={{ fontWeight: "800" }}>
                  First Name
                </p>
              </Form.Label>
              <p>{showingItem?.firstName}</p>
            </Form.Group>
            <Form.Group as={Col} md="3">
              <Form.Label>
                <p className="m-0" style={{ fontWeight: "800" }}>
                  Middle Name
                </p>
              </Form.Label>
              <p>{showingItem?.middleName}</p>
            </Form.Group>
            <Form.Group as={Col} md="3">
              <Form.Label>
                <p className="m-0" style={{ fontWeight: "800" }}>
                  Last Name
                </p>
              </Form.Label>
              <p>{showingItem?.lastName}</p>
            </Form.Group>
          </Row>

          {/* This is the 2nd Row  */}
          <Row className="mb-3">
            <Form.Group as={Col} md="3">
              <Form.Label>
                <p className="m-0" style={{ fontWeight: "800" }}>
                  Class
                </p>
              </Form.Label>
              <p>{showingItem?.Class}</p>
            </Form.Group>
            <Form.Group as={Col} md="3">
              <Form.Label>
                <p className="m-0" style={{ fontWeight: "800" }}>
                  Division
                </p>
              </Form.Label>
              <p>{showingItem?.division}</p>
            </Form.Group>
            <Form.Group as={Col} md="3">
              <Form.Label>
                <p className="m-0" style={{ fontWeight: "800" }}>
                  Roll Number
                </p>
              </Form.Label>
              <p>{showingItem?.rollNumber}</p>
            </Form.Group>
          </Row>

          {/* This is the 3rd Row  */}
          <Row className="mb-3">
            <Form.Group as={Col} md="3">
              <Form.Label>
                <p className="m-0" style={{ fontWeight: "800" }}>
                  Address Line 1
                </p>
              </Form.Label>
              <p>{showingItem?.address1}</p>
            </Form.Group>
            <Form.Group as={Col} md="3">
              <Form.Label>
                <p className="m-0" style={{ fontWeight: "800" }}>
                  Address Line 2
                </p>
              </Form.Label>
              <p>{showingItem?.address2}</p>
            </Form.Group>
          </Row>

          {/* This is the 4th Row  */}
          <Row className="mb-3">
            <Form.Group as={Col} md="3">
              <Form.Label>
                <p className="m-0" style={{ fontWeight: "800" }}>
                  Landmark
                </p>
              </Form.Label>
              <p>{showingItem?.landmark}</p>
            </Form.Group>
            <Form.Group as={Col} md="3">
              <Form.Label>
                <p className="m-0" style={{ fontWeight: "800" }}>
                  City
                </p>
              </Form.Label>
              <p>{showingItem?.city}</p>
            </Form.Group>
            <Form.Group as={Col} md="3">
              <Form.Label>
                <p className="m-0" style={{ fontWeight: "800" }}>
                  PinCode
                </p>
              </Form.Label>
              <p>{showingItem?.pincode}</p>
            </Form.Group>
          </Row>
        </Modal>
      </section>
    </>
  );
};
