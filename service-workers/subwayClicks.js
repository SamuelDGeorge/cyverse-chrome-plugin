let subLog = {};
var clickList = new Array();
var clickedType = "";
var word = "";
var clickedElement = "";

document.onclick = subClickListener;

function clickOrigin(e) {
  var target = e.target;
  var tag = [];
  tag.tagType = target.tagName.toLowerCase();
  return tag;
}

function subClickListener(e) {
  console.log(e);
  var addClick;
  clickedType = clickOrigin(e).tagType;
  var currentClick;
  if (clickList.length > 0) {
    if (clickList[clickList.length - 1] == "name") {
      currentClick = "Typed:" + document.getElementById("name").value;
      clickList.push(currentClick);
    }
    if (clickList[clickList.length - 1] == "description") {
      currentClick = "Typed:" + document.getElementById("description").value;
      clickList.push("Typed:" + document.getElementById("description").value);
    }
    if (clickList[clickList.length - 1] == "ftitle") {
      currentClick = "Typed:" + document.getElementById("ftitle").value;
      clickList.push("Typed:" + document.getElementById("ftitle").value);
    }
    if (clickList[clickList.length - 1] == "forg") {
      currentClick = "Typed:" + document.getElementById("forg").value;
      clickList.push("Typed:" + document.getElementById("forg").value);
    }
    if (clickList[clickList.length - 1] == "fowner") {
      currentClick = "Typed:" + document.getElementById("fowner").value;
      clickList.push("Typed:" + document.getElementById("fowner").value);
    }
    if (clickList[clickList.length - 1] == "quality_threshold") {
      currentClick =
        "Typed:" + document.getElementById("quality_threshold").value;
      clickList.push(
        "Typed:" + document.getElementById("quality_threshold").value
      );
    }
    if (clickList[clickList.length - 1] == "min_length") {
      currentClick = "Typed:" + document.getElementById("min_length").value;
      clickList.push("Typed:" + document.getElementById("min_length").value);
    }
    if (clickList[clickList.length - 1] == "min_quality") {
      currentClick = "Typed:" + document.getElementById("min_quality").value;
      clickList.push("Typed:" + document.getElementById("min_quality").value);
    }
    if (clickList[clickList.length - 1] == "percent_bases") {
      currentClick = "Typed:" + document.getElementById("percent_bases").value;
      clickList.push("Typed:" + document.getElementById("percent_bases").value);
    }
    if (clickList[clickList.length - 1].includes(":sample")) {
      var temp = rowNum();
      currentClick =
        "Typed:" + document.getElementsByClassName("sample")[temp].value;
      clickList.push(
        "Typed:" + document.getElementsByClassName("sample")[temp].value
      );
    }
    if (clickList[clickList.length - 1].includes(":condition")) {
      var temp = rowNum();
      currentClick =
        "Typed:" + document.getElementsByClassName("condition")[temp].value;
      clickList.push(
        "Typed:" + document.getElementsByClassName("condition")[temp].value
      );
    }
    if (clickList[clickList.length - 1].includes("notes")) {
      var temp = rowNum();
      currentClick = "Typed:" + document.getElementsByClassName("notes").value;
      clickList.push("Typed:" + document.getElementsByClassName("notes").value);
    }
  }
  if (
    clickedType != "a" &&
    clickedType != "input" &&
    clickedType != "b" &&
    clickedType != "option" &&
    clickedType != "textarea" &&
    clickedType != "label" &&
    clickedType != "button"
  ) {
    addClick = "misclick";
    if (clickedType == "select") {
      addClick = "selecting";
    }
    if (clickedType == "img") {
      if (e.target.id == "kallisto-tip") {
        addClick = "Help Button";
      }
      if (e.target.title == "View Output in CyVerse Data Store") {
        addClick = "Discover Data Store";
      }
    }
    if (
      String(window.location.pathname).includes("/about/resources.html") &&
      clickedType == "span"
    ) {
      typeOfElement(e.target.parentNode);
    }
  } else {
    if (clickedType == "input") {
      addClick = e.target.id;
      if (e.target.id == "") {
        addClick = e.target.className;
        if (addClick == "sample" || addClick == "condition") {
          addClick =
            e.target.parentNode.parentNode.cells[0].innerText +
            " and " +
            e.target.parentNode.parentNode.cells[1].innerText +
            ":" +
            e.target.className +
            " - " +
            e.target.parentNode.parentNode.sectionRowIndex;
        }
      }
    } else {
      addClick = typeOfElement(e);
    }
  }
  addEntry(currentClick, addClick);
}

