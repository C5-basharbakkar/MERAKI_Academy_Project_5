import axios from "axios";
import { useState, useEffect } from "react";
import { setMeals } from "../../redux/reducers/meals/index";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const AllMenue = (req, res) => {
  const [allMeals, setAllMeals] = useState([]);
  const [length,setLength]=useState([])
  const [page, setPage] = useState(1);
  /*     const [meal,setMeal]=useState(``)
   */ const [message, setMessage] = useState(``);
  const dispatch = useDispatch();
  const { meals } = useSelector((state) => {
    return {
      meals: state.meals.meals,
    };
  });



  const paginated = () => {};

  const decrease = () => {
    return setPage(page - 1);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5000/meals/paginated?p=${page}`)
      .then((result) => {
        dispatch(setMeals(result.data.products));
      })
      .catch((err) => {
        setMessage(err.sqlMessage);
      });
    axios.get(`http://localhost:5000/meals`).then((result) => {
      setAllMeals(result.data.result);
    });
  }, [page]);

  return (
    <div key={"cc"}>
        {  allMeals.length? console.log(allMeals.length):""
}
      {meals.length &&
        meals.map((meal, index) => {
          return (
            <>
              <p key={meal.meal_name}>{meal.meal_name}</p>
              <p key={meal.meal_price}>{meal.meal_price}</p>
              <img src={meal.image} alt="" key={meal.id} />
              <button>Add to Cart</button>
              {message}
            </>
          );
        })}

<div class="center">
  <div class="pagination">
  <Link href="#">&laquo;</Link> 
  {

      allMeals.length=(allMeals.length/20)
  } 
  <Link href="#">&raquo;</Link>
  </div>
</div>

      <button
        onClick={() => {
          setPage(page + 1);
        }}
      >
        Next
      </button>
      <button
        onClick={() => {
          setPage(page - 1);
        }}
      >
        previous
      </button>
    </div>
  );
};

export default AllMenue;
