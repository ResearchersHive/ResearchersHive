import { Col, Container, Row } from "react-bootstrap";
import CustomNavbar from "../components/Navbar";
import { Card } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { useEffect, useState } from "react";
import { FeaturesApi, UserApi } from "../utils/requests";

const Dashboard = () => {
  const [paperData, setPaperData] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [conferences, setConferences] = useState([]);
  // const paperData = [
  //   {
  //     id: 1,
  //     title: 'Paper 1',
  //     description: 'AbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstract',
  //     link: 'http://localhost:5173/paper',
  //   },
  //   {
  //     id: 2,
  //     title: 'Paper 2',
  //     description: 'Abstract......',
  //     link: 'http://localhost:5173/paper',
  //   },
  //   {
  //     id: 3,
  //     title: 'Paper 3',
  //     description: 'Abstract......',
  //     link: 'http://localhost:5173/paper',
  //   },
  //   {
  //     id: 4,
  //     title: 'Paper 4',
  //     description: 'Abstract......',
  //     link: 'http://localhost:5173/paper',
  //   },
  //   {
  //     id: 5,
  //     title: 'Paper 5',
  //     description: 'Abstract......',
  //     link: 'http://localhost:5173/paper',
  //   },
  // ];
  const handleLinkClick = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const id = localStorage.getItem("id")
        const token = localStorage.getItem("token");
        const response = await fetch(`http://127.0.0.1:8000/api/user/${id}/papers`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        
        const data1 = await response.json();
        
        await console.log(data1)
        if (data1["message"] == "Papers : ") {
          const data2 = [
            {
              id: 1,
              title: 'Start Reading...',
              description: 'Enjoy your journey......',
              link: 'http://localhost:5173/dashboard',
            }
          ]
          setPaperData(data2);
          return;
        }
        // const data = []
        
        const data = Object.keys(data1).map( (d)=> ({
            id : d,
            title : data1[d][0],
            description : data1[d][1].substring(9),
            link : "http://localhost:5173/paper/" + d 
        }))
        // const data = [
        //   {
        //     id: 1,
        //     title: 'Paper 1',
        //     description: 'Abstract......',
        //     link: 'http://localhost:5173/paper',
        //   },
        //   {
        //     id: 2,
        //     title: 'Paper 2',
        //     description: 'Abstract......',
        //     link: 'http://localhost:5173/paper',
        //   },
        // ];

        setPaperData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    UserApi.getRecommendations()
      .then((data) => {
        console.log(data);
        setRecommendations(data);
      })
      .catch((err) => {
        console.log(err);
      });

    FeaturesApi.conferences()
      .then((data) => {
        console.log(data);
        setConferences(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <CustomNavbar />

      <Container fluid>
        <h2 style={{margin:'20px'}}>Recently Read By You:</h2>
        <Row>
          {paperData.map((card) => (
            <Col key={card.id} sm={12} md={6} lg={2}>
              <Card style={{ width: '15rem', margin: '10px' }}>
                <Card.Body>
                  <Card.Title>{card.title}</Card.Title>
                  <Card.Text style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {card.description}
                  </Card.Text>
                  <Card.Link href={card.link} target="_blank">
                    Continue Reading...
                  </Card.Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
      <Container fluid>
        <h2 style={{margin:'20px'}}>Recommended For You:</h2>
        <Row>
          {recommendations.map((card) => (
            <Col key={card.id} sm={12} md={6} lg={2}>
              <Card style={{ width: '15rem', margin: '10px' }}>
                <Card.Body>
                  <Card.Title>{card.title}</Card.Title>
                  <Card.Text style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {card.description}
                  </Card.Text>
                  <a href={card.link} target="_self" >Continue Reading...</a>

                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
      <Container fluid>
        <h2 style={{margin:'20px'}}>Conferences:</h2>
        <Table responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Conference Name</th>
              <th>Deadline</th>
              <th>Venue</th>
              <th>Conference Link</th>
            </tr>
          </thead>
          <tbody>
            {conferences.map((conference, i) => (
              <tr key={conference.conference_id}>
                <td>{i + 1}</td>
                <td>{conference.conference_name}</td>
                <td>{conference.deadline}</td>
                <td>{conference.venue}</td>
                <td><a href={`http://www.wikicfp.com${conference.conference_link}`} rel="noreferrer" target="_blank">Link</a></td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
};

export default Dashboard;
