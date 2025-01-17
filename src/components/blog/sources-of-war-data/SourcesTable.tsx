export default function () {
  return (
    <>
      <style>
        {`tbody>tr>td:first-child {
          font-weight: 700;
        }`}
      </style>
      <table>
        <thead>
          <tr>
            <td>Data source</td>
            <td>Conflicts Covered</td>
            <td>Deaths Included</td>
            <td>Years Included</td>
            <td>Countries Included</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>UCDP</td>
            <td>
              <ul>
                <li>
                  Armed conflicts: interstate, intrastate, extrastate,
                  non-state, and one-sided violence
                </li>
                <li>
                  At least 25 deaths during a year (based on most plausible
                  estimate)
                </li>
              </ul>
            </td>
            <td>
              <ul>
                <li>Total, combatant, and civilian deaths, due to fighting</li>
              </ul>
            </td>
            <td>
              <ul>
                <li>1989</li>
                <li>ongoing</li>
              </ul>
            </td>
            <td>
              <ul>
                <li>Global</li>
              </ul>
            </td>
          </tr>
          <tr>
            <td>Project Mars</td>
            <td>
              <ul>
                <li>
                  Conventional wars: interstate; de facto also intrastate and
                  extrastate
                </li>
                <li>
                  At least 500 deaths (based on highest plausible estimate)
                </li>
                <li>
                  Primary combatants have differentiated militaries, and clear
                  frontlines
                </li>
              </ul>
            </td>
            <td>
              <ul>
                <li>Deaths of combatants, due to fighting</li>
              </ul>
            </td>
            <td>
              <ul>
                <li>1800 — 2011</li>
                <li>ongoing</li>
              </ul>
            </td>
            <td>
              <ul>
                <li>Global</li>
              </ul>
            </td>
          </tr>
          <tr>
            <td>Militarized Interstate Events</td>
            <td>
              <ul>
                <li>
                  Militarized interstate confrontations: interstate threats of
                  force, display of force, use of force, war
                </li>
              </ul>
            </td>
            <td>
              <ul>
                <li>Deaths of combatants, due to fighting</li>
              </ul>
            </td>
            <td>
              <ul>
                <li>1816 — 2014</li>
                <li>ongoing</li>
              </ul>
            </td>
            <td>
              <ul>
                <li>Global</li>
              </ul>
            </td>
          </tr>
          <tr>
            <td>Correlates of War — Wars</td>
            <td>
              <ul>
                <li>
                  Militarized interstate confrontations: interstate threats of
                  force, display of force, use of force, war
                </li>
              </ul>
            </td>
            <td>
              <ul>
                <li>
                  Deaths of combatants, due to fighting, disease, and starvation
                </li>
              </ul>
            </td>
            <td>
              <ul>
                <li>1816 — 2007 (extrastate, non-state)</li>
                <li>1816 — 2010 (inter-state)</li>
                <li>1816 — 2014 (intrastate)</li>
                <li>ongoing</li>
              </ul>
            </td>
            <td>
              <ul>
                <li>Global</li>
              </ul>
            </td>
          </tr>
          <tr>
            <td>Correlates of War — Militarized Interstate Disputes</td>
            <td>
              <ul>
                <li>
                  Militarized interstate disputes: interstate threats of force,
                  display of force, use of force, war
                </li>
                <li>At least use of force threatened</li>
                <li>At least 1,000 deaths during a year for war</li>
              </ul>
            </td>
            <td>
              <ul>
                <li>Deaths of combatants, due to fighting</li>
              </ul>
            </td>
            <td>
              <ul>
                <li>1816 — 2014</li>
                <li>ongoing</li>
              </ul>
            </td>
            <td>
              <ul>
                <li>Global</li>
              </ul>
            </td>
          </tr>
          <tr>
            <td>Peace Research Institute Oslo</td>
            <td>
              <ul>
                <li>Armed conflicts: interstate, intrastate, and extrastate</li>
                <li>At least 25 deaths during a year</li>
              </ul>
            </td>
            <td>
              <ul>
                <li>Deaths of combatants and civilians, due to fighting</li>
              </ul>
            </td>
            <td>
              <ul>
                <li>1946 — 2008</li>
              </ul>
            </td>
            <td>
              <ul>
                <li>Global</li>
              </ul>
            </td>
          </tr>
          <tr>
            <td>Conflict Catalog</td>
            <td>
              <ul>
                <li>
                  Violent political conflicts: interstate, intrastate,
                  extrastate, non-state and one-sided violence
                </li>
                <li>At least 32 deaths during a year</li>
              </ul>
            </td>
            <td>
              <ul>
                <li>
                  Total, combatant, and civilian deaths, due to fighting,
                  disease, and starvation
                </li>
              </ul>
            </td>
            <td>
              <ul>
                <li>1400 — 2000</li>
              </ul>
            </td>
            <td>
              <ul>
                <li>Global</li>
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
