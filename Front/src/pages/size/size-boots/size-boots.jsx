import { Link, NavLink } from "react-router-dom";
import { useEffect } from "react";
import "./size-bootsStyle.scss";

import Intersection from "../../../components/intersection/intersection";

const SizeBoots = () => {
  useEffect(() => {
    document.title = "Розміри взуття";
  }, []);

  return (
    <>
      <div className="pages">
        <Link to="/">Головна</Link>
        <div>/</div>
        <Link to="/size">Розміри</Link>
        <div>/</div>
        <NavLink to="/size/boots">Взуття</NavLink>
      </div>

      <div className="table-container">
        <Intersection>
          <h3 className="hidden">Таблиця розмірів взуття</h3>

          <div className="hidden">
            Тут ви знайдете інформацію про те, як вибрати правильний розмір
            взуття для вашої ноги. Не забувайте, що правильно підібране взуття -
            це запорука комфорту та здоров'я ваших ніг.
          </div>

          <div className="hiddenLeft">
            <table>
              <thead>
                <tr>
                  <th>Довжина стопи (см)</th>
                  <th>Розмір взуття (EU)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>23.5</td>
                  <td>36</td>
                </tr>
                <tr>
                  <td>24</td>
                  <td>37</td>
                </tr>
                <tr>
                  <td>24.5</td>
                  <td>38</td>
                </tr>
                <tr>
                  <td>25</td>
                  <td>39</td>
                </tr>
                <tr>
                  <td>25.5</td>
                  <td>40</td>
                </tr>
                <tr>
                  <td>26.2</td>
                  <td>41</td>
                </tr>
                <tr>
                  <td>27.0</td>
                  <td>42</td>
                </tr>
                <tr>
                  <td>27.7</td>
                  <td>43</td>
                </tr>
                <tr>
                  <td>28.5</td>
                  <td>44</td>
                </tr>
                <tr>
                  <td>29.2</td>
                  <td>45</td>
                </tr>
                <tr>
                  <td>30</td>
                  <td>46</td>
                </tr>
                <tr>
                  <td>31</td>
                  <td>47</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Intersection>
      </div>
    </>
  );
};

export default SizeBoots;
