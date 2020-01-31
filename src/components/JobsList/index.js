import React, { useCallback } from "react"
import PropTypes from "prop-types"
import { JobCard } from "components/JobCard"
import { Text } from "@welcome-ui/text"
import { Tag } from "@welcome-ui/tag"
import { ALL_LABEL } from "constants/filters"

const NoResults = () => <Text variant="h4">No results...</Text>

export const JobsList = React.memo(({ groupedJobs, searchString }) => {
  if (!Object.keys(groupedJobs).length) {
    return <NoResults />
  }
  const renderJobs = useCallback(
    ({ id, name, contractType, office }) => (
      <JobCard
        id={id}
        key={`jobCard-${id}`}
        name={name}
        contractType={contractType}
        office={office}
        searchString={searchString}
      />
    ),
    [searchString]
  )
  const allJobs = groupedJobs[ALL_LABEL]
  if (allJobs) {
    return allJobs.length ? <>{allJobs.map(renderJobs)}</> : <NoResults />
  }
  return (
    <>
      {Object.entries(groupedJobs).map(([group, jobs]) => (
        <div key={`jobsGroup-${group}`}>
          <Tag variant="secondary" size="lg" m={5}>
            {group}
          </Tag>
          {jobs.map(renderJobs)}
        </div>
      ))}
    </>
  )
})

JobsList.propTypes = {
  groupedJobs: PropTypes.objectOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        profile: PropTypes.string,
        office: PropTypes.string,
        websitesUrls: PropTypes.array,
        description: PropTypes.string,
        contractType: PropTypes.string,
        publishedAt: PropTypes.instanceOf(Date)
      })
    )
  ).isRequired,
  searchString: PropTypes.string
}

JobsList.defaultProps = {
  searchString: ""
}
