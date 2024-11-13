import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  tabContent: {
    paddingBlock: theme.spacing(3),
  },
  tabs: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    "& .MuiTabs-indicator": {
      backgroundColor: "#ab47bc",
    },
  },
  tab: {
    textTransform: "none",
    fontSize: "18px",
    fontWeight: 400,
  },
}));

export default function CustomTabs({ tabItems, storageKey }) {
  const classes = useStyles();

  const [activeTab, setActiveTab] = useState(() => {
    if (storageKey) {
      const savedTab = localStorage.getItem(storageKey);
      return savedTab !== null ? Number(savedTab) : 0;
    }
    return 0;
  });

  useEffect(() => {
    if (storageKey) {
      localStorage.setItem(storageKey, activeTab);
    }
  }, [activeTab, storageKey]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <div className={classes.root}>
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        aria-label="custom tabs"
        className={classes.tabs}
      >
        {tabItems.map((item, index) => (
          <Tab key={index} label={item.label} className={classes.tab} />
        ))}
      </Tabs>

      <Box className={classes.tabContent}>
        {React.createElement(tabItems[activeTab].component)}
      </Box>
    </div>
  );
}

CustomTabs.propTypes = {
  tabItems: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      component: PropTypes.elementType.isRequired,
    })
  ).isRequired,
  storageKey: PropTypes.string,
};
