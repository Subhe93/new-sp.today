(function () {
  const containerId = "currency-widget-container";
  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`Element with id '${containerId}' not found.`);
    return;
  }

  const lang = window.embedLang || "en";

  const shadow = container.attachShadow({ mode: "open" });

  const wrapper = document.createElement("div");
  wrapper.className = "currency-widget-container-div";

  if (lang === "ar") {
    wrapper.setAttribute("dir", "rtl");
  }

  const style = document.createElement("style");
  style.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700&display=swap');
    .currency-widget-container-div * {
      font-family: 'Tajawal', sans-serif !important;
    }
    .currency-widget-container-div {
      font-family: 'Tajawal', sans-serif !important;
    }
    .currency-widget-container-div {
      border: 1px solid #99a0ab;
      overflow: hidden;
      border-radius: 10px;
      padding: 10px;
    }
    .currency-table-div {
      margin-top: 12px;
      border: 1px solid #99a0ab;
      overflow: hidden;
      border-radius: 10px;
      padding: 0;
    }
    .currency-table {
      font-family: 'Tajawal', sans-serif;
      border-radius: 10px;
      width: 100%;
      border-collapse: collapse;
    }
    .currency-table th {
      font-weight: 500;
      font-size: 16px;
      color: #1c4c8c;
      text-align: start;
      padding: 8px;
      border-bottom: 1px solid #ccc;
    }
    .currency-table tr:nth-child(odd) {
      background-color: #1c4c8c09;
    }
      .currency-table th {
      background-color: #fff;
    }
    .currency-table td {
      padding: 8px;
      margin: 0;
    }
    .color_red {
      color: #af1804;
    }
    .color_green {
      color: #57b14d;
    }
    .embed-controls {
      font-family: 'Tajawal', sans-serif;
      margin-bottom: 10px;
    }
    .embed-controls select {
      padding: 6px 8px;
      font-size: 14px;
      border-radius: 10px;
      width: 100%;
      border-color: #ccc;
    }
  `;
  wrapper.appendChild(style);

  const cities = [
    { id: 1, name_en: "Damascus", name_ar: "دمشق" },
    { id: 2, name_en: "Aleppo", name_ar: "حلب" },
    { id: 3, name_en: "idlib", name_ar: " ادلب" },
  ];

  const controlsDiv = document.createElement("div");
  controlsDiv.className = "embed-controls";

  const citySelect = document.createElement("select");
  cities.forEach((city) => {
    const option = document.createElement("option");
    option.value = city.id;
    option.textContent = lang === "ar" ? city.name_ar : city.name_en;
    citySelect.appendChild(option);
  });
  if (lang === "en") {
    citySelect.style.marginRight = "10px";
  } else {
    citySelect.style.marginLeft = "10px";
  }

  controlsDiv.appendChild(citySelect);
  wrapper.appendChild(controlsDiv);

  const tableContainer = document.createElement("div");
  wrapper.appendChild(tableContainer);

  function loadData(cityId) {
    const apiUrl = `https://api.sp.today/api/v1/embedData?city_id=${cityId}&lang=${lang}`;
    tableContainer.innerHTML = "Loading...";

    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        if (!Array.isArray(data.data)) {
          tableContainer.innerHTML = "Error loading data.";
          console.error("Unexpected API response", data);
          return;
        }

        const translations = {
          en: {
            currency: "Currency",
            sellPrice: "Sell Price",
            buyPrice: "Buy Price",
            showMore: "Show More",
            showLess: "Show Less",
          },
          ar: {
            currency: "العملة",
            sellPrice: "سعر البيع",
            buyPrice: "سعر الشراء",
            showMore: "عرض الكل",
            showLess: "عرض أقل",
          },
        };

        const t = translations[lang] || translations.en;
        let showAll = false;

        const renderTable = () => {
          const visibleData = showAll ? data.data : data.data.slice(0, 10);

          const DivTable = document.createElement("div");
          DivTable.className = "currency-table-div";

          const table = document.createElement("table");
          table.className = "currency-table";

          const thead = document.createElement("thead");
          thead.innerHTML = `
    <tr>
      <th>${t.currency}</th>
      <th>${t.sellPrice}</th>
      <th>${t.buyPrice}</th>
    </tr>
  `;
          table.appendChild(thead);

          const tbody = document.createElement("tbody");
          visibleData.forEach((item) => {
            const tr = document.createElement("tr");
            const currencyName = item.dest_currency?.custom_name || "";
            tr.innerHTML = `
      <td>
        <img style='vertical-align: middle;' src='https://flagsapi.com/${item.dest_currency.flag_code}/flat/24.png' />
        ${currencyName}
      </td>
      <td>${item.sell_price}</td>
      <td>${item.buy_price}</td>
    `;
            tbody.appendChild(tr);
          });

          table.appendChild(tbody);
          DivTable.appendChild(table);

          // Container for the button and attribution
          const footerDiv = document.createElement("div");
          footerDiv.style.textAlign = "center";
          footerDiv.style.marginTop = "12px";

          // Toggle button
          const toggleBtn = document.createElement("button");
          toggleBtn.textContent = showAll ? t.showLess : t.showMore;
          toggleBtn.style.padding = "6px 10px";
          toggleBtn.style.borderRadius = "8px";
          toggleBtn.style.border = "1px solid #ccc";
          toggleBtn.style.cursor = "pointer";
          toggleBtn.style.background = "#f9f9f9";
          toggleBtn.style.margin = "0 auto";
          toggleBtn.onclick = () => {
            showAll = !showAll;
            tableContainer.innerHTML = "";
            renderTable();
          };

          // Attribution element
          const attribution = document.createElement("div");
          attribution.style.marginTop = "6px";
          attribution.style.fontSize = "13px";
          attribution.style.color = "#666";
          attribution.innerHTML = `<br />
      Data by <a href="https://sp.today" target="_blank" rel="noopener noreferrer" style="color:#0077cc;text-decoration:none;font-weight:bold;">SP Today</a>
    <img width='25px' src="https://sp.today/logo-embed.jpg" alt="SP Today logo" style="width:25px;height:25px;margin-left:4px;vertical-align:middle;">
  `;

          footerDiv.appendChild(toggleBtn);
          footerDiv.appendChild(attribution);

          tableContainer.innerHTML = "";
          tableContainer.appendChild(DivTable);
          tableContainer.appendChild(footerDiv);
        };

        renderTable();
      })
      .catch((err) => {
        tableContainer.innerHTML = "Failed to load data.";
        console.error("API fetch failed", err);
      });
  }

  loadData(cities[0].id);

  citySelect.addEventListener("change", () => {
    loadData(citySelect.value);
  });
  const fontLink = document.createElement("link");
  fontLink.rel = "stylesheet";
  fontLink.href =
    "https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700&display=swap";
  shadow.appendChild(fontLink);

  shadow.appendChild(wrapper);
})();
