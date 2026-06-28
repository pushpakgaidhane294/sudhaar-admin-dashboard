import {
    Avatar,
    Card,
    CardContent,
    Chip,
    Divider,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Typography,
} from "@mui/material";

import ReportIcon from "@mui/icons-material/Report";

export default function RecentActivity({ reports }) {
  const recent = [...reports]
    .reverse()
    .slice(0, 6);

  const getStatus = (status) => {
    switch (status) {
      case 0:
        return {
          label: "Pending",
          color: "warning",
        };
      case 1:
        return {
          label: "In Progress",
          color: "info",
        };
      default:
        return {
          label: "Completed",
          color: "success",
        };
    }
  };

  return (
    <Card
      sx={{
        mt: 3,
        borderRadius: 4,
        boxShadow: 3,
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Typography
          variant="h5"
          fontWeight="bold"
          mb={2}
        >
          🕒 Recent Complaint Activity
        </Typography>

        <List>
          {recent.map((report, index) => {
            const status = getStatus(
              report.status
            );

            return (
              <div key={report.id}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar
                      sx={{
                        bgcolor: "#1976d2",
                      }}
                    >
                      <ReportIcon />
                    </Avatar>
                  </ListItemAvatar>

                  <ListItemText
                    primary={report.title}
                    secondary={`${report.type} • ${report.userName}`}
                  />

                  <Chip
                    label={status.label}
                    color={status.color}
                  />
                </ListItem>

                {index !==
                  recent.length - 1 && (
                  <Divider />
                )}
              </div>
            );
          })}
        </List>
      </CardContent>
    </Card>
  );
}