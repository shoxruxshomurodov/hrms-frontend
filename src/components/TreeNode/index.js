import React from 'react';
import styled from "styled-components";
import {get, head, isArray, isEmpty, isNil,isEqual} from "lodash";
import avatarImg from "../../../src/assets/male_avatar.png"
import {Tree, TreeNode} from "react-organizational-chart";
import classNames from "classnames";

const StyledTreeNode = styled.div`
  background-color: #FAFAFA;
  overflow-x: auto;
  padding: 15px;

  ul:before, ul li:after {
    border-left: 3px solid #74C02F !important;
  }

  ul li:before, ul li:after {
    border-top: 3px solid #74C02F !important;
  }

  ul li:first-of-type:before {
    border: none !important;
  }

  ul li:last-of-type:after {
    border: none !important;
  }

  ul li:last-of-type:before {
    border-right: 3px solid #74C02F !important;
  }

  ul:nth-last-of-type(3) {
    background-color: red;
  }
  li.last > ul:before {
    //display: none !important;
  }
`;
const TreeNodeComponent = ({data, ...rest}) => {

    const hasRankTree = (ranksList,structuresList=[]) => {
        if (isNil(ranksList) || !isArray(ranksList)) {
            return null;
        }
        return ranksList.map(({rankList, staffList}) => !isNil(staffList) && isArray(staffList) && staffList.map(({
                                                                                                                      postName,
                                                                                                                      rank,
                                                                                                                      employeeList
                                                                                                                  }) => !isEmpty(employeeList) ? employeeList.map((employee, index) => (
                <TreeNode className={classNames({'last':isNil(rankList)})} key={index + 1} label={<Node item={{
                    name: get(employee, 'fio', '-'),
                    position: postName,
                    phone: get(employee, 'note', '-')
                }} rank={rank}/>}>{hasRankTree(rankList)}{hasStructureTree(structuresList)}</TreeNode>)) :
            <TreeNode className={classNames({'last':isNil(rankList)})}label={<Node item={{
                name: <span className={'text-danger'}>Vakant</span>,
                position: postName,
                phone: '-'
            }} rank={rank}/>}><TreeNode
                label={hasRankTree(rankList)}>{hasStructureTree(structuresList)}</TreeNode></TreeNode>))

    }

    const hasStructureTree = (structure) => {
        if(isNil(structure) && !isArray(structure) && isEmpty(structure)){
            return null;
        }
        return structure.map(({
                                  ranksList,
                                  structuresList
                              }) => !isNil(ranksList) && isArray(ranksList) && hasRankTree(ranksList, structuresList));
    }

    const Node = ({item: {name, position, phone}, col = 6, h = 6,rank}) => <div className={'row justify-content-center'}>
        <div className={`${rank >= 12 ? '' : 'col'} text-left`}>
            <figure className="u-block-hover u-shadow-v19 g-bg-white g-rounded-4 g-pa-15">
                <div className={classNames("d-flex justify-content-center ",{'flex-column align-items-center text-center':rank<=13})}>
                    <img className="g-width-80 g-height-80 rounded-circle g-mr-15" src={avatarImg}
                         alt="Image Description"/>
                    <div className="d-block">
                        <div className="g-mb-5">
                            <h4 className={`h6 g-mb-0`}>{name}</h4>
                            <em className="d-block g-color-primary g-font-style-normal g-font-size-default">{position}</em>
                        </div>
                        <em className="d-block g-color-gray-dark-v5 g-font-style-normal g-font-size-13 g-mb-2">{phone}</em>
                    </div>
                </div>
            </figure>
        </div>
    </div>
    return (
        <StyledTreeNode {...rest} className={'g-py-100'}>
            {
                <Tree label={<div className={'u-block-hover u-shadow-v19 g-bg-white g-rounded-4 g-pa-15'}><h2 className={'h2'}>{get(head(get(data,'structuresList',[])),'title')}</h2></div>}>
                    {
                        hasStructureTree(get(data,'structuresList',[]))
                    }
                </Tree>
            }

        </StyledTreeNode>
    );
};

export default TreeNodeComponent;
