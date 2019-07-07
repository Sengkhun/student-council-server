import _ from 'lodash';
import { RuntimeError } from 'errors';
import xl from 'excel4node';
import { ANNOUNCEMENT, FEEDBACK, REPORT_FOLDER, DAYS } from 'constants';
import { Reports } from 'models';
import moment from 'moment';
import { getFeedbacks } from '/functions/feedback/query';
import { getAnnouncements } from '/functions/announcement/query';

// =====================================================

export const generateFeedbackReport = async args => {
  const { from, to, createdBy } = args || {};
  const query = { $and: [
    from ? { createdAt: { $gte: from } } : {}, 
    to ? { createdAt: { $lte: to } } : {}
  ]};
  const feedbacks = await getFeedbacks({ query });
  const feedbackGroupByDays = _.groupBy(feedbacks, ({ createdAt }) => {
    return moment(createdAt).day();
  });

  // Create a new instance of a Workbook class
  const wb = new xl.Workbook();

  // Add Worksheets to the workbook
  const workSheetOption = { sheetFormat: { defaultColWidth: 20, defaultRowHeight: 30 } };
  const ws = wb.addWorksheet('Sheet 1', workSheetOption);

  const headerStyle = wb.createStyle({
    font: { 
      bold: true,
      size: 14
    },
    alignment: {
      wrapText: true,
      horizontal: 'center',
      vertical: 'center'
    },
  });

  const headerLeftStyle = wb.createStyle({
    font: { 
      bold: true,
      size: 14
    },
    alignment: {
      wrapText: true,
      horizontal: 'right',
      vertical: 'center'
    },
  });

  const centerStyle = wb.createStyle({
    alignment: {
      wrapText: true,
      horizontal: 'center',
      vertical: 'center'
    },
  });

  ws.row(1).setHeight(50);

  // title
  const title = `Feedback Report ${from ? 'From ' + moment(from).format('l') : ''} ${to ? from ? 'To ' : 'From Beginning Unitl ' + moment(to).format('l') : 'From Beginning Until Now'}`;
  ws.cell(1, 1, 1, 9, true).string(title).style(centerStyle).style({ font: { size: 20 }});

  // days
  for (let i = 0; i <= 6; i++) {
    ws.cell(2, i + 2).string(DAYS[i]).style(headerStyle);
  }

  ws.cell(2, 9).string('Total').style(headerStyle);

  const feedbackTags = ['Facility', 'Instructor', 'Student'];
  _.forEach(feedbackTags, (tag, idx) => {
    ws.cell(3 + idx, 1).string(tag).style(headerLeftStyle);

    // add total at the end of the tag
    if (idx === feedbackTags.length - 1) {
      ws.cell(4 + idx, 1).string('Total').style(headerLeftStyle);
    }
  });

  const loopTimes = 6;
  for (let i = 0; i <= loopTimes; i++) {
    let total = 0;
    const groupByTag = _.groupBy(feedbackGroupByDays[`${i}`], 'tag');
    _.forEach(feedbackTags, (tag, idx) => {
      const currentFeedbackTag = groupByTag[tag.toLowerCase()];
      const count = currentFeedbackTag ? currentFeedbackTag.length : 0;
      let row = 3 + idx;
      let column = 1 + i;
      if (i == 0) {
        column = 2 + loopTimes;
      }
      total += count;
      ws.cell(row, column).number(count).style(centerStyle);

      // calculate total in last row
      if (idx === feedbackTags.length - 1) {
        ws.cell(4 + idx, column).number(total).style(centerStyle);
      }
    });

    if (i === loopTimes) {
      const groupAllTag = _.groupBy(feedbacks, 'tag');
      _.forEach(feedbackTags, (tag, idx) => {
        const totalLength = (groupAllTag[tag.toLowerCase()] || []).length;
        ws.cell(3 + idx, 3 + loopTimes).number(totalLength).style(centerStyle);
      });
    }
  }

  const filename = `feedback-${new Date()}.xlsx`;
  const filePath = `${REPORT_FOLDER}${filename}`;

  wb.write(filePath);

  const report = await createReport({
    createdBy,
    type: FEEDBACK,
    name: filename,
    url: filePath
  });

  return report;

};