function rowNum() {
  var string = "";
  string = clickList[clickList.length - 1];
  if (string.includes("0")) {
    return 0;
  }
  if (string.includes("1")) {
    return 1;
  }
  if (string.includes("2")) {
    return 2;
  }
  if (string.includes("3")) {
    return 3;
  }
  if (string.includes("4")) {
    return 4;
  }
  if (string.includes("5")) {
    return 5;
  }
  if (string.includes("6")) {
    return 6;
  }
  if (string.includes("7")) {
    return 7;
  }
  if (string.includes("8")) {
    return 8;
  }
  if (string.includes("9")) {
    return 9;
  }
  return null;
}

function typeOfElement(e) {
  if (clickedType == "b") {
    clickedElement = "Log Out";
  } else if (
    e.target ==
    "https://cyverse-dnasubway-guide.readthedocs-hosted.com/en/latest/step7.html"
  ) {
    clickedElement = "Green Line Tutorial";
  } else if (e.target == "https://pachterlab.github.io/kallisto/") {
    clickedElement = "kallisto";
  } else if (e.target == "https://pachterlab.github.io/sleuth/") {
    clickedElement = "sleuth";
  } else if (e.target == "mailto:DNALCAdmin@cshl.edu") {
    clickedElement = "Mail DNALC";
  } else if (e.target == "http://www.tacc.utexas.edu/") {
    clickedElement = "Texas Advanced Computing Center";
  } else if (e.target == "http://www.tacc.utexas.edu/resources/hpc") {
    clickedElement = "Stampede SuperComp";
  } else if (
    e.target ==
    "http://www.nature.com/nprot/journal/v7/n3/fig_tab/nprot.2012.016_F2.html"
  ) {
    clickedElement = "Tuxedo Protocol";
  } else if (
    e.target ==
    "http://dnasubway.iplantcollaborative.org/files/pdf/DNA_Subway_Guide.pdf"
  ) {
    clickedElement = "Green Line Guide";
  } else if (e.target == "https://dnasubway.cyverse.org/project/ngs/create") {
    clickedElement = "Green Line";
  } else if (e == "http://www.ensemblgenomes.org/") {
    clickedElement = "Ensemblgenoes";
  } else if (e == "http://www.gramene.org/") {
    clickedElement = "Gramene Genomes";
  } else if (e == "http://www.ncbi.nlm.nih.gov/mapview/") {
    clickedElement = "NCBI Genomes";
  } else if (e == "http://www.phytozome.net/") {
    clickedElement = "Phytozome Genomes";
  } else if (e == "http://genome.ucsc.edu/cgi-bin/hgGateway") {
    clickedElement = "UCSC Genomes";
  } else if (e == "http://augustus.gobics.de/") {
    clickedElement = "Augustus";
  } else if (
    e ==
    "http://linux1.softberry.com/berry.phtml?topic=fgenesh&group=programs&subgroup=gfind"
  ) {
    clickedElement = "FGenesH";
  } else if (e == "http://genes.mit.edu/genomescan.html") {
    clickedElement = "GenomeScan";
  } else if (e == "http://homepage.mac.com/iankorf/") {
    clickedElement = "SNAP";
  } else if (e == "http://blast.ncbi.nlm.nih.gov/Blast.cgi") {
    clickedElement = "BLAST";
  } else if (e == "http://www.iplantcollaborative.org/") {
    clickedElement = "BLAT";
  } else if (e == "http://evolution.genetics.washington.edu/phylip.html") {
    clickedElement = "PHILYP";
  } else if (e == "http://www.ebi.ac.uk/Tools/clustalw2/index.html") {
    clickedElement = "ClustalW2";
  } else if (e == "http://mummer.sourceforge.net/") {
    clickedElement = "MUMmer";
  } else if (e == "http://www.drive5.com/muscle/") {
    clickedElement = "MUSCLE";
  } else if (e == "http://apollo.berkeleybop.org/current/index.html") {
    clickedElement = "Apollo";
  } else if (e == "http://gmod.org/wiki/GBrowse") {
    clickedElement = "GBrowse";
  } else if (e == "http://derringer.genetics.utah.edu/cgi-bin/MWAS/maker.cgi") {
    clickedElement = "Maker Web Annotation Service";
  } else if (e == "http://www.repeatmasker.org/") {
    clickedElement = "RepeatMasker";
  } else if (e == "http://target.iplantcollaborative.org/") {
    clickedElement = "TARGeT";
  } else if (e == "http://lowelab.ucsc.edu/tRNAscan-SE/") {
    clickedElement = "tRNAscan-SE";
  } else if (e == "http://www.bioinformatics.babraham.ac.uk/projects/fastqc/") {
    clickedElement = "FastQC";
  } else if (e == "http://hannonlab.cshl.edu/fastx_toolkit") {
    clickedElement = "Fastx-toolkit";
  } else if (e == "https://tophat.com/") {
    clickedElement = "TopHat";
  } else if (e == "http://cole-trapnell-lab.github.io/cufflinks/") {
    clickedElement = "Cufflinks";
  } else if (e == "http://cole-trapnell-lab.github.io/cufflinks/cuffdiff/") {
    clickedElement = "Cuffdiff";
  } else if (
    e.target == "https://dnasubway.cyverse.org/project/browse/1/owner/desc?"
  ) {
    clickedElement = "Sort Public Project by Owner desc";
  } else if (
    e.target == "https://dnasubway.cyverse.org/project/browse/1/owner/asc?"
  ) {
    clickedElement = "Sort Public Project by Owner asc";
  } else if (
    e.target == "https://dnasubway.cyverse.org/project/browse/1/title/desc?"
  ) {
    clickedElement = "Sort Public Project by Title desc";
  } else if (
    e.target == "https://dnasubway.cyverse.org/project/browse/1/title/asc?"
  ) {
    clickedElement = "Sort Public Project by Title asc";
  } else if (
    e.target == "https://dnasubway.cyverse.org/project/browse/1/date/desc?"
  ) {
    clickedElement = "Sort Public Project by Date desc";
  } else if (
    e.target == "https://dnasubway.cyverse.org/project/browse/1/date/asc?"
  ) {
    clickedElement = "Sort Public Project by Date asc";
  } else if (e.target == "http://www.dnabarcoding101.org/") {
    clickedElement = "DNA Bar Coding 101";
  } else if (
    e.target ==
    "https://cyverse-dnasubway-guide.readthedocs-hosted.com/en/latest/"
  ) {
    clickedElement = "DNA User Guide";
  } else if (
    e.target == "https://dnasubway.cyverse.org/files/pdf/DNA_Subway_Poster.pdf"
  ) {
    clickedElement = "DNA Subway Poster";
  } else if (e.target == "https://dnasubway.cyverse.org/about/") {
    clickedElement = "About Page";
  } else if (e.target == "http://www.dnalc.org/") {
    clickedElement = "DNA Learning Center";
  } else if (e.target == "http://www.iplantcollaborative.org/") {
    clickedElement = "iplantcollaborative link";
    //broken link
  } else if (e.target == "http://www.nsf.gov/") {
    clickedElement = "NSF Link";
  } else if (e.target == "https://dnasubway.cyverse.org/about/credits.html") {
    clickedElement = "Credit Page";
  } else if (e.target == "https://dnasubway.cyverse.org/about/resources.html") {
    clickedElement = "Resources";
  } else if (e.target == "https://dnasubway.cyverse.org/feedback.html") {
    clickedElement = "Feedback";
  } else if (
    e.target == "https://dnasubway.cyverse.org/files/pdf/DNA_Subway_Guide.pdf"
  ) {
    clickedElement = "User Manual";
  } else if (
    e.target == "http://gfx.dnalc.org/files/apollo/test/test_apollo.jnlp"
  ) {
    clickedElement = "Downloading Apollo";
  } else if (
    e.target == "https://java.com/en/download/help/enable_browser.xml"
  ) {
    clickedElement = "Enabling Java";
  } else if (e.target == "https://www.java.com/en/download/installed.jsp") {
    clickedElement = "Verifying Java";
  } else if (e.target == "https://dnasubway.cyverse.org/about/help.html") {
    clickedElement = "Help Button";
  } else if (e.target == "https://dnasubway.cyverse.org/") {
    clickedElement = "Home Button";
  } else if (e.target == "https://dnasubway.cyverse.org/project/browsemy") {
    clickedElement = "My Projects";
  } else if (e.target == "https://dnasubway.cyverse.org/project/browse") {
    clickedElement = "Public Projects";
  } else if (
    e.target == "https://dnasubway.cyverse.org/project/create_project.html"
  ) {
    clickedElement = "Classic Red Line";
  } else if (
    e.target ==
    "https://dnasubway.cyverse.org/project/annot/create_project.html"
  ) {
    clickedElement = "Apollo Red Line";
  } else if (
    e.target == "https://dnasubway.cyverse.org/project/target/create"
  ) {
    clickedElement = "Yellow Line";
  } else if (
    e.target ==
    "https://dnasubway.cyverse.org/project/phylogenetics/create_project.html"
  ) {
    clickedElement = "Blue Line";
  } else if (clickedType == "input" || clickedType == "textarea") {
    clickedElement = e.target.id;
  } else if (e.target == "") {
    clickedElement = "misclick";
  } else if (e.target.innerText == "") {
    clickedElement = e.target.id;
    // alert("id: " + clickedElement);
  } else {
    if (e.target.innerText == "Download" && clickedType == "button") {
      clickedElement =
        "Downloading: " +
        e.target.parentNode.parentNode.parentNode.cells[0].innerText;
    } else {
      clickedElement = e.target.innerText;
      // alert(e.target.innerText);
    }
  }

  if (e.target.parentNode != null) {
    if (e.target.parentNode.parentNode != null) {
      if (e.target.parentNode.parentNode.parentNode != null) {
        if (e.target.parentNode.parentNode.parentNode.parentNode != null) {
          if (
            e.target.parentNode.parentNode.parentNode.parentNode.parentNode
              .id != null
          ) {
            if (
              e.target.parentNode.parentNode.parentNode.parentNode.parentNode
                .id == "manage_data"
            ) {
              clickedElement =
                "Pairing: " +
                e.target.parentNode.parentNode.parentNode.cells[1].innerText;
            }
          }
        }
      }
    }
  }

  return clickedElement;
}

function addEntry(currentClick, addClick) {
  console.log(addClick);
  let event = addClick;
  if (currentClick !== undefined) {
    event = addClick + "-" + currentClick;
  }
  chrome.storage.local
    .get("fullLog")
    .then((ret) => {
      subLog = ret["fullLog"];
      if (subLog === undefined) {
        return;
      } else {
        subLog.logArray.push({
          timestamp: new Date().toString(),
          url: document.URL,
          eventType: "Subway Click",
          event: addClick,
        });
        chrome.storage.local.set({ fullLog: subLog }, function () {});
      }
    })
    .catch((err) => {
      alert(err + "Error Occured Getting Log From Local Storage!");
    });
}