// =====================================================

export const generateAnnouncementReport = async args => {
  const { from, to, createdBy } = args || {};
  const query = { $and: [
    from ? { createdAt: { $gte: from } } : {}, 
    to ? { createdAt: { $lte: to } } : {}
  ]};
  const announcements = await getAnnouncements({ query });
  const announcementGroupByDays = _.groupBy(announcements, ({ createdAt }) => {
    return moment(createdAt).day();
  });

  // Create a new instance of a Workbook class
  const wb = new xl.Workbook();

  // Add Worksheets to the workbook
  const workSheetOption = { sheetFormat: { defaultColWidth: 20, defaultRowHeight: 30 } };
  const ws = wb.addWorksheet('Sheet 1', workSheetOption);

  const headerStyle = wb.createStyle({
    font: { 
      bold: true,
      size: 14
    },
    alignment: {
      wrapText: true,
      horizontal: 'center',
      vertical: 'center'
    },
  });

  const headerLeftStyle = wb.createStyle({
    font: { 
      bold: true,
      size: 14
    },
    alignment: {
      wrapText: true,
      horizontal: 'right',
      vertical: 'center'
    },
  });

  const centerStyle = wb.createStyle({
    alignment: {
      wrapText: true,
      horizontal: 'center',
      vertical: 'center'
    },
  });

  ws.row(1).setHeight(50);

  // title
  const title = `Announcement Report ${from ? 'From ' + moment(from).format('l') : ''} ${to ? from ? 'To ' : 'From Beginning Unitl ' + moment(to).format('l') : 'From Beginning Until Now'}`;
  ws.cell(1, 1, 1, 9, true).string(title).style(centerStyle).style({ font: { size: 20 }});

  // days
  for (let i = 0; i <= 6; i++) {
    ws.cell(2, i + 2).string(DAYS[i]).style(headerStyle);
  }

  ws.cell(2, 9).string('Total').style(headerStyle);

  const announcementTags = ['Event', 'Announcement', 'News'];
  _.forEach(announcementTags, (tag, idx) => {
    ws.cell(3 + idx, 1).string(tag).style(headerLeftStyle);

    // add total at the end of the tag
    if (idx === announcementTags.length - 1) {
      ws.cell(4 + idx, 1).string('Total').style(headerLeftStyle);
    }
  });

  const loopTimes = 6;
  for (let i = 0; i <= loopTimes; i++) {
    let total = 0;
    const groupByTag = _.groupBy(announcementGroupByDays[`${i}`], 'tag');
    _.forEach(announcementTags, (tag, idx) => {
      const currentAnnouncementTag = groupByTag[tag.toLowerCase()];
      const count = currentAnnouncementTag ? currentAnnouncementTag.length : 0;
      let row = 3 + idx;
      let column = 1 + i;
      if (i == 0) {
        column = 2 + loopTimes;
      }
      total += count;
      ws.cell(row, column).number(count).style(centerStyle);

      // calculate total in last row
      if (idx === announcementTags.length - 1) {
        ws.cell(4 + idx, column).number(total).style(centerStyle);
      }
    });

    if (i === loopTimes) {
      const groupAllTag = _.groupBy(announcements, 'tag');
      _.forEach(announcementTags, (tag, idx) => {
        const totalLength = (groupAllTag[tag.toLowerCase()] || []).length;
        ws.cell(3 + idx, 3 + loopTimes).number(totalLength).style(centerStyle);
      });
    }
  }

  const filename = `announcement-${new Date()}.xlsx`;
  const filePath = `${REPORT_FOLDER}${filename}`;

  wb.write(filePath);

  const report = await createReport({
    createdBy,
    type: ANNOUNCEMENT,
    name: filename,
    url: filePath
  });

  return report;

};

// =====================================================

export const createReport = async args => {
  const { createdBy, type, name, url } = args;
  const report = await Reports.create({
    createdBy, 
    type, 
    name, 
    url
  });

  if (!report) {
    throw new RuntimeError();
  }

  return report;
};
